(function(angular, app) {
  app.factory('litecoinWallet', ['dynamineConfig', 'coinMetrics', 'ajax', '$rootScope', function(dynamineConfig,  coinMetrics, ajax, $rootScope){
    let MAX_TRANSACTIONS  = 20;
    let coinName = 'litecoin';
    let walletApiAddress = 'https://api.blockcypher.com/v1/ltc/main/addrs/';

    return {
      photonToLTC: function(photons) {
        return (photons * 0.00000001).toFixed(8);
      },
      getWalletBalance: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;
        let self = this;

        $.ajax({
          url: walletApiAddress + walletAddress+ "/full",
          type: "GET",
          datatype: "json",
          success: function(data) {
            coinMetrics.setSingleMetric(coinName, 'walletBalance', self.photonToLTC(data.balance));
            $rootScope.$broadcast(coinName + 'WalletBalance', {});
          }
        });
      },

      getWalletTransactions: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;
        let self = this;
        $.ajax({
          url: walletApiAddress + walletAddress + "?limit=" + MAX_TRANSACTIONS,
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
