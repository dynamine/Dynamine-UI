/* global app:true Chart:true */
(function (angular, app, Chart) { 'use strict';
    const controller = 'LitecoinController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    Chart.defaults.global.defaultFontColor = '#9db4be';
    Chart.defaults.global.defaultFontStyle = 'bold';

    let createChart = function (container, data) {
        if (typeof data.options === 'undefined') data.options = {responsive: true, scales: {xAxes: [{ticks: {beginAtZero: true}}]}};

        return new Chart (angular.element(container)[0].getContext('2d'), data);
    };

    app.controller(controller, ['$scope', 'ajax', 'toast', 'viewFactory', function ($scope, ajax, toast, viewFactory) {
        viewFactory.title = 'Litecoin';
        viewFactory.prevUrl = null;

        $scope.refreshWalletTokens = function(master) {
          createChart('#LitecoinWalletChart', {
              type: 'line',
              data: { labels: [], datasets: [{
                  data: [ 90, 66, 97, 78],
                  label: 'tokens',
                  backgroundColor: ['rgba(24, 138, 226, 0.5)', 'rgba(16, 196, 105, 0.5)', 'rgba(128, 197, 218, 0.5)',
                      'rgba(248, 142, 15, 0.5)', 'rgba(207, 32, 241, 0.5)', 'rgba(91, 105, 188, 0.5)', 'rgba(24, 138, 226, 0.5)']
                  //backgroundColor:['#10C469', '#FFCE56']
              }]}
          });

          if(!master || master !== true)
              toast.success('Timers data has been updated');
        };

        $scope.refreshHashRate = function(master) {
          //Populating chart with static data for the sake of wireframes
          createChart('#LitecoinHashChart', {
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

        $scope.removeCoin = function(){
          toast.success('Removed Coin');
        };

        $scope.refreshHashRate(true);
        $scope.refreshWalletTokens(true);

    }]);
})(window.angular, app, Chart);
