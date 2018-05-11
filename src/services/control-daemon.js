(function(angular, app, net) {
  app.factory('daemon',[ 'toast', 'dynamineConfig', function(toast, dynamineConfig){
    let BUFF_SIZE = 1024;

    let handlers = {} //where we will put code that handles incoming data

    let startCoinCmd = {
      "cmd": "startMiner",
      "data": {
        "resource": "",
        "miner_binary": "",
        "miner_args": {
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
        //TODO: Handle password validation
        toast.info("connected to daemon at " + config.daemonHost + ":" + config.daemonPort);
      });

      daemonConn.on('data', (dataRaw) => {
        console.log("raw inbound: " + dataRaw.toString('utf8'));
        let data = JSON.parse(dataRaw.toString('utf8'));
        // console.log(JSON.stringify(data));
        if(angular.isDefined(handlers[data.cmd])){
          handlers[data.cmd](data);
        }
      });

      daemonConn.on('end', () => {
        toast.warning("disconnected from daemon");
        //TODO: Handle anything else dealing with disconnect
      });
    }

    return {
      startCoin: function(resource, algo, walletAddress, poolServer, poolPassword) {
        startCoinCmd.data.resource = resource;
        startCoinCmd.data.miner_binary = "ccminer-x64";
        startCoinCmd.data.miner_args['-a'] = algo;
        startCoinCmd.data.miner_args['-o'] = poolServer;
        startCoinCmd.data.miner_args['-u'] = walletAddress;
        startCoinCmd.data.miner_args['-p'] = poolPassword;
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
