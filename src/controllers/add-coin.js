/* global app:true Chart:true */
(function (angular, app) {
    'use strict';
    const controller = 'AddCoinController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, ['$scope', 'ajax', 'toast', 'viewFactory', 'dynamineConfig', function ($scope, ajax, toast, viewFactory, dynamineConfig) {
        viewFactory.title = 'Add Coin';
        viewFactory.prevUrl = null;

        $scope.addCoin = function(coin) {
          console.log(JSON.stringify(coin))
          dynamineConfig.enableCoin("bitcoin");
          dynamineConfig.saveConfig();
          toast.success('Coin Added');
        }
    }]);
})(window.angular, app);
