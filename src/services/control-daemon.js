(function(angular, app, net) {
  app.factory('daemon',[ 'toast', 'dynamineConfig', 'modal', '$timeout', function(toast, dynamineConfig, modal, $timeout){
    let BUFF_SIZE = 1024;
    let CMD_TIMEOUT = 45000;

    let handlers = {} //where we will put code that handles incoming data
    let timeouts = {}

    let startCoinCmd = {
      "cmd": "startMiner",
      "data": {
        "miner_binary": "",
        "miner_args": {
          "-d": "",
          "-a": "",
          "-o": "",
          "-u": "",
          "-p": ""
        }
      }
    }

    let stopCoinCmd = {
      "cmd": "stopMiner",
      "data": {
        "resource": ""
      }
    }

    let resourcesCmd = {
      "cmd": "resources",
      "data": {}
    }

    let hashRateCmd = {
      "cmd": "hashRate",
      "data": {
        "resource": "",
      }
    }

    let disconnectCmd = {
      "cmd": "terminate",
      "data": {}
    }

    let daemonConn = new net.Socket();

    let sendCmdTCP = function(cmd) {
      let buf = Buffer.alloc(BUFF_SIZE);
      buf.write(cmd);
      //let buf = Buffer.from(cmd); //use for local test
      daemonConn.write(buf, "utf8");
      console.log("sent: " + cmd );
    }

    let connectToDaemon = function() {
      let config = dynamineConfig.getConfig();
      daemonConn.connect(config.daemonPort, config.daemonHost, () => {
        if(angular.isDefined(handlers.init)) {
          handlers.init(); // this handler should start all previously enabled miners
        }

        //TODO: Handle password validation
        toast.info("connected to daemon at " + config.daemonHost + ":" + config.daemonPort);
      });

      daemonConn.on('data', (respRaw) => {
        console.log("raw inbound: " + respRaw.toString('utf8'));
        //let jsonStr = dataRaw.toString('utf8').replace(new RegExp("\\\\", 'g'), "");
        let jsonStr = respRaw.toString('utf8').replace(/\0/g, '');
        let resp = JSON.parse(jsonStr);
        if(angular.isDefined(resp.data)) {
          let dataStr = resp.data.replace('/\\\\/g', '');
          let data = JSON.parse(dataStr);
          resp.data = data;
        }

        console.log( "beautiful resp " + angular.toJson(resp));
        if(angular.isDefined(handlers[resp.cmd])){
          handlers[resp.cmd](resp);
        }
      });

      daemonConn.on('error', (errorMsg) => {
        toast.error("Encountered the following daemon connection issue: \"" + errorMsg + "\"");
      });

      daemonConn.on('end', () => {
        toast.warning("disconnected from daemon");
        //TODO: Handle anything else dealing with disconnect
      });
    }

    let fmtResource = function(resource) {
      return resource.split('@')[0];
    }

    let fmtCoinName = function(coin) {
      return (coin) ? coin.charAt(0).toUpperCase() + coin.substr(1) : "";
    }

    return {
      startCoin: function(resource, coin) {
        let coinInfo = dynamineConfig.getInfoForCoin(coin);

        startCoinCmd.data.miner_binary = coinInfo.binary;
        startCoinCmd.data.miner_args['-d'] = fmtResource(resource);
        startCoinCmd.data.miner_args['-a'] = coinInfo.algorithm;
        startCoinCmd.data.miner_args['-o'] = coinInfo.poolServer;
        startCoinCmd.data.miner_args['-u'] = coinInfo.poolUsername;
        startCoinCmd.data.miner_args['-p'] = coinInfo.poolPassword;
        sendCmdTCP(angular.toJson(startCoinCmd));

        modal.show("Starting "+ fmtCoinName(coin) +" Miner");
        //handling timeout
        let timeoutPromise = $timeout(function(){
          if(angular.isDefined(handlers[startCoinCmd.cmd])) {
            handlers[startCoinCmd.cmd]({
              "cmd": "startCoin",
              "data": {
                "result": "Failed to start miner: timeout"
              }
            });
          }
        }, CMD_TIMEOUT);
        timeouts.start = timeoutPromise;
      },
      stopCoin: function(resource) {
        stopCoinCmd.data.resource = fmtResource(resource);
        sendCmdTCP(angular.toJson(stopCoinCmd));

        modal.show("Stopping " + fmtCoinName(dynamineConfig.getResource(resource).coin) + " Miner");

        let timeoutPromise = $timeout(function(){
          if(angular.isDefined(handlers[stopCoinCmd.cmd])) {
            handlers[stopCoinCmd.cmd]({
              "cmd": "stopCoin",
              "data": {
                "result": "Failed to stop miner: timeout"
              }
            });
          }
        }, CMD_TIMEOUT);

        timeouts.stop = timeoutPromise;
      },
      getResources: function() {
        sendCmdTCP(angular.toJson(resourcesCmd));
      },
      getHashRate: function(resource) {
        hashRateCmd.data.resource = fmtResource(resource);;
        sendCmdTCP(angular.toJson(hashRateCmd));
      },
      disconnect: function() {
        sendCmdTCP(angular.toJson(disconnectCmd));
        if(daemonConn.readyState === 1) {
          daemonConn.end();
        }
      },
      connect: function() {
        connectToDaemon();
      },
      /**
      * Whenever a command is received it will pass the data on to a handler.
      * These handlers must be registered with this controller to be used.
      */
      registerCmdHandler: function(cmdName, callback) {
        handlers[cmdName] = callback;
      },
      /**
      *  When we receive a success message from the daemon, cancel the pending failure message
      *  that is shown after the timeout
      */
      clearStartTimeout: function() {
        $timeout.cancel(timeouts.start);
        delete timeouts.start;
      },
      clearStopTimeout : function() {
        $timeout.cancel(timeouts.stop);
        delete timeouts.stop;
      },
      noPendingTimeouts: function() {
        return Object.keys(timeouts).length === 0 && timeouts.constructor === Object;
      }
    }
  }]);
})(window.angular, app, net)
