(function(angular, app) {
    app.factory('callmoneroWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        

        var balance;
        var maxtransactions;
        var transactions = [];


        return {
        callconfig: function (dynamineConfig) {
                var walletAddress = dynamineConfig.getInfoForCoin("monero").walletAPIHost;
                return walletAddress;
        },    

        callwalletbal: function(walletAddress) {
                //Get wallet address full endpoint and parse
                // $.ajax({
                //         url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress+ "/full",
                //         type: "GET",
                //         async: false,
                //         datatype: "json",
                //         success: function(data) {
                //             balance = data["balance"];
                //         }
                // });
                balance = "1883000045"
  
                return balance;
        },

        callwalletnumtrans: function(walletAddress) {
                //Get wallet address full endpoint and parse
                // $.ajax({
                //         url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress+ "/full",
                //         type: "GET",
                //         async: false,
                //         datatype: "json",
                //         success: function(data) {
                //             maxtransactions = data["n_tx"];
                //         }
                // });
                maxtransactions = "400689"

  
                return maxtransactions;
        },

        callwallettrans: function(walletAddress) {
                //Get wallet address full endpoint and parse
                transactions = [ 64584, 78655, 98979, 7775, 7655, 9887, 7422, 8483, 9580, 9676, 8755, 7755, 8657, 6589, 8893, 9657, 8896, 7742, 7466, 7332, 7433, 8543, 9053, 8743];
                // $.ajax({
                //         url: "https://api.blockcypher.com/v1/btc/main/addrs/" + walletAddress,
                //         type: "GET",
                //         async: false,
                //         datatype: "json",
                //         success: function(data) {
                //         var i;
                //         for (i = 0; i < 24; i++ ) { //TODO: Number is 24 for hours of payments
                            
                //                 transactions.push(data.txrefs[i].value);
                //         }
                //         console.log("Here are the sampled transactions: ");
                //         console.log(transactions);

                //         }
                // });

  
                return transactions;
        }


      
    };
  }]);
})(window.angular, app)
