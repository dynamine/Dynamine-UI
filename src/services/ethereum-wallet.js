(function(angular, app) {
    app.factory('callethWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        var walletAddress = dynamineConfig.getInfoForCoin("ethereum").walletAPIHost;
        var config = dynamineConfig;
        var name = dynamineConfig.getConfig("ethereum").clusterId;
        var walletdatastats;

        return {
        callconfig: function () {
                alert(walletAddress);
                return walletAddress;
        },    
                
        
        callwallet: function() {
                //Create wallet endpoint
                var data = {"name": name,"addresses": [walletAddress]};
                $.post('https://api.blockcypher.com/v1/btc/main/wallets?token=00e1ae99f8c44f6086b800db0e609469', JSON.stringify(data))
                  .then(function(d) {console.log(d)});
                

                //Get wallet address endpoint
                $.ajax({
                        url: "https://api.blockcypher.com/v1/btc/main/wallets/NAME/addresses?token=00e1ae99f8c44f6086b800db0e609469&address=" + walletAddress,
                        type: "GET",
                        datatype: "json",
                        success: function(data) {
                            walletdatastats = JSON.parse(data);
                        }
                });


                return walletdatastats;
        }


};
    }]);
  })(window.angular, app)