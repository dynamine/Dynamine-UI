/* global app:true Chart:true */
(function (angular, app) {
    'use strict';
    const controller = 'RemoveCoinController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, ['$scope', '$window', 'toast', 'dynamineConfig', 'daemon', function ($scope, $window, toast, dynamineConfig, daemon) {
        $scope.removeCoin = function(coin) {
          dynamineConfig.disableCoin(coin);
          let resources = dynamineConfig.getResources();
          for(let i = 0; i < resources.length; i++) {
            if(resources[i].coin == coin) {
              daemon.stopCoin(resources[i].name); // killing all miners assigned to the coin being removed
              dynamineConfig.allocateResource(false, resources[i].name, "");
            }
          }
          $window.location.href = '#!/';
        }
    }]);
})(window.angular, app);
