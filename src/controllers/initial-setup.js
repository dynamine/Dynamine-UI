/* global app:true ipcRenderer:true dynamineConfig:true */
(function (window, angular, app, ipcRenderer, dynamineConfig) { 'use strict';
    const controller = 'InitialSetupController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, ['$scope', '$element', '$base64', 'ajax', 'toast',
        function ($scope, $element, $base64, ajax, toast) {

        let statusBar = $element.find('footer.footer').children('span');
        statusBar.html('Reading configuration...');

        $scope.dynamineConfig = dynamineConfig;
        $scope.version = ipcRenderer.sendSync('get-config', 'VERSION');

        let form = $element.find('form#configForm');
        let connect = function (config, writeConfig) {
            if ($scope.dynamineConfig.host.charAt($scope.dynamineConfig.host.length - 1) === '/') {
                $scope.dynamineConfig.host = $scope.dynamineConfig.host.substring(0, $scope.dynamineConfig.host.length - 1);
            }

            // TODO: Look to connect with default creds on localhost:4001 daemon
            // and if it finds it bypass login screen and continue with loading items
            if($scope.dynamineConfig.host == "localhost") {
                $element.fadeOut({ duration: 300, complete: function () { window.location.href = 'index.html'; } });
            }

            ajax.get(config).then(function (response) {
                try {
                    if (typeof response.data !== 'object' || typeof response.data.version === 'undefined') {
                        toast.error('Could not detect Dynamine Admin API running on the provided URL');
                        if (form.hasClass('hidden')) form.fadeIn(400);
                        return;
                    }
                } catch (e) {
                    toast.error('Could not detect Dynamine Admin API running on the provided URL');
                    if (form.hasClass('hidden')) form.fadeIn(400);
                    return;
                }

                if (writeConfig === true) {
                    ipcRenderer.send('write-config', { name: 'dynamine', config: $scope.dynamineConfig });

                } else {
                    $element.fadeOut({ duration: 300, complete: function () { window.location.href = 'index.html'; } });
                }

            }, function (response) {
                if (form.hasClass('hidden')) form.fadeIn(400);

                if (response.status && 401 === parseInt(response.status)) {
                    toast.error('Please provide correct username and password');

                } else {
                    toast.error('Could not connect to ' + $scope.dynamineConfig.host);
                }
            });
        };

        ipcRenderer.on('write-config-success', function () {
            $element.fadeOut({ duration: 300, complete: function () { window.location.href = 'index.html'; } });

        }).on('write-config-error', function (event, arg) {
            toast.error(arg.message);

            let interval = setInterval(function () {
                clearInterval(interval);
                window.location.href = 'index.html';
            }, 2000);
        });

        form.on('submit', function (event) {
            event.preventDefault();

            let config = {url: $scope.dynamineConfig.host, headers: {}};

            if ($scope.dynamineConfig.username) {
                config.headers['Authorization'] = 'Basic ' + $base64.encode($scope.dynamineConfig.username + ':' + ($scope.dynamineConfig.password || ''));
            }

            connect(config, true);
            return false;
        });

        let timeout = setInterval(function () {
            statusBar.html('');
            $element.find('.icon').slideUp({ duration: 300 });

            if (typeof $scope.dynamineConfig.host === 'string' && $scope.dynamineConfig.host) {
                connect({url: dynamineConfig.host}, false);
                clearInterval(timeout);

            } else {
                form.fadeIn({ duration: 400, complete: function () { clearInterval(timeout); } });
            }
        }, 2000);
    }]);

})(window, window.angular, app, ipcRenderer, dynamineConfig);
