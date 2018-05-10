(function(angular, app) {
    app.factory('callliteWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        
        var config = dynamineConfig;
        //var name = dynamineConfig.getConfig("litecoin").clusterId;
        var walletdatastats;
        var name = "Gfuen";
        var balance;
        var maxtransactions;
        var transactions = [];


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
                            balance = data.balance;
                            maxtransactions = data.n_tx;
                            var i;
                            for (i = 0; i < maxtransactions; i++ ) {
                                transactions.push(data.txs[i]);
                            }
                            transactions.push(balance);
                            transactions.push(maxtransactions);
                            console.log(data);
                            console.log(walletdatastats);
                            console.log(balance);
                            walletdatastats = {bal:balance, max:maxtransactions, trans:transactions};
                        }
                });

                console.log(transactions);
                return transactions;
        }

      
    };
  }]);
})(window.angular, app)
