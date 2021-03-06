(function (app) {
    'use strict';

    const controller = 'EnabledCoinsController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, ['dynamineConfig', function (config) {
      this.isEnabled = function(coin){
        return config.isCoinEnabled(coin);
      }
    }]);
})(app);
