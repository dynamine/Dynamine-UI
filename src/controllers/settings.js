/* global app:true Chart:true */
(function (window, angular, app, ipcRenderer, dynamineConfig) {
    'use strict';
    const controller = 'SettingsController';

    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    //console.log(window);
    app.controller(controller, ['$scope', '$base64', 'ajax', 'toast', 'viewFactory', 'dynamineConfig', 'daemon', function ($scope, $base64, ajax, toast, viewFactory, dynamineConfig, daemon) {

        viewFactory.title = 'Settings';
        viewFactory.prevUrl = null;
        $scope.dynamineConfig = dynamineConfig;


        //TODO: Cluster if we are still doing it
        $scope.UserLoggingIn = function() {
          toast.success('User Logging in');
        }

        //Daemon Host and Password
        $scope.DaemonToggle = function() {
            $('#DaemonOn').click(function() {
                if($('#DaemonOn').is(':checked')) { 
                    var resources = dynamineConfig.getResources();
                    for(var i = 0; i < resources.length; i++) {
                      if(resources[i].coin == coin) {
                        daemon.startCoin(resources[i].name, resources[i].coin); 
                        dynamineConfig.allocateResource(true, resources[i].name, resources[i].coin, resources[i].hashRate);
                      }
                    }
                    toast.success("Daemon Toggled On");
                }
             });
             $('#DaemonOff').click(function() {
                if($('#Daemon').is(':checked')) { 
                    for(var key in resources.coin) {
                        dynamineConfig.disableCoin(resources[key].coin);
                    }
                    var resources = dynamineConfig.getResources();
                    for(var i = 0; i < resources.length; i++) {
                        if(resources[i].coin == coin) {
                            daemon.stopCoin(resources[i].name); 
                        }
                    }
                    toast.success("Daemon Toggled Off");
                }
             });     

        }
        

        $scope.DaemonConnect = function() {
            var config = dynamineConfig.getConfig();
            config.daemonHost = $('#DaemonHost').val();
            config.daemonPassword = $('#DaemonPassword').val();
            toast.success("Daemon Connection Configured");
        }



    }]);
})(window, window.angular, app, ipcRenderer, dynamineConfig);
