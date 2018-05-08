'use strict';
var fs = require('fs');

/* global angular:true ngDependency:true */
var app = angular.module('Dynamine', ['ngAnimate', 'base64'].concat(typeof ngDependency === 'undefined' ? [] : ngDependency));

app.provider('ajax', ['$base64',  function ($base64) {
    let httpConfig = {};

    let httpRequest = function (config) {
        let request = {
            method: config.method,
            url: config.url || (httpConfig.host + config.resource),
            headers: {},
            withCredentials: false
        };

        if (typeof config.data === 'object')
            request.data = config.data;

        if (typeof httpConfig.authorization === 'string') {
            request.withCredentials = true;
            request.headers['Authorization'] = httpConfig.authorization;
        }

        if (typeof httpConfig.accept === 'string')
            request.headers['Accept'] = httpConfig.accept;

        if (typeof httpConfig.contentType === 'string')
            request.headers['Content-Type'] = httpConfig.contentType;

        if (typeof config.headers === 'object') {
            Object.keys(config.headers).forEach(function (item) {
                request.headers[item] = config.headers[item];
            });
        }

        if (Object.keys(request.headers).length <= 0)
            delete request.headers;

        return request;
    };

    this.setHost = function (host) {
        httpConfig.host = host;
    };

    this.basicAuth = function (username, password) {
        httpConfig.authorization = 'Basic ' + $base64.encode(username + ':' + (password || ''));
    };

    this.accept = function (type) {
        httpConfig.accept = type;
    };

    this.contentType = function (type) {
        httpConfig.contentType = type;
    };

    this.$get = ['$http', function ($http) {
        return {
            request: function (config) {
                return $http(httpRequest(config));
            },
            get: function (config) {
                config.method = 'GET';
                return $http(httpRequest(config));
            },
            post: function (config) {
                config.method = 'POST';
                return $http(httpRequest(config));
            },
            put: function (config) {
                config.method = 'PUT';
                return $http(httpRequest(config));
            },
            patch: function (config) {
                config.method = 'PATCH';
                return $http(httpRequest(config));
            },
            delete: function (config) {
                config.method = 'DELETE';
                return $http(httpRequest(config));
            },
            setHost: function (host) {
                httpConfig.host = host;
            },
            basicAuth: function (username, password) {
                if (!username) return;
                httpConfig.authorization = 'Basic ' + $base64.encode(username + ':' + (password || ''));
            }
        };
    }];
}]);

