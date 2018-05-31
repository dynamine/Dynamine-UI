/* global app:true Chart:true */
(function (angular, app) {
    'use strict';
    const controller = 'SettingsController';

    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    //console.log(window);
    app.controller(controller, ['$scope', 'toast', 'viewFactory', 'dynamineConfig', 'daemon', function ($scope, toast, viewFactory, dynamineConfig, daemon) {
        viewFactory.title = 'Settings';
        viewFactory.prevUrl = null;
        $scope.UserLoggingIn = function() {
          toast.success('User Logging in');
        }
        $scope.DaemonToggle = function() {
            toast.success('Daemon Toggled');
        }
        $scope.DaemonConnect = function(daemonInfo) {
            dynamineConfig.setDaemonHost(daemonInfo.host);
            dynamineConfig.setDaemonPort(daemonInfo.port);
            daemon.disconnect(); // clear any old connection
            daemon.connect();
            daemon.getResources();
            toast.success('Daemon Connecting');
        }
        //Call login page if not running locally
        // const path = require('path');
        //
        // console.log("Path: ");
        // console.log(path);
        // console.log($element);
        //
        //
        //
        //
        // console.log("Windows location href");
        // console.log(window.location.href);
        // if($scope.dynamineConfig.host == "localhost") {
        //     $element.fadeOut({ duration: 300, complete: function () { window.location.href = 'index.html'; } });
        // }
        // else {
        //
        // }

    }]);
})(window.angular, app);
