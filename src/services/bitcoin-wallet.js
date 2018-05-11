(function(angular, app) {
    app.factory('callbcWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        

        var balance;
        var maxtransactions;
        var transactions = [];


        return {
        callconfig: function (dynamineConfig) {
                var walletAddress = dynamineConfig.getInfoForCoin("bitcoin").walletAPIHost;
                return walletAddress;
        },    

        callwalletbal: function(walletAddress) {
                //Get wallet address full endpoint and parse
                $.ajax({
                        url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress+ "/full",
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
                        url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress+ "/full",
                        type: "GET",
                        async: false,
                        datatype: "json",
                        success: function(data) {
                            maxtransactions = data["n_tx"];
                        }
                });

  
                return maxtransactions;
        },

        callwallettrans: function(walletAddress) {
                //Get wallet address full endpoint and parse
                transactions = [];
                $.ajax({
                        url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress,
                        type: "GET",
                        async: false,
                        datatype: "json",
                        success: function(data) {
                        var i;
                        for (i = 0; i < 24; i++ ) { //TODO: Number is 24 for hours of payments
                            
                                transactions.push(data.txrefs[i].value);
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
