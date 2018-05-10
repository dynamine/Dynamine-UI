(function(angular, app) {
    app.factory('callliteWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        
        var config = dynamineConfig;
        //var name = dynamineConfig.getConfig("litecoin").clusterId;
        var walletdatastats;
        var name = "Gfuen";

        return {
        callconfig: function (dynamineConfig) {
                var walletAddress = dynamineConfig.getInfoForCoin("litecoin").walletAPIHost;
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
                            walletdatastats = JSON.stringify(data);
                            console.log(walletdatastats);
                        }
                });


                return walletdatastats;
        }

      
    };
  }]);
})(window.angular, app)
