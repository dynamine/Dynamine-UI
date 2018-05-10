/* global app:true Chart:true */
(function (angular, app) {
    'use strict';
    const controller = 'AddCoinController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, ['$scope', 'ajax', 'toast', 'viewFactory', 'dynamineConfig', function ($scope, ajax, toast, viewFactory, dynamineConfig) {
        viewFactory.title = 'Add Coin';
        viewFactory.prevUrl = null;

        $scope.isEnabled = function(coin){
          return dynamineConfig.isCoinEnabled(coin);
        }

        $scope.addCoin = function(coin) {
          if(!coin.name || !coin.walletAddress) {
            toast.error("Must specify a coin and wallet address");
          } else {
            dynamineConfig.addCoin(coin);
            toast.success('Coin Added');
            document.getElementById('add_coin_select').value = ""; //reseting the select to placeholder option
          }
        }
    }]);
})(window.angular, app);
