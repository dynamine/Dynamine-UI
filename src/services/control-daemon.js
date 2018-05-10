(function(angular, app, net) {
  app.factory('daemon',[ 'toast', 'dynamineConfig', function(toast, dynamineConfig){
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

    let daemonConn = new net.Socket();

    let connectToDaemon = function() {
      let config = dynamineConfig.getConfig();
      daemonConn.connect(config.daemonPort, config.daemonHost, () => {
        //TODO: Handle password validation
        toast.info("connected to daemon at " + config.daemonHost + ":" + config.daemonPort);
      });

      daemonConn.on('data', (dataRaw) => {
        let data = JSON.parse(dataRaw);

        //TODO: Handle map incoming commands to handlers
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

        daemonConn.write(JSON.stringify(startCoinCmd));
      },
      stopCoin: function(deviceID) {
        stopCoinCmd.data.deviceID = deviceID;

        daemonConn.write(JSON.stringify(stopCoinCmd))
      },
      getResources: function() {
        daemonConn.write(JSON.stringify(resourcesCmd));
      },
      disconnect: function() {
        daemonConn.end();
      },
      connect: function() {
        connectToDaemon();
      },
      registerCmdHandler: function(cmdName, callback) {
        handlers['cmdName'] = callback;
      }
    }
  }]);
})(window.angular, app, net)
