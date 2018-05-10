(function(angular, app) {
    app.factory('callbcWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        
        var config = dynamineConfig;
        //var name = dynamineConfig.getConfig("bitcoin").clusterId;
        var walletdatastats;
        var name = "Gfuen";

        return {
        callconfig: function (dynamineConfig) {
                var walletAddress = dynamineConfig.getInfoForCoin("bitcoin").walletAPIHost;
                alert(walletAddress);
                return walletAddress;
        },    
                
        
        callwallet: function(walletAddress) {
               
                //Get wallet address full endpoint
                $.ajax({
                        url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress+ "/full",
                        type: "GET",
                        datatype: "json",
                        success: function(data) {
                            walletdatastats = data;
                            console.log(walletdatastats);
                        }
                });


                return walletdatastats;
        }

      
    };
  }]);
})(window.angular, app)
