/* global app:true dynamineConfig:true */
(function (app, dynamineConfig) { 'use strict';

    if (typeof app === 'undefined') throw 'app-initialize.js: app is undefined';

    app.config(['ajaxProvider', function (ajaxProvider) {
        ajaxProvider.accept('application/json');
        ajaxProvider.contentType('application/json');

        if (typeof dynamineConfig.username === 'string') {
            ajaxProvider.basicAuth(dynamineConfig.username, dynamineConfig.password || '');
        }
    }]);

})(app, dynamineConfig);
