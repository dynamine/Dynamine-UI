(function(angular, app) {
    app.factory('callbcwallet', function(dynamineconfig){

        var walletAddress;

        callconfig: return function(dynamineconfig) {
                var config = dynamineconfig;
                ajax({
                        url: config.getInfoForCoin("bitcoin").walletAPIHost,
                        type: "GET",
                        success: function(data) {
                            walletAddress = data;
                        }
                });

                alert("Wallet: " + walletAddress);
        }    
                
        
        callwallet: return function() {
                ajax({
                        url: "http://" + walletAddress + "",
                        type: "GET",
                        datatype: "json",
                        success: function(data) {
                            walletAddress = data;
                        }
                });

        }

    });
  })(window.angular, app)