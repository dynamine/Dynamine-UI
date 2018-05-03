/* global app:true Chart:true */
(function (angular, app) {
    'use strict';
    const controller = 'AddCoinController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, ['$scope', 'ajax', 'toast', 'viewFactory', function ($scope, ajax, toast, viewFactory) {
        viewFactory.title = 'Add Coin';
        viewFactory.prevUrl = null;

        $scope.addCoin = function() {
          toast.success('Coin Added');
        }
    }]);
})(window.angular, app);
