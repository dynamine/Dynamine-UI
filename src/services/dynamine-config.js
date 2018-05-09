(function(angular, app, fs) {
  app.factory('dynamineConfig', ['toast', function(toast) {
    const CONFIG_PATH = 'dynamine_cache.json';

    let config = {
      daemonHost: '',
      daemonPassword: '',
      clusterId: '',
      clusterPassword: '',
      coins: {
        bitcoin: {
          enabled: false,
          walletAddress: '',
          walletAPIHost: '',
          poolServer: '',
          poolUsername: '',
          poolPassword: ''
        },
        ethereum: {
          enabled: false,
          walletAddress: '',
          walletAPIHost: '',
          poolServer: '',
          poolUsername: '',
          poolPassword: ''
        },
        litecoin: {
          enabled: false,
          walletAddress: '',
          walletAPIHost: '',
          poolServer: '',
          poolUsername: '',
          poolPassword: ''
        },
        monero: {
          enabled: false,
          walletAddress: '',
          walletAPIHost: '',
          poolServer: '',
          poolUsername: '',
          poolPassword: ''
        },
        zcash: {
          enabled: false,
          walletAddress: '',
          walletAPIHost: '',
          poolServer: '',
          poolUsername: '',
          poolPassword: ''
        }
      }
    }

    // loading synchronously since this is only done at startup and a lot of nasty code would have to be written otherwise
    let reloadConfig = function() {
      if(fs.existsSync(CONFIG_PATH)) {
        let data = fs.readFileSync(CONFIG_PATH, 'utf8')
        let dynamineConfig = JSON.parse(data);

        // map cached fields if found
        if(typeof dynamineConfig.daemonHost !== 'undefined') { config.daemonHost = dynamineConfig.daemonHost; }
        if(typeof dynamineConfig.daemonPassword !== 'undefined') { config.daemonPassword = dynamineConfig.daemonPassword; }
        if(typeof dynamineConfig.clusterId !== 'undefined') { config.clusterId = dynamineConfig.clusterId; }
        if(typeof dynamineConfig.clusterPassword !== 'undefined') { config.clusterPassword = dynamineConfig.clusterPassword; }

        if(typeof dynamineConfig.coins.bitcoin.enabled !== 'undefined') { config.coins.bitcoin.enabled = dynamineConfig.coins.bitcoin.enabled; }
        if(typeof dynamineConfig.coins.bitcoin.walletAddress !== 'undefined') { config.coins.bitcoin.walletAddress = dynamineConfig.coins.bitcoin.walletAddress; }
        if(typeof dynamineConfig.coins.bitcoin.walletAPIHost !== 'undefined') { config.coins.bitcoin.walletAPIHost = dynamineConfig.coins.bitcoin.walletAPIHost; }
        if(typeof dynamineConfig.coins.bitcoin.poolServer !== 'undefined') { config.coins.bitcoin.poolServer = dynamineConfig.coins.bitcoin.poolServer; }
        if(typeof dynamineConfig.coins.bitcoin.poolUsername !== 'undefined') { config.coins.bitcoin.poolUsername= dynamineConfig.coins.bitcoin.poolUsername; }
        if(typeof dynamineConfig.coins.bitcoin.poolPassword !== 'undefined') { config.coins.bitcoin.poolPassword = dynamineConfig.coins.bitcoin.poolPassword; }

        if(typeof dynamineConfig.coins.ethereum.enabled !== 'undefined') { config.coins.ethereum.enabled = dynamineConfig.coins.ethereum.enabled; }
        if(typeof dynamineConfig.coins.ethereum.walletAddress !== 'undefined') { config.coins.ethereum.walletAddress = dynamineConfig.coins.ethereum.walletAddress; }
        if(typeof dynamineConfig.coins.ethereum.walletAPIHost !== 'undefined') { config.coins.ethereum.walletAPIHost = dynamineConfig.coins.ethereum.walletAPIHost; }
        if(typeof dynamineConfig.coins.ethereum.poolServer !== 'undefined') { config.coins.ethereum.poolServer = dynamineConfig.coins.ethereum.poolServer; }
        if(typeof dynamineConfig.coins.ethereum.poolUsername !== 'undefined') { config.coins.ethereum.poolUsername= dynamineConfig.coins.ethereum.poolUsername; }
        if(typeof dynamineConfig.coins.ethereum.poolPassword !== 'undefined') { config.coins.ethereum.poolPassword = dynamineConfig.coins.ethereum.poolPassword; }

        if(typeof dynamineConfig.coins.litecoin.enabled !== 'undefined') { config.coins.litecoin.enabled = dynamineConfig.coins.litecoin.enabled; }
        if(typeof dynamineConfig.coins.litecoin.walletAddress !== 'undefined') { config.coins.litecoin.walletAddress = dynamineConfig.coins.litecoin.walletAddress; }
        if(typeof dynamineConfig.coins.litecoin.walletAPIHost !== 'undefined') { config.coins.litecoin.walletAPIHost = dynamineConfig.coins.litecoin.walletAPIHost; }
        if(typeof dynamineConfig.coins.litecoin.poolServer !== 'undefined') { config.coins.litecoin.poolServer = dynamineConfig.coins.litecoin.poolServer; }
        if(typeof dynamineConfig.coins.litecoin.poolUsername !== 'undefined') { config.coins.litecoin.poolUsername= dynamineConfig.coins.litecoin.poolUsername; }
        if(typeof dynamineConfig.coins.litecoin.poolPassword !== 'undefined') { config.coins.litecoin.poolPassword = dynamineConfig.coins.litecoin.poolPassword; }

        if(typeof dynamineConfig.coins.monero.enabled !== 'undefined') { config.coins.monero.enabled = dynamineConfig.coins.monero.enabled; }
        if(typeof dynamineConfig.coins.monero.walletAddress !== 'undefined') { config.coins.monero.walletAddress = dynamineConfig.coins.monero.walletAddress; }
        if(typeof dynamineConfig.coins.monero.walletAPIHost !== 'undefined') { config.coins.monero.walletAPIHost = dynamineConfig.coins.monero.walletAPIHost; }
        if(typeof dynamineConfig.coins.monero.poolServer !== 'undefined') { config.coins.monero.poolServer = dynamineConfig.coins.monero.poolServer; }
        if(typeof dynamineConfig.coins.monero.poolUsername !== 'undefined') { config.coins.monero.poolUsername= dynamineConfig.coins.monero.poolUsername; }
        if(typeof dynamineConfig.coins.monero.poolPassword !== 'undefined') { config.coins.monero.poolPassword = dynamineConfig.coins.monero.poolPassword; }

        if(typeof dynamineConfig.coins.zcash.enabled !== 'undefined') { config.coins.zcash.enabled = dynamineConfig.coins.zcash.enabled; }
        if(typeof dynamineConfig.coins.zcash.walletAddress !== 'undefined') { config.coins.zcash.walletAddress = dynamineConfig.coins.zcash.walletAddress; }
        if(typeof dynamineConfig.coins.zcash.walletAPIHost !== 'undefined') { config.coins.zcash.walletAPIHost = dynamineConfig.coins.zcash.walletAPIHost; }
        if(typeof dynamineConfig.coins.zcash.poolServer !== 'undefined') { config.coins.zcash.poolServer = dynamineConfig.coins.zcash.poolServer; }
        if(typeof dynamineConfig.coins.zcash.poolUsername !== 'undefined') { config.coins.zcash.poolUsername= dynamineConfig.coins.zcash.poolUsername; }
        if(typeof dynamineConfig.coins.zcash.poolPassword !== 'undefined') { config.coins.zcash.poolPassword = dynamineConfig.coins.zcash.poolPassword; }
      }
    }

    let saveConfig = function() {
      let data = JSON.stringify(config, null, 2);
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
