(function(angular, app) {
  app.factory('zcashWallet', ['dynamineConfig', 'coinMetrics', 'ajax', '$rootScope', function(dynamineConfig, coinMetrics, ajax, $rootScope){
    let MAX_TRANSACTIONS  = 20;
    let coinName = 'zcash';
    let walletApiAddress = 'https://api.zcha.in/v2/mainnet/accounts/';


    return {
      getWalletBalance: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;

        $.ajax({
          url: walletApiAddress + walletAddress,
          type: "GET",
          datatype: "json",
          success: function(data) {
            coinMetrics.setSingleMetric(coinName, 'walletBalance', data.balance); // no need to format balance as API returns value in ZEC
            $rootScope.$broadcast(coinName + 'WalletBalance', {});
          }
        });
      },

      getWalletTransactions: function() {
        let walletAddress = dynamineConfig.getInfoForCoin(coinName).walletAddress;

        $.ajax({
          url: walletApiAddress + walletAddress + "/recv?limit=" + MAX_TRANSACTIONS + "&offset=0",
          type: "GET",
          datatype: "json",
          success: function(data) {
            for(let i = 0 ; i < data.length; i++) {
              coinMetrics.addMetric(coinName, "walletTransactions", data[data.length - i - 1].value); // adding older metrics first so newer are always at the end of the metric array and stay there the longest
            }
            $rootScope.$broadcast(coinName + 'WalletTransactions', {});
          }
        });
      }
    };
  }]);
})(window.angular, app)
