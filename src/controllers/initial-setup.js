/* global app:true ipcRenderer:true DynamineConfig:true */
(function (window, angular, app, ipcRenderer, DynamineConfig) { 'use strict';
    const controller = 'InitialSetupController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');


    app.controller(controller, ['$scope', '$element', '$base64', 'toast', //ajax out of call
        function ($scope, $element, $base64, toast) { //ajax out

        let statusBar = $element.find('footer.footer').children('span');
        statusBar.html('Reading configuration...');

        $scope.DynamineConfig = DynamineConfig;
        $scope.version = ipcRenderer.sendSync('get-config', 'VERSION');

        let form = $element.find('form#configForm');
        let connect = function (config, writeConfig) { //IDK
            // if ($scope.DynamineConfig.host.charAt($scope.DynamineConfig.host.length - 1) === '/') {
            //     $scope.DynamineConfig.host = $scope.DynamineConfig.host.substring(0, $scope.DynamineConfig.host.length - 1);
            // }

            //Handle Password and Username Authentication from Django website 
            //TODO: Temp let any user in until Electron UI can be configed to Django
            app.get(config).then(function (response) {
                // try {
                //     if (typeof response.data !== 'object' || typeof response.data.version === 'undefined') {
                //         toast.error('Could not detect Dynamine Admin API running on the provided URL');
                //         if (form.hasClass('hidden')) form.fadeIn(400);
                //         return;
                //     }
                // } catch (e) {
                //     toast.error('Could not detect Dynamine Admin API running on the provided URL');
                //     if (form.hasClass('hidden')) form.fadeIn(400);
                //     return;
                // }

                if (writeConfig === true) {
                    ipcRenderer.send('write-config', { name: 'Dynamine', config: $scope.DynamineConfig });

                } else {
                    $element.fadeOut({ duration: 300, complete: function () { window.location.href = 'index.html'; } });
                }

            }, function (response, stat) {
                if (form.hasClass('hidden')) form.fadeIn(400);

                if (response.status && 401 === parseInt(response.status)) {
                    toast.error('Please provide correct username and password');

                } else {
                    toast.error('Could not connect to ' + $scope.DynamineConfig.host + ' status: ' + response.stat);
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

            //let config = {url: $scope.DynamineConfig.host, headers: {}};

            // if ($scope.DynamineConfig.username) {
            //     config.headers['Authorization'] = 'Basic ' + $base64.encode($scope.DynamineConfig.username + ':' + ($scope.DynamineConfig.password || ''));
            // }

            let config = {user: $scope.DynamineConfig.username, password: $scope.DynamineConfig.password}; //added for cofiguring password and username
            return false;
        });

        //Timeout of Dynamine Application 
        let timeout = setInterval(function () {
            statusBar.html('');
            $element.find('.icon').slideUp({ duration: 300 });

            if (typeof $scope.DynamineConfig.username && $scope.DynamineConfig.password) { //TODO Change of conditions
                connect({user: DynamineConfig.username, password: DynamineConfig.password}, false);
                clearInterval(timeout);

            } else {
                form.fadeIn({ duration: 400, complete: function () { clearInterval(timeout); } });
            }
        }, 2000);
    }]);

})(window, window.angular, app, ipcRenderer, DynamineConfig);