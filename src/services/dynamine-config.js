(function(angular, app, fs) {
  app.factory('dynamineConfig', ['toast', function(toast) {
    const CONFIG_PATH = 'dynamine_cache.json';

    let config = {
      "daemonHost": "localhost",
      "daemonPort": "1337",
      "daemonPassword": "",
      "clusterId": "",
      "clusterPassword": "",
      "resources": [],
      "coins": {
        "bitcoin": {
          "enabled": false,
          "algorithm": "bitcoin",
          "binary": "ccminer-x64",
          "walletAddress": "",
          "poolServer": "stratum+tcp://rvn.suprnova.cc:6666",
          "poolUsername": "tpruvot.win",
          "poolPassword": "x"
        },
        "litecoin": {
          "enabled": false,
          "algorithm": "",
          "binary": "",
          "walletAddress": "",
          "poolServer": "",
          "poolUsername": "",
          "poolPassword": ""
        },
        "monero": {
          "enabled": false,
          "algorithm": "",
          "binary": "",
          "walletAddress": "",
          "poolServer": "",
          "poolUsername": "",
          "poolPassword": ""
        },
        "zcash": {
          "enabled": false,
          "algorithm": "",
          "binary": "",
          "walletAddress": "",
          "poolServer": "",
          "poolUsername": "",
          "poolPassword": ""
        }
      }
    }

    // loading synchronously since this is only done at startup and a lot of nasty code would have to be written otherwise
    let reloadConfig = function() {
      if(fs.existsSync(CONFIG_PATH)) {
        let data = fs.readFileSync(CONFIG_PATH, 'utf8')
        let dynamineConfig = JSON.parse(data);

        // map cached fields if found
        //TODO: replace everything with angular.isDefined
        if(angular.isDefined(dynamineConfig.daemonHost)) { config.daemonHost = dynamineConfig.daemonHost; }
        if(typeof dynamineConfig.daemonPort !== 'undefined') { config.daemonPort = dynamineConfig.daemonPort; }
        if(typeof dynamineConfig.daemonPassword !== 'undefined') { config.daemonPassword = dynamineConfig.daemonPassword; }
        if(typeof dynamineConfig.clusterId !== 'undefined') { config.clusterId = dynamineConfig.clusterId; }
        if(typeof dynamineConfig.clusterPassword !== 'undefined') { config.clusterPassword = dynamineConfig.clusterPassword; }
        if(dynamineConfig.resources.length != 0) { config.resources = dynamineConfig.resources; }

        if(typeof dynamineConfig.coins.bitcoin.enabled !== 'undefined') { config.coins.bitcoin.enabled = dynamineConfig.coins.bitcoin.enabled; }
        if(typeof dynamineConfig.coins.bitcoin.walletAddress !== 'undefined') { config.coins.bitcoin.walletAddress = dynamineConfig.coins.bitcoin.walletAddress; }
        if(angular.isDefined(dynamineConfig.coins.bitcoin.algorithm)) { config.coins.bitcoin.algorithm = dynamineConfig.coins.bitcoin.algorithm; }
        if(angular.isDefined(dynamineConfig.coins.bitcoin.binary)) { config.coins.bitcoin.binary = dynamineConfig.coins.bitcoin.binary; }
        if(typeof dynamineConfig.coins.bitcoin.poolServer !== 'undefined') { config.coins.bitcoin.poolServer = dynamineConfig.coins.bitcoin.poolServer; }
        if(typeof dynamineConfig.coins.bitcoin.poolUsername !== 'undefined') { config.coins.bitcoin.poolUsername= dynamineConfig.coins.bitcoin.poolUsername; }
        if(typeof dynamineConfig.coins.bitcoin.poolPassword !== 'undefined') { config.coins.bitcoin.poolPassword = dynamineConfig.coins.bitcoin.poolPassword; }

        if(typeof dynamineConfig.coins.litecoin.enabled !== 'undefined') { config.coins.litecoin.enabled = dynamineConfig.coins.litecoin.enabled; }
        if(typeof dynamineConfig.coins.litecoin.walletAddress !== 'undefined') { config.coins.litecoin.walletAddress = dynamineConfig.coins.litecoin.walletAddress; }
        if(angular.isDefined(dynamineConfig.coins.litecoin.algorithm)) { config.coins.litecoin.algorithm = dynamineConfig.coins.litecoin.algorithm; }
        if(angular.isDefined(dynamineConfig.coins.litecoin.binary)) { config.coins.litecoin.binary = dynamineConfig.coins.litecoin.binary; }
        if(typeof dynamineConfig.coins.litecoin.poolServer !== 'undefined') { config.coins.litecoin.poolServer = dynamineConfig.coins.litecoin.poolServer; }
        if(typeof dynamineConfig.coins.litecoin.poolUsername !== 'undefined') { config.coins.litecoin.poolUsername= dynamineConfig.coins.litecoin.poolUsername; }
        if(typeof dynamineConfig.coins.litecoin.poolPassword !== 'undefined') { config.coins.litecoin.poolPassword = dynamineConfig.coins.litecoin.poolPassword; }

        if(typeof dynamineConfig.coins.monero.enabled !== 'undefined') { config.coins.monero.enabled = dynamineConfig.coins.monero.enabled; }
        if(typeof dynamineConfig.coins.monero.walletAddress !== 'undefined') { config.coins.monero.walletAddress = dynamineConfig.coins.monero.walletAddress; }
        if(angular.isDefined(dynamineConfig.coins.monero.algorithm)) { config.coins.monero.algorithm = dynamineConfig.coins.monero.algorithm; }
        if(angular.isDefined(dynamineConfig.coins.monero.binary)) { config.coins.monero.binary = dynamineConfig.coins.monero.binary; }
        if(typeof dynamineConfig.coins.monero.poolServer !== 'undefined') { config.coins.monero.poolServer = dynamineConfig.coins.monero.poolServer; }
        if(typeof dynamineConfig.coins.monero.poolUsername !== 'undefined') { config.coins.monero.poolUsername= dynamineConfig.coins.monero.poolUsername; }
        if(typeof dynamineConfig.coins.monero.poolPassword !== 'undefined') { config.coins.monero.poolPassword = dynamineConfig.coins.monero.poolPassword; }

        if(typeof dynamineConfig.coins.zcash.enabled !== 'undefined') { config.coins.zcash.enabled = dynamineConfig.coins.zcash.enabled; }
        if(typeof dynamineConfig.coins.zcash.walletAddress !== 'undefined') { config.coins.zcash.walletAddress = dynamineConfig.coins.zcash.walletAddress; }
        if(angular.isDefined(dynamineConfig.coins.zcash.algorithm)) { config.coins.zcash.algorithm = dynamineConfig.coins.zcash.algorithm; }
        if(angular.isDefined(dynamineConfig.coins.zcash.binary)) { config.coins.zcash.binary = dynamineConfig.coins.zcash.binary; }
        if(typeof dynamineConfig.coins.zcash.poolServer !== 'undefined') { config.coins.zcash.poolServer = dynamineConfig.coins.zcash.poolServer; }
        if(typeof dynamineConfig.coins.zcash.poolUsername !== 'undefined') { config.coins.zcash.poolUsername= dynamineConfig.coins.zcash.poolUsername; }
        if(typeof dynamineConfig.coins.zcash.poolPassword !== 'undefined') { config.coins.zcash.poolPassword = dynamineConfig.coins.zcash.poolPassword; }
      }
    }

    let saveConfig = function() {
      let data = angular.toJson(config, true); //must use this to avoid writing angular internal data to file
      fs.writeFile(CONFIG_PATH, data,  (err) => {
          if (err) toast.console.error('Failed to cache UI configuration');;
      });
    }

    return {
        disableCoin: function(coinName) {
          // preventing incorrect field creation
          if (typeof config.coins[coinName].enabled !== 'undefined') { config.coins[coinName].enabled = false; }
          saveConfig();
        },
        enableCoin: function(coin) {
          // preventing incorrect field creation
          if (typeof config.coins[coinName].enabled !== 'undefined') { config.coins[coinName].enabled = true; }
          saveConfig();
        },
        addCoin: function(coin) {
          if (typeof config.coins[coin.name] !== 'undefined') {
            config.coins[coin.name].enabled       = true;
            config.coins[coin.name].walletAddress = coin.walletAddress;
            config.coins[coin.name].poolServer    = coin.poolServer;
            config.coins[coin.name].poolUsername  = coin.poolUsername;
            config.coins[coin.name].poolPassword  = coin.poolPassword;
            saveConfig();
          }
        },
        isCoinEnabled: function(coinName) {
          let ret = config.coins[coinName].enabled;
          return (typeof ret !== 'undefined') ? ret : false; // ensuring a boolean is returned. Even though undefine is a falsey type, a boolean is nicer
        },
        getInfoForCoin: function(coinName) {
          return Object.assign({}, config.coins[coinName]);
        },

        setClusterId: function(clusterId) {
          config.clusterId = clusterId;
          saveConfig();
        },
        setClusterPasword: function(clusterPassword) {
          config.clusterPassword = clusterPassword;
          saveConfig();
        },
        setDaemonHost: function(host) {
          config.daemonHost = host;
          saveConfig();
        },
        setDaemonPassword: function(pass) {
          config.daemonPassword = pass;
          saveConfig();
        },

        syncResources: function(resources) {
          let finalResources = [];

          // For every element in the args, append it to the config, but do NOT override what is already there
          for(let i = 0; i < resources.length; i++) {
            let concat = true;
            for (let j = 0; j < config.resources.length; j++) {
              if (config.resources[j].name == resources[i].name) {
                concat = false;
              }
            }
            if(concat) {
              config.resources.push(resources[i]);
            }
          }

          // For every element in our config, if it is not in the daemon remove it
          for(let i = 0; i < config.resources.length; i++) {
            let rm = true;
            for (let j = 0; j < resources.length; j++) {
                if(config.resources[i].name === resources[j].name) {
                  rm = false;
                  break;
                }
            }
            if (rm) {
              config.resources.splice(i, 1);
            }
          }
          saveConfig();
        },
        allocateResource: function(allocated, resource, coin, hashRate) {
          for (let i = 0; i < config.resources.length; i++) {
            if( config.resources[i].name == resource ) {
              config.resources[i].allocated = allocated;
              config.resources[i].coin = coin;
              config.resources[i].hashRate = hashRate;
              break;
            }
          }
          saveConfig();
        },
        getResources: function() {
          return Object.assign({}, config.resources);
        },
        /**
        * returns a resource object with the specified name or nothing if resource is not found
        */
        getResource: function(name) {
          for (let i = 0; i < config.resources.length; i++) {
            if( config.resources[i].name == name ) {
              return config.resources[i];
            }
          }
        },


        getConfig: function() {
          return Object.assign({}, config); // returning a copy of the config to prevent bad side effects from messing with vals
        },
        loadConfig: function() {
          reloadConfig(); //exposing the refresh helper. need to do it this way because of JS scope issues
        },
        saveConfig: function() {
          saveConfig();
        }
    }
  }]);
})(window.angular, app, fs)
