/* global app:true Chart:true */
(function (angular, app, Chart) { 'use strict';
    const controller = 'ZcashController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    Chart.defaults.global.defaultFontColor = '#9db4be';
    Chart.defaults.global.defaultFontStyle = 'bold';

    let createChart = function (container, data) {
        if (typeof data.options === 'undefined') data.options = {responsive: true, scales: {xAxes: [{ticks: {beginAtZero: true}}]}};

        return new Chart (angular.element(container)[0].getContext('2d'), data);
    };

    app.controller(controller, ['$scope', 'coinController', 'viewFactory', 'dynamineConfig', 'zcashWallet', 'daemon', 'coinMetrics', function ($scope, coinController, viewFactory, dynamineConfig, zcashWallet, daemon, coinMetrics) {
        viewFactory.title = 'Zcash';
        viewFactory.prevUrl = null;
        let coinName = 'zcash';
        let coinSym = 'ZEC'
        let shownTransactionLimit = 3;
        let hashRateLabels = [];
        let walletTokensLabels = [];

        /**
        * defining angular pubsub handlers
        */
        let handleWalletTransactions = function() {
          walletTokensLabels = [];
          $scope.walletTransactions = [];
          let walletTokenData = coinMetrics.getMetricsByName(coinName, 'walletTransactions');
          for (let i =0; i < walletTokenData.length; i++) {
            if(i < shownTransactionLimit) {
              $scope.walletTransactions.push(walletTokenData[walletTokenData.length - i - 1]);
            }
            walletTokensLabels.push(i);
          }
          $scope.refreshWalletTokens();
        }

        let handleWalletBallance = function() {
          $scope.walletBalance = coinMetrics.getMetricsByName(coinName, 'walletBalance') + " " + coinSym;
        }

        $scope.coinName = coinName;

        $scope.coinController = coinController;

        $scope.refreshWalletTokens = function(master) {
          createChart('#ZcashWalletChart', {
              type: 'line',
              data: { labels: [], datasets: [{
                  data: payments,
                  label: 'coins',
                  backgroundColor: ['rgba(24, 138, 226, 0.5)', 'rgba(16, 196, 105, 0.5)', 'rgba(128, 197, 218, 0.5)',
                      'rgba(248, 142, 15, 0.5)', 'rgba(207, 32, 241, 0.5)', 'rgba(91, 105, 188, 0.5)', 'rgba(24, 138, 226, 0.5)']
                  //backgroundColor:['#10C469', '#FFCE56']
              }]}
          });
        };

        $scope.refreshHashRate = function(master) {
          //Populating chart with static data for the sake of wireframes
          createChart('#ZcashHashChart', {
              type: 'line',
              data: {
                labels: hashRateLabels,
                datasets: [{
                  data: coinMetrics.getMetricsByName(coinName, 'hashRate'),
                  backgroundColor: ['rgba(24, 138, 226, 0.5)', 'rgba(16, 196, 105, 0.5)', 'rgba(128, 197, 218, 0.5)',
                      'rgba(248, 142, 15, 0.5)', 'rgba(207, 32, 241, 0.5)', 'rgba(91, 105, 188, 0.5)', 'rgba(24, 138, 226, 0.5)'],
                  borderColor: ['#188AE2', '#10C469', '#80C5DA', '#F88E0F', '#CF20F1', '#5B69BC', '#188AE2'],
                  borderWidth: 1,
                  label: 'net hash rate'
                }]
              },
              options: {
                scales: {
                  xAxes: [{
                    display: false
                  }]
                }
              }
          });
        };

        $scope.$on(coinName+'HashRate', function(event, data) {
          hashRateLabels = [];
          let metricData = coinMetrics.getMetricsByName(coinName, 'hashRate');
          for (let i =0; i < metricData.length; i++) {
            hashRateLabels.push(i);
          }
          $scope.refreshHashRate(); // refreshing hashrate when receive a new metric
        });

        $scope.$on(coinName + "WalletTransactions", handleWalletTransactions());

        $scope.$on(coinName + 'WalletBalance', handleWalletBallance());

        handleWalletTransactions();
        handleWalletBallance();
        $scope.refreshHashRate(true);
        $scope.refreshWalletTokens(true);

    }]);
})(window.angular, app, Chart);
