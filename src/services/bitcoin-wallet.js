(function(angular, app) {
    app.factory('callbcWallet', ['dynamineConfig', 'ajax', function(dynamineConfig, ajax){
        console.log("Here is the config: ");
        console.log(dynamineConfig);
        var walletAddress;
        var config = dynamineConfig;
        return {
        callconfig: function () {
                $.ajax({
                        url: config.getInfoForCoin("bitcoin").walletAddress,
                        type: "GET",
                        success: function(data) {
                            walletAddress = data;
                        }
                });
                
                alert("Wallet: " + walletAddress);
        },    
                
        
        callwallet: function() {
                $.ajax({
                        url: "http://" + walletAddress + "",
                        type: "GET",
                        datatype: "json",
                        success: function(data) {
                            walletAddress = data;
                        }
                });

        }


};
    }]);
  })(window.angular, app)