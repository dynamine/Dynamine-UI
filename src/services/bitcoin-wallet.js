(function(angular, app) {
    app.factory('callbcWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        
        var config = dynamineConfig;
        //var name = dynamineConfig.getConfig("bitcoin").clusterId;
        var walletdatastats;
        var name = "Gfuen";
        var balance;
        var maxtransactions;
        var transactions = [];


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
                        async: false,
                        datatype: "json",
                        success: function(data) {
                            balance = data["balance"];
                            maxtransactions = data["n_tx"];
                            var i;
                        //     for (i = 0; i < maxtransactions; i++ ) {
                        //         transactions.push(data.txs[i]);
                        //     }
                            transactions.push(balance);
                            transactions.push(maxtransactions);
                            console.log(data);
                            console.log(balance);
            
                        }
                });

  
                return balance;
        },

        callwalletbal: function(walletAddress) {
                //Get wallet address full endpoint
                $.ajax({
                        url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress+ "/full",
                        type: "GET",
                        async: false,
                        datatype: "json",
                        success: function(data) {
                            balance = data["balance"];
                            maxtransactions = data["n_tx"];
                            var i;
                        //     for (i = 0; i < maxtransactions; i++ ) {
                        //         transactions.push(data.txs[i]);
                        //     }
                            transactions.push(balance);
                            transactions.push(maxtransactions);
                            console.log(data);
                            console.log(balance);

                        }
                });

  
                return maxtransactions;
        }

      
    };
  }]);
})(window.angular, app)
