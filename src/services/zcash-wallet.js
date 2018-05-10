(function(angular, app) {
    app.factory('callzcashWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        
        var config = dynamineConfig;
        //var name = dynamineConfig.getConfig("zcash").clusterId;
        var walletdatastats;
        var name = "Gfuen";

        return {
        callconfig: function (dynamineConfig) {
                var walletAddress = dynamineConfig.getInfoForCoin("zcash").walletAPIHost;
                alert(walletAddress);
                return walletAddress;
        },    
                
        
        calltrans: function(walletAddress) {
               
                //Get wallet address full endpoint
                $.ajax({
                        url: "https://api.zcha.in/v2/mainnet/accounts/" + walletAddress + "/recv?limit=15&offset=0",
                        type: "GET",
                        datatype: "json",
                        success: function(data) {
                            console.log(data);
                            walletdatastats = JSON.stringify(data);
                            console.log(walletdatastats);
                        }
                });


                return walletdatastats;
        },

        callwallet: function(walletAddress) {
               
            //Get wallet address full endpoint
            $.ajax({
                    url: "https://api.zcha.in/v2/mainnet/accounts/" + walletAddress,
                    type: "GET",
                    datatype: "json",
                    success: function(data) {
                        console.log(data);
                        walletdatastats = JSON.stringify(data);
                        console.log(walletdatastats);
                    }
            });


            return walletdatastats;
    }

      
    };
  }]);
})(window.angular, app)
