// for misc. utility methods
// WARNING: This should NOT depend on any other services since most of them will depend on This
// avoid circular dependencies!
(function(app){
  app.factory('utils', [function(){
    return {
      isEmpty: function(obj) {
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
        }
        return true;
      }
    }
  }]);
})(app)
