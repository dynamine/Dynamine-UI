(function (app) { 'use strict';
    const controller = 'TabController';
    if (typeof app === 'undefined') throw (controller + ': app is undefined');

    app.controller(controller, function () {
      this.tab = 1;
      this.selectTab = function (setTab){
      	this.tab = setTab;
      };
      this.isSelected = function(checkTab) {
      	return this.tab === checkTab;
      };
    });
})(app);
