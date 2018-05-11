/* global app:true Chart:true */
(function (angular, app, Chart, callbcWallet) { 'use strict';
    const controller = 'BitcoinController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    Chart.defaults.global.defaultFontColor = '#9db4be';
    Chart.defaults.global.defaultFontStyle = 'bold';

    let createChart = function (container, data) {
        if (typeof data.options === 'undefined') data.options = {responsive: true, scales: {xAxes: [{ticks: {beginAtZero: true}}]}};

        return new Chart (angular.element(container)[0].getContext('2d'), data);
    };

    app.controller(controller, ['$scope', 'ajax', 'toast', 'viewFactory', 'dynamineConfig', 'callbcWallet', 'daemon', 'coinMetrics', function ($scope, ajax, toast, viewFactory, dynamineConfig, callbcWallet, daemon, coinMetrics) {
        viewFactory.title = 'Bitcoin';
        viewFactory.prevUrl = null;
        var walletAddress;
        var walletstats;
        let config = dynamineConfig.getConfig();
        // walletAddress = callbcWallet.callconfig(dynamineConfig);
        // walletstats = callbcWallet.callwallet(walletAddress);
        // console.log(walletAddress);
        $scope.getWalletAPIHost = function() {
            return walletAddress;
        }

        $scope.getWalletStats = function() {
            return walletAddress;
        }

        var response;
        let coinName = "bitcoin";

        $scope.resources = dynamineConfig.getResources();

        $scope.allocateResource = function(resource) {
          if( document.getElementById(resource.name).checked) {
            if(resource.coin && resource.coin != coinName) {
              daemon.stopCoin(resource.name);
            }
            dynamineConfig.allocateResource(true, resource.name, coinName);
            daemon.startCoin(resource.name, dynamineConfig.getInfoForCoin(coinName).algorithm,  dynamineConfig.getInfoForCoin(coinName).walletAddress, dynamineConfig.getInfoForCoin(coinName).poolServer, dynamineConfig.getInfoForCoin(coinName).poolPassword);
            $scope.resources = dynamineConfig.getResources();
          } else {
            dynamineConfig.allocateResource(false, resource.name, "");
            daemon.stopCoin(resource.name);
            $scope.resources = dynamineConfig.getResources();
          }
        }

        $scope.resourceChecked = function(resource) {
          console.log("res: " + JSON.stringify(resource))
          return (resource.allocated && resource.coin == coinName);
        }

        $scope.getPoolHost = function() {
          return dynamineConfig.getInfoForCoin(coinName).poolServer;
        }

        $scope.getWalletAddress = function() {
          return dynamineConfig.getInfoForCoin(coinName).walletAddress;
        }

        //callbcWallet.callconfig();

        $scope.refreshWalletTokens = function(master) {
          createChart('#BitcoinWalletChart', {
              type: 'line',
              data: { labels: [], datasets: [{
                  data: [ 0.01, 0.025, 0.011, 0.02],
                  label: 'coins',
                  backgroundColor: ['rgba(24, 138, 226, 0.5)', 'rgba(16, 196, 105, 0.5)', 'rgba(128, 197, 218, 0.5)',
                      'rgba(248, 142, 15, 0.5)', 'rgba(207, 32, 241, 0.5)', 'rgba(91, 105, 188, 0.5)', 'rgba(24, 138, 226, 0.5)']
                  //backgroundColor:['#10C469', '#FFCE56']
              }]}
          });

          if(!master || master !== true)
              toast.success('Timers data has been updated');
        };

        $scope.getDaemonHost = function() {
          return dynamineConfig.getConfig().daemonHost;
        }

        $scope.refreshHashRate = function(master) {
          //Populating chart with static data for the sake of wireframes
          createChart('#BitcoinHashChart', {
              type: 'line',
              data: { labels: [], datasets: [{
                  data: coinMetrics.getMetricsByName(coinName, 'hashRate'),
                  backgroundColor: ['rgba(24, 138, 226, 0.5)', 'rgba(16, 196, 105, 0.5)', 'rgba(128, 197, 218, 0.5)',
                      'rgba(248, 142, 15, 0.5)', 'rgba(207, 32, 241, 0.5)', 'rgba(91, 105, 188, 0.5)', 'rgba(24, 138, 226, 0.5)'],
                  borderColor: ['#188AE2', '#10C469', '#80C5DA', '#F88E0F', '#CF20F1', '#5B69BC', '#188AE2'],
                  borderWidth: 1, label: 'net hash rate'
              }] }
          });
        };

        $scope.$on(coinName+'HashRate', function(event, data) {
          $scope.refreshHashRate(); // refreshing hashrate when receive a new metric
        });

        $scope.refreshHashRate(true);
        $scope.refreshWalletTokens(true);

    }]);
})(window.angular, app, Chart);
