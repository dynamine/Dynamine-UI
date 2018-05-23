(function(angular, app) {
  app.factory('zcashWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
    let MAX_TRANSACTIONS  = 20;
    let coinName = "zcash";
    let walletBalanceHandler;


    return {
      getWalletBalance: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;

        $.ajax({
          url: "https://api.zcha.in/v2/mainnet/accounts/" + walletAddress,
          type: "GET",
          datatype: "json",
          success: function(data) {
            console.log("zcash data: " + JSON.stringify(data));
            //TODO: Call handler
          }
        });
      },

      getWalletTransactions: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;

        $.ajax({
          url: "https://api.zcha.in/v2/mainnet/accounts/" + walletAddress + "/recv?limit=24&offset=0",
          type: "GET",
          datatype: "json",
          success: function(data) {
            console.log("zcash txn data: " + JSON.stringify(data));
            //TODO: write to metrics and send off an event
          }
        });
      }
    };
  }]);
})(window.angular, app)
