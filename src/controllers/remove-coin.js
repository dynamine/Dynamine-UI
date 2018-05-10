/* global app:true Chart:true */
(function (angular, app) {
    'use strict';
    const controller = 'RemoveCoinController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, ['$scope', '$window', 'toast', 'dynamineConfig', function ($scope, $window, toast, dynamineConfig) {
        $scope.removeCoin = function(coin) {
          dynamineConfig.disableCoin(coin);
          $window.location.href = '#!/';
          toast.success('Coin Removed');
        }
    }]);
})(window.angular, app);
