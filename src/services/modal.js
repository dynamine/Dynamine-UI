(function(angular, app, window) {
  app.factory('modal',[function() {
    return {
      show: function(msg) {
        window.document.getElementById('coinActionModal').style.display = "block";
        window.document.getElementById('coinActionModalText').innerHTML = msg;
      },
      hide: function() {
        window.document.getElementById('coinActionModal').style.display = "none";
      }
    }
  }]);
})(angular, app, window)
