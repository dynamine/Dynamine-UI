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
                                 balance = data.balance;
                             }
                    });
    
      
                    return balance;
            },
    
            callwalletnumtrans: function(walletAddress) {
                    //Get wallet address full endpoint and parse
                    $.ajax({
                             url: "https://api.zcha.in/v2/mainnet/accounts/" + walletAddress + "/recv?limit=5&offset=0",
                             type: "GET",
                             async: false,
                             datatype: "json",
                             success: function(data) {
                                 maxtransactions = Object.keys(data[0].vin).length;
                             }
                    });
      
                    return maxtransactions;
            },
    
            callwallettrans: function(walletAddress) {
                    //Get wallet address full endpoint and parse
                    transactions = [];
                    $.ajax({
                             url: "https://api.zcha.in/v2/mainnet/accounts/" + walletAddress + "/recv?limit=5&offset=0",
                             type: "GET",
                             async: false,
                             datatype: "json",
                             success: function(data) {
                            //Get number of transactions
                             var count = Object.keys(data[0].vin).length;
                            for (var i = 0; i < 24; i++) {
                                    transactions.push(JSON.stringify(data[0].vin[i].retrievedVout.value));
                            }
                             
    
    
                             }
                    });
    
      
                    return transactions;
            }
    
    
          
        };
      }]);
    })(window.angular, app)
    
    