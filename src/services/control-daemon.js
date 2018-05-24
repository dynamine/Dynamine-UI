(function(angular, app, net) {
  app.factory('daemon',[ 'toast', 'dynamineConfig', function(toast, dynamineConfig){
    let BUFF_SIZE = 1024;

    let handlers = {} //where we will put code that handles incoming data

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

    return {
      startCoin: function(resource, coin) {
        let coinInfo = dynamineConfig.getInfoForCoin(coin);

        startCoinCmd.data.miner_binary = coinInfo.binary;
        startCoinCmd.data.miner_args['-d'] = resource;
        startCoinCmd.data.miner_args['-a'] = coinInfo.algorithm;
        startCoinCmd.data.miner_args['-o'] = coinInfo.poolServer;
        startCoinCmd.data.miner_args['-u'] = coinInfo.walletAddress;
        startCoinCmd.data.miner_args['-p'] = coinInfo.poolPassword;
        sendCmdTCP(angular.toJson(startCoinCmd));
      },
      stopCoin: function(resource) {
        stopCoinCmd.data.deviceID = resource;
        sendCmdTCP(angular.toJson(stopCoinCmd));
      },
      getResources: function() {
        sendCmdTCP(angular.toJson(resourcesCmd));
      },
      getHashRate: function(resource) {
        hashRateCmd.data.resource = resource;
        sendCmdTCP(angular.toJson(hashRateCmd));
      },
      disconnect: function() {
        daemonConn.end();
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
      }
    }
  }]);
})(window.angular, app, net)
