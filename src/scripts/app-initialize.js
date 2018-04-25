/* global app:true DynamineConfig:true */
(function (app, DynamineConfig) { 'use strict';

    if (typeof app === 'undefined') throw 'app-initialize.js: app is undefined';

    // app.config(['ajaxProvider', function (ajaxProvider) {
    //     ajaxProvider.accept('application/json');
    //     ajaxProvider.contentType('application/json');

    //     if (typeof DynamineConfig.username === 'string') {
    //         ajaxProvider.basicAuth(DynamineConfig.username, DynamineConfig.password || '');
    //     }
    // }]);

    //TODO:
    //Might need to config username and password

})(app, DynamineConfig);
