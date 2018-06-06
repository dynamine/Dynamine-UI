/* global app:true Chart:true */
(function (angular, app) {
    'use strict';
    const controller = 'SettingsController';

    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    //console.log(window);
    app.controller(controller, ['$scope', 'toast', 'viewFactory', 'dynamineConfig', 'daemon', function ($scope, toast, viewFactory, dynamineConfig, daemon) {
        viewFactory.title = 'Settings';
        viewFactory.prevUrl = null;

        $scope.dynamineConfig = dynamineConfig;

        $scope.DaemonConnect = function(daemonInfo) {
          dynamineConfig.setDaemonHost(daemonInfo.host);
          dynamineConfig.setDaemonPort(daemonInfo.port);
          daemon.disconnect(); // clear any old connection
          daemon.connect();
        }

        $scope.DaemonDisconnect = function() {
          daemon.disconnect();
        }

        $scope.DaemonHalt = function() {
          daemon.halt();
          toast.info("Successfully halted daemon");
        }

        $scope.daemonIsConnected = function() {
          return daemon.connectionIsOpen();
        }
    }]);
})(window.angular, app);
