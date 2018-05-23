(function(angular, app) {
  app.factory('litecoinWallet', ['dynamineConfig', 'coinMetrics', 'ajax', '$rootScope', function(dynamineConfig,  coinMetrics, ajax, $rootScope){
    let MAX_TRANSACTIONS  = 20;
    let coinName = "litecoin";
    let walletBalanceHandler;

    return {
      photonToLTC: function(photons) {
        return (photons * 0.00000001).toFixed(8);
      },
      setWalletBalanceHandler: function(handler) {
        walletBalanceHandler = handler;
      },
      getWalletBalance: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;

        $.ajax({
          url: "https://api.blockcypher.com/v1/ltc/main/addrs/" + walletAddress+ "/full",
          type: "GET",
          datatype: "json",
          success: function(data) {
            if(walletBalanceHandler) {
              walletBalanceHandler(data);
            } else {
              console.log(coinName + " wallet ballance handler not set.")
            }
          }
        });
      },

      getWalletTransactions: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;
        let self = this;
        $.ajax({
          url: "https://api.blockcypher.com/v1/ltc/main/addrs/" + walletAddress + "?limit=" + MAX_TRANSACTIONS,
          type: "GET",
          datatype: "json",
          success: function(data) {
            // console.log("txn data: " + JSON.stringify(data));
            for (let i = 0; i < data.txrefs.length; i++) {
              coinMetrics.addMetric(coinName, "walletTransactions", self.photonToLTC(data.txrefs[data.txrefs.length - i - 1].value)); //save everyhthing and send a notification to the UI to refresh
            }
            $rootScope.$broadcast(coinName + 'WalletTransactions', {});
          }
        });
      }
    };
  }]);
})(window.angular, app)
