/* global app:true Chart:true */
(function (angular, app) {
    'use strict';
    const controller = 'SettingsController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, ['$scope', 'ajax', 'toast', 'viewFactory', function ($scope, ajax, toast, viewFactory) {
        viewFactory.title = 'Settings';
        viewFactory.prevUrl = null;

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
        if($scope.dynamineConfig.host == "localhost:4001") {
            $element.fadeOut({ duration: 300, complete: function () { window.location.href = 'settings.html'; } });
        }
        else {
            $element.fadeOut({ duration: 300, complete: function () { window.location.href = 'initialize.html'; } });v
        }

    }]);
})(window.angular, app);
