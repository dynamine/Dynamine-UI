(function(angular, app) {
  app.factory('callbcWallet', ['dynamineConfig', 'coinMetrics', 'ajax', '$rootScope', function(dynamineConfig, coinMetrics, ajax, $rootScope){
    let MAX_TRANSACTIONS  = 30;
    let coinName = "bitcoin";
    var walletBalanceHandler;

    return {
      setWalletBalanceHandler: function(handler) {
        walletBalanceHandler = handler;
      },
      getWalletBalance: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;

        //Get wallet address full endpoint and parse
        $.ajax({
          url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress+ "/full",
          type: "GET",
          async: false,
          datatype: "json",
          success: function(data) {
            if(walletBalanceHandler) {
              walletBalanceHandler(data);
            } else {
              console.log("bitcoin wallet ballance handler not set.")
            }
          }
        });
      },

      getWalletTransactions: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;

        //Get wallet address full endpoint and parse
        $.ajax({
          url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress + "?limit=" + MAX_TRANSACTIONS,
          type: "GET",
          datatype: "json",
          success: function(data) {
            console.log("txn data: " + JSON.stringify(data));
            for (let i = 0; i < data.txrefs.length; i++) {
              coinMetrics.addMetric(coinName, "walletTransactions", data.txrefs[data.txrefs.length - i - 1].value);
            }
            $rootScope.$broadcast(coinName + 'walletTransactions', {});
          }
        });
      }
    };
  }]);
})(window.angular, app)
