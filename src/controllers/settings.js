/* global app:true Chart:true */
(function (window, angular, app, ipcRenderer, dynamineConfig) {
    'use strict';
    const controller = 'SettingsController';

    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    //console.log(window);
    app.controller(controller, ['$scope', '$base64', 'ajax', 'toast', 'viewFactory', 'dynamineConfig', function ($scope, $base64, ajax, toast, viewFactory, dynamineConfig) {
        console.log("host");
        console.log(dynamineConfig.host);

        viewFactory.title = 'Settings';
        viewFactory.prevUrl = null;
        $scope.dynamineConfig = dynamineConfig;
        $scope.UserLoggingIn = function() {
          toast.success('User Logging in');
        }
        $scope.DaemonToggle = function() {
            toast.success('Daemon Toggled');
        }
        $scope.DaemonConnect = function() {
            toast.success('Daemon Connecting');
        }

        
        //Call login page if not running locally
        // const path = require('path');

        // console.log("Path: ");
        // console.log(path);
        // console.log($element);




        // console.log("Windows location href");
        // console.log(window.location.href);
        // console.log("Host");
        // console.log($scope.dynamineConfig.host)
        // if($scope.dynamineConfig.host == "localhost") {
        //     $element.fadeOut({ duration: 300, complete: function () { window.location.href = 'index.html'; } });
        // }
        // else {

        // }

    }]);
})(window, window.angular, app, ipcRenderer, dynamineConfig);
