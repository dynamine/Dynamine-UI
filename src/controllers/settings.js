/* global app:true ipcRenderer:true dynamineConfig:true appConfig:true */
(function (angular, app, ipcRenderer, dynamineConfig, appConfig) { 'use strict';
    const controller = 'SettingsController';

    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, ['$rootScope', '$scope', '$base64', 'ajax', 'viewFactory', 'toast', function ($rootScope, $scope, $base64, ajax, viewFactory, toast) {
        viewFactory.prevUrl = null;
        viewFactory.title = 'Settings';

        $scope.dynamineConfig = dynamineConfig;
        $scope.appConfig  = appConfig;
        $scope.version = ipcRenderer.sendSync('get-config', 'VERSION');

        let formDynamineConfig = angular.element('form#formDynamineConfig');

        ipcRenderer.on('write-config-success', function () {
            toast.success('Settings saved');

        }).on('write-config-error', function (event, arg) {
            toast.error(arg.message);
        });

        formDynamineConfig.on('submit', function (event) {
            event.preventDefault();

            if ($scope.dynamineConfig.host.charAt($scope.dynamineConfig.host.length - 1) === '/') {
                $scope.dynamineConfig.host = $scope.dynamineConfig.host.substring(0, $scope.dynamineConfig.host.length - 1);
            }

            let config = {
                url: $scope.dynamineConfig.host,
                headers: { 'Authorization': 'Basic ' + $base64.encode($scope.dynamineConfig.username + ':' + ($scope.dynamineConfig.password || ''))}
            };

            ajax.get(config).then(function (response) {
                try {
                    if (typeof response.data !== 'object' || typeof response.data.version === 'undefined') {
                        toast.error('Could not detect Dynamine Admin API running on the provided URL');
                        return;
                    }

                    viewFactory.host = dynamineConfig.host = $scope.dynamineConfig.host;
                    dynamineConfig.username = $scope.dynamineConfig.username;
                    dynamineConfig.password = $scope.dynamineConfig.password;

                    ipcRenderer.send('write-config', { name: 'dynamine', config: $scope.dynamineConfig });

                    ajax.setHost(dynamineConfig.host);
                    ajax.basicAuth($scope.dynamineConfig.username, $scope.dynamineConfig.password);

                } catch (e) {
                    toast.error('Could not detect Dynamine Admin API running on the provided URL');
                }

            }, function (response) {
                if (response.status && parseInt(response.status) === 401 && $scope.dynamineConfig.username)
                    toast.error('Invalid username or password');

                else if (response.status && parseInt(response.status) === 401)
                    toast.error('Please enter username and password');

                else
                    toast.error('Could not connect to ' + $scope.dynamineConfig.host);
            });

            return false;
        });

        angular.element('#toggleAnimation').on('click', function (event) {
            let checkbox = angular.element(event.target);

            if (checkbox.is(':checked')) {
                $rootScope.ngViewAnimation = 'slide-right';
                $scope.appConfig.enableAnimation = true;

            } else {
                $rootScope.ngViewAnimation = '';
                $scope.appConfig.enableAnimation = false;
            }

            ipcRenderer.send('write-config', { name: 'app', config: $scope.appConfig });
        });
    }]);
})(window.angular, app, ipcRenderer, dynamineConfig, appConfig);