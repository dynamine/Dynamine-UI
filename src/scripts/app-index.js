'use strict';

/* global app:true dynamineConfig:true appConfig:true */
(function (angular, app, dynamineConfig, appConfig) {

    if (typeof app === 'undefined') throw 'app-index.js: app is undefined';

    /**
     * Holds current page title, current host URL and
     * URL of the previous page.
     */
    app.factory('viewFactory', function () {
        return { title: '', prevUrl: '', host: dynamineConfig.host };
    });

    /**
     * Configures route provider and ajax provider.
     */
    app.config(['$routeProvider', 'ajaxProvider' , function ($routeProvider, ajaxProvider) {
        ajaxProvider.setHost(dynamineConfig.host);
        ajaxProvider.contentType('application/json; charset=utf-8');
        ajaxProvider.accept('application/json');

        /* Add a basic authorization header
         if username and password are provided in the settings. */
        if (typeof dynamineConfig.username === 'string' && dynamineConfig.username) {
            ajaxProvider.basicAuth(dynamineConfig.username, dynamineConfig.password || '');
        }

        /* Configure routes. */
        $routeProvider
            .when('/', {
                templateUrl: 'views/add-coin.html',
                controller: 'AddCoinController'
            })
            .when('/bitcoin', {
                templateUrl: 'views/bitcoin.html',
                controller: 'BitcoinController'
            })
            .when('/litecoin', {
                templateUrl: 'views/litecoin.html',
                controller: 'LitecoinController'
            })
            .when('/monero', {
                // templateUrl: 'views/MoneroResourceAllocation.html',
                templateUrl: 'views/monero.html',
                controller: 'MoneroController'
            })
            .when('/zcash', {
                templateUrl: 'views/zcash.html',
                controller: 'ZcashController'
            })
            .when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'SettingsController'
            })
            .otherwise({
                templateUrl: 'views/add-coin.html',
                controller: 'AddCoinController'
            });
    }]);

    /**
     * Detects and highlights the correct
     * sidebar link upon location change.
     */
    app.run(['$rootScope', 'viewFactory', function ($rootScope, viewFactory) {
        $rootScope.ngViewAnimation = appConfig.enableAnimation ? 'slide-right' : '';

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            viewFactory.deleteAction = null;
            viewFactory.prevUrl = current;

            if (next.indexOf('#') > 1) {
                let refArray = next.split('#!/')[1].split('/');
                let href = '#!/' + refArray[0], nav  = angular.element('nav.navigation');

                nav.find('a.navigation__link').removeClass('active');
                nav.find('.navigation__link[data-ng-href="' + href + '"]').addClass('active');
            }
        });
    }]);

})(window.angular, app, dynamineConfig, appConfig);

/* global angular:true ipcRenderer:true */
(function (window, angular, content, ipcRenderer) {

    ipcRenderer.on('open-settings-view', function () {
        /* TODO: use $location */
        window.location.href = '#!/settings';
    });

    /**
     * Open all external links in default browser.
     */
    content.on('click', 'a[href^="http"]', function (event) {
        event.preventDefault();
        ipcRenderer.send('open-external', event.target.href);
    });

    /**
     * Deletes a resource when a delete button is pressed.
     */
    content.on('click', '.delete', function (event) {
        event.preventDefault();

        let target = angular.element(event.target);
        let action = target.hasClass('disable') ? 'Disable' : 'Delete';

        if (confirm (action + ' this ' + target.data('target') + '?')) {
            let ajax  = angular.element('html').injector().get('ajax');
            let toast = angular.element('body').injector().get('toast');

            ajax.delete({ resource: target.data('url') }).then(function () {
                toast.success(target.data('target') + ' ' + action.toLowerCase() + 'd');

                if ( event.target.nodeName === 'I' ) target.parents('tr').fadeOut(200);
                else window.location.href = target.data('redirect');

            }, function (response) {
                toast.error(response.data);
            });
        }
    });

})(window, window.angular, angular.element('main.content'), ipcRenderer);
