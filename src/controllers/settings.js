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


    }]);
})(window, window.angular, app, ipcRenderer, dynamineConfig);
