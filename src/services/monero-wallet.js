(function(angular, app) {
    var moneroWallet = require('monero-nodejs');
    //Can specify hostname and port if wanted in the moneroWallet instance
    var Wallet = new moneroWallet();
    

    app.factory('callmoneroWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        
       

        return {
        callbalance: function() {
            var balance = Wallet.balance();
            console.log(balance);
        }
        
      
    };
  }]);
})(window.angular, app)