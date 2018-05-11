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

    app.controller(controller, ['$scope', 'ajax', 'toast', 'viewFactory', 'dynamineConfig', 'callzcashWallet', function ($scope, ajax, toast, viewFactory, dynamineConfig, callzcashWallet) {
        viewFactory.title = 'Zcash';
        viewFactory.prevUrl = null;
        let coinName = "zcash";
        var walletAddress;
        var walbal;
        var walnumtrans;
        var payments;
        var coinchart;

        walletAddress = callzcashWallet.callconfig(dynamineConfig);
        walbal = callzcashWallet.callwalletbal(walletAddress);
        walnumtrans = callzcashWallet.callwalletnumtrans(walletAddress);
        payments = callzcashWallet.callwallettrans(walletAddress);
        console.log("Transactions: ");
        console.log(payments);

        $scope.getWalletBalance = function() {
            walbal = '' + walbal;
            return walbal;
        }

         $scope.getWalletNumTrans = function() {
             walnumtrans = '' + walnumtrans;
             return walnumtrans;
         }


        $scope.getWalletPayment1 = function() {
            console.log("Transaction type: " + typeof(payments));
            console.log(payments);
            return payments[0];
        }

        $scope.getWalletPayment2 = function() {
            return payments[1];
        }

        $scope.getWalletPayment3 = function() {
            return payments[2];
        }

        $scope.getWalletPayment4 = function() {
            return payments[3];
        }

        $scope.getWalletPayment5 = function() {
            return payments[4];
        }


        $scope.resources = dynamineConfig.getResources();

        $scope.allocateResource = function(resource) {
          if( document.getElementById(resource.name).checked) {
            if(resource.coin && resource.coin != coinName) {
              //TODO: Call to remove old miner
            }
            dynamineConfig.allocateResource(true, resource.name, coinName);
            $scope.resources = dynamineConfig.getResources();
            //TODO: Call to add new miner
          } else {
            dynamineConfig.allocateResource(false, resource.name, "");
            $scope.resources = dynamineConfig.getResources();
            //TODO: Call to remove old miner
          }
        }

        $scope.resourceChecked = function(resource) {
          return (resource.allocated && resource.coin == coinName);
        }

        $scope.getPoolHost = function() {
          return dynamineConfig.getInfoForCoin(coinName).poolServer;
        }

        $scope.getWalletAddress = function() {
          return dynamineConfig.getInfoForCoin(coinName).walletAddress;
        }

        $scope.getDaemonHost = function() {
          return dynamineConfig.getConfig().daemonHost;
        }

        $scope.refreshWalletTokens = function(master) {
          coinchart = createChart('#ZcashWalletChart', {
              type: 'line',
              data: { labels: [], datasets: [{
                  data: [ 104584, 118655, 98979, 9775, 6655, 6887, 4422, 6483, 9580, 12676, 10755, 7755, 9657, 6589, 5893, 6657, 8896, 10742, 11466, 12332, 11433, 11543, 10053, 12743],
                  label: 'coins',
                  backgroundColor: ['rgba(24, 138, 226, 0.5)', 'rgba(16, 196, 105, 0.5)', 'rgba(128, 197, 218, 0.5)',
                      'rgba(248, 142, 15, 0.5)', 'rgba(207, 32, 241, 0.5)', 'rgba(91, 105, 188, 0.5)', 'rgba(24, 138, 226, 0.5)']
                  //backgroundColor:['#10C469', '#FFCE56']
              }]}
          });

          setInterval(function(){
            var payments = callzcashWallet.callwallettrans(walletAddress);
            coinchart.update(payments);
            }, 100000);

          if(!master || master !== true)
              toast.success('Timers data has been updated');
        };

        $scope.refreshHashRate = function(master) {
          //Populating chart with static data for the sake of wireframes
          createChart('#ZcashHashChart', {
              type: 'line',
              data: { labels: [], datasets: [{
                  data: [ 30, 40, 15, 80, 45, 90], //TODO: Chnage to host data
                  backgroundColor: ['rgba(24, 138, 226, 0.5)', 'rgba(16, 196, 105, 0.5)', 'rgba(128, 197, 218, 0.5)',
                      'rgba(248, 142, 15, 0.5)', 'rgba(207, 32, 241, 0.5)', 'rgba(91, 105, 188, 0.5)', 'rgba(24, 138, 226, 0.5)'],
                  borderColor: ['#188AE2', '#10C469', '#80C5DA', '#F88E0F', '#CF20F1', '#5B69BC', '#188AE2'],
                  borderWidth: 1, label: 'net hash rate'
              }] }
          });

          if(!master || master !== true)
              toast.success('Node Status data has been updated');
        };

        $scope.refreshHashRate(true);
        $scope.refreshWalletTokens(true);

    }]);
})(window.angular, app, Chart);