//TODO: Set up Config here
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
        poolServer: '',
        poolUsername: '',
        poolPassword: ''
      },
      ethereum: {
        enabled: false,
        walletAddress: '',
        poolServer: '',
        poolUsername: '',
        poolPassword: ''
      },
      litecoin: {
        enabled: false,
        walletAddress: '',
        poolServer: '',
        poolUsername: '',
        poolPassword: ''
      },
      monero: {
        enabled: false,
        walletAddress: '',
        poolServer: '',
        poolUsername: '',
        poolPassword: ''
      },
      zcash: {
        enabled: false,
        walletAddress: '',
        poolServer: '',
        poolUsername: '',
        poolPassword: ''
      }
    }
  }

  // loading synchronously since this is only done at startup and a lot of nasty code would have to be written otherwise
  let reloadConfig = function() {
    let data = fs.readFileSync(CONFIG_PATH, 'utf8')
    let dynamineConfig = JSON.parse(data);

    // map cached fields if found
    if(typeof dynamineConfig.daemonHost !== 'undefined') { config.daemonHost = dynamineConfig.daemonHost; }
    if(typeof dynamineConfig.daemonPassword !== 'undefined') { config.daemonPassword = dynamineConfig.daemonPassword; }
    if(typeof dynamineConfig.clusterId !== 'undefined') { config.clusterId = dynamineConfig.clusterId; }
    if(typeof dynamineConfig.clusterPassword !== 'undefined') { config.clusterPassword = dynamineConfig.clusterPassword; }

    if(typeof dynamineConfig.coins.bitcoin.enabled !== 'undefined') { config.coins.bitcoin.enabled = dynamineConfig.coins.bitcoin.enabled; }
    if(typeof dynamineConfig.coins.bitcoin.walletAddress !== 'undefined') { config.coins.bitcoin.walletAddress = dynamineConfig.coins.bitcoin.walletAddress; }
    if(typeof dynamineConfig.coins.bitcoin.poolServer !== 'undefined') { config.coins.bitcoin.poolServer = dynamineConfig.coins.bitcoin.poolServer; }
    if(typeof dynamineConfig.coins.bitcoin.poolUsername !== 'undefined') { config.coins.bitcoin.poolUsername= dynamineConfig.coins.bitcoin.poolUsername; }
    if(typeof dynamineConfig.coins.bitcoin.poolPassword !== 'undefined') { config.coins.bitcoin.poolPassword = dynamineConfig.coins.bitcoin.poolPassword; }

    if(typeof dynamineConfig.coins.ethereum.enabled !== 'undefined') { config.coins.ethereum.enabled = dynamineConfig.coins.ethereum.enabled; }
    if(typeof dynamineConfig.coins.ethereum.walletAddress !== 'undefined') { config.coins.ethereum.walletAddress = dynamineConfig.coins.ethereum.walletAddress; }
    if(typeof dynamineConfig.coins.ethereum.poolServer !== 'undefined') { config.coins.ethereum.poolServer = dynamineConfig.coins.ethereum.poolServer; }
    if(typeof dynamineConfig.coins.ethereum.poolUsername !== 'undefined') { config.coins.ethereum.poolUsername= dynamineConfig.coins.ethereum.poolUsername; }
    if(typeof dynamineConfig.coins.ethereum.poolPassword !== 'undefined') { config.coins.ethereum.poolPassword = dynamineConfig.coins.ethereum.poolPassword; }

    if(typeof dynamineConfig.coins.litecoin.enabled !== 'undefined') { config.coins.litecoin.enabled = dynamineConfig.coins.litecoin.enabled; }
    if(typeof dynamineConfig.coins.litecoin.walletAddress !== 'undefined') { config.coins.litecoin.walletAddress = dynamineConfig.coins.litecoin.walletAddress; }
    if(typeof dynamineConfig.coins.litecoin.poolServer !== 'undefined') { config.coins.litecoin.poolServer = dynamineConfig.coins.litecoin.poolServer; }
    if(typeof dynamineConfig.coins.litecoin.poolUsername !== 'undefined') { config.coins.litecoin.poolUsername= dynamineConfig.coins.litecoin.poolUsername; }
    if(typeof dynamineConfig.coins.litecoin.poolPassword !== 'undefined') { config.coins.litecoin.poolPassword = dynamineConfig.coins.litecoin.poolPassword; }

    if(typeof dynamineConfig.coins.monero.enabled !== 'undefined') { config.coins.monero.enabled = dynamineConfig.coins.monero.enabled; }
    if(typeof dynamineConfig.coins.monero.walletAddress !== 'undefined') { config.coins.monero.walletAddress = dynamineConfig.coins.monero.walletAddress; }
    if(typeof dynamineConfig.coins.monero.poolServer !== 'undefined') { config.coins.monero.poolServer = dynamineConfig.coins.monero.poolServer; }
    if(typeof dynamineConfig.coins.monero.poolUsername !== 'undefined') { config.coins.monero.poolUsername= dynamineConfig.coins.monero.poolUsername; }
    if(typeof dynamineConfig.coins.monero.poolPassword !== 'undefined') { config.coins.monero.poolPassword = dynamineConfig.coins.monero.poolPassword; }

    if(typeof dynamineConfig.coins.zcash.enabled !== 'undefined') { config.coins.zcash.enabled = dynamineConfig.coins.zcash.enabled; }
    if(typeof dynamineConfig.coins.zcash.walletAddress !== 'undefined') { config.coins.zcash.walletAddress = dynamineConfig.coins.zcash.walletAddress; }
    if(typeof dynamineConfig.coins.zcash.poolServer !== 'undefined') { config.coins.zcash.poolServer = dynamineConfig.coins.zcash.poolServer; }
    if(typeof dynamineConfig.coins.zcash.poolUsername !== 'undefined') { config.coins.zcash.poolUsername= dynamineConfig.coins.zcash.poolUsername; }
    if(typeof dynamineConfig.coins.zcash.poolPassword !== 'undefined') { config.coins.zcash.poolPassword = dynamineConfig.coins.zcash.poolPassword; }
  }

  let saveConfig = function() {
    let data = JSON.stringify(config, null, 2);
    fs.writeFile(CONFIG_PATH, data,  (err) => {
        if (err) toast.console.error('Failed to cache UI configuration');;
    });
  }

  return {
      disableCoin: function(coin) {
        // preventing incorrect field creation
        if (typeof config.coins[coin].enabled !== 'undefined') { config.coins[coin].enabled = false; }
      },
      enableCoin: function(coin) {
        // preventing incorrect field creation
        if (typeof config.coins[coin].enabled !== 'undefined') { config.coins[coin].enabled = true; }
      },
      isCoinEnabled: function(coin) {
        let ret = config.coins[coin].enabled;
        return (typeof ret !== 'undefined') ? ret : false; // ensuring a boolean is returned. Even though undefine is a falsey type, a boolean is nicer
      },
      setCoinWalletAddress: function(coin, address) {

      },
      setCoinPoolServer: function(coin, server) {

      },
      setCoinPoolUsername: function(coin, username) {

      },
      setCoinPoolPassword: function(coin, pasword) {

      },

      setClusterId: function() {

      },
      setClusterPasword: function() {

      },
      setDaemonHost: function(host) {

      },
      setDaemonPassword: function(pass) {

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

app.factory('toast', function () {
    return {
        displayMessage: function (message) {
            let body = angular.element('body'), text = '', status;

            if (body.children('.notification').length > 0)
                body.children('.notification').remove();

            try {
                if (typeof message.text === 'object') {
                    if (Object.keys(message.text).length > 0) {
                        let firstKey = Object.keys(message.text)[0];

                        if ((firstKey === 'error' || firstKey === 'message') && typeof message.text[firstKey] === 'string')
                            text = message.text[firstKey];
                        else
                            text = firstKey + ' ' + message.text[firstKey];

                    } else {
                        text = 'No details available!';
                    }
                } else {
                    text = message.text;
                }
            } catch (e) {
                text = 'No details available!';
            }

            switch (message.type) {
                case 'danger':
                    status = 'Error!';
                    break;

                case 'success':
                    status = 'Success!';
                    break;

                case 'warning':
                    status = 'Warning!';
                    break;

                default:
                    status = 'Message:';
                    break;
            }

            let div = angular.element('<div></div>', {class: 'notification ' + message.type})
                .html('<b>' + status + '</b> ' + text + '.')
                .on('click', function () {
                    div.fadeOut(200);
                });

            body.append(div);
            let interval = setInterval(function () {
                div.fadeOut({
                    duration: 1000, complete: function () {
                        clearInterval(interval);
                    }
                });
            }, 4000);
        },
        error: function (message) {
            this.displayMessage({ type: 'danger', text: message });
        },
        warning: function (message) {
            this.displayMessage({ type: 'warning', text: message });
        },
        info: function (message) {
            this.displayMessage({ type: 'info', text: message });
        },
        success: function (message) {
            this.displayMessage({ type: 'success', text: message });
        }
    };
});

/**
 * Converts first letter of a string to uppercase and
 * replaces underscores with whitespaces.
 */
app.filter('pgname', function () {
    return function (input) {
        if (typeof input !== 'string' || input === null) {
            return '';
        }

        return (input.charAt(0).toUpperCase() + input.substr(1).toLowerCase()).split('_').join(' ');
    };
});

/**
 * Strips protocol (http:// or https://) from URL.
 */
app.filter('stripProtocol', function () {
    return function (input) {
        if (!input) return '';

        if (input.indexOf('s://') > 1) return input.split('https://')[1];

        return (input.split('http://')[1]) || '';
    };
});

/**
 * Joins a string array with commas.
 */
app.filter('splice', function () {
    return function (input) {
        if (typeof input !== 'object') {
            return '';
        }

        return input.join(', ');
    };
});
