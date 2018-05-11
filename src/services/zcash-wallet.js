(function(angular, app) {
    app.factory('callzcashWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        

        var balance;
        var maxtransactions;
        var transactions = [];


        return {
        callconfig: function (dynamineConfig) {
                var walletAddress = dynamineConfig.getInfoForCoin("zcash").walletAPIHost;
                return walletAddress;
        },    

        callwalletbal: function(walletAddress) {
                //Get wallet address full endpoint and parse
                $.ajax({
                        url: "https://api.zcha.in/v2/mainnet/accounts/" + walletAddress,
                        type: "GET",
                        async: false,
                        datatype: "json",
                        success: function(data) {
                            balance = data["balance"];
                        }
                });

  
                return balance;
        },

        callwalletnumtrans: function(walletAddress) {
                //Get wallet address full endpoint and parse
                $.ajax({
                        url: "https://api.zcha.in/v2/mainnet/accounts/" + walletAddress,
                        type: "GET",
                        async: false,
                        datatype: "json",
                        success: function(data) {
                            maxtransactions = Object.keys(data).length;
                        }
                });

  
                return maxtransactions;
        },

        callwallettrans: function(walletAddress) {
                //Get wallet address full endpoint and parse
                transactions = [];
                $.ajax({
                        url: "https://api.zcha.in/v2/mainnet/accounts/" + walletAddress + "/recv?limit=24&offset=0",
                        type: "GET",
                        async: false,
                        datatype: "json",
                        success: function(data) {
                        var i;
                        for (i = 0; i < 24; i++ ) { //TODO: Number is 24 for hours of payments
                            
                                transactions.push(data[i].vin.retrievedVout.value);
                                console.log("Transaction Item Zcash: " + transactions[i]);
                        }
                        console.log("Here are the sampled transactions: ");
                        console.log(transactions);

                        }
                });

  
                return transactions;
        }


      
    };
  }]);
})(window.angular, app)

