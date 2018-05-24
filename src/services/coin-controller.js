(function (angular, app) {
  app.factory('coinController', [ 'dynamineConfig', 'daemon', 'coinMetrics', function (dynamineConfig, daemon, coinMetrics) {


    return {
      createChart: function (container, data) {
          if (typeof data.options === 'undefined') data.options = {responsive: true, scales: {xAxes: [{ticks: {beginAtZero: true}}]}};

          return new Chart (angular.element(container)[0].getContext('2d'), data);
      },
      resources: dynamineConfig.getResources(),
      allocateResource: function(coinName, resource, $scope) {
        if( document.getElementById(resource.name).checked) {
          if(resource.coin && resource.coin != coinName) {
            daemon.stopCoin(resource.name);
            coinMetrics.clearMetricsByName(resource.coin, "hashRate"); //empty metrics for old coin
            $scope.refreshHashRate();
          }
          dynamineConfig.allocateResource(true, resource.name, coinName);
          daemon.startCoin(resource.name, dynamineConfig.getInfoForCoin(coinName).algorithm,  dynamineConfig.getInfoForCoin(coinName).walletAddress, dynamineConfig.getInfoForCoin(coinName).poolServer, dynamineConfig.getInfoForCoin(coinName).poolPassword);
          $scope.resources = dynamineConfig.getResources();
        } else {
          dynamineConfig.allocateResource(false, resource.name, "");
          daemon.stopCoin(resource.name);
          coinMetrics.clearMetricsByName(coinName, "hashRate"); //clear our metrics, update graph
          $scope.refreshHashRate();
          $scope.resources = dynamineConfig.getResources();
        }
      },
      coinHasAllocatedResources: function(coinName) {
        let resources = dynamineConfig.getResources();
        for(let i = 0; i < resources.length; i++) {
          if(resources[i].coin == coinName) {
            return true;
          }
        }
        return false;
      },
      getDaemonHost: function() {
        return dynamineConfig.getConfig().daemonHost;
      },
      resourceChecked: function(coinName, resource) {
        return (resource.allocated && resource.coin == coinName);
      },
      getPoolHost: function(coinName) {
        return dynamineConfig.getInfoForCoin(coinName).poolServer;
      },
      getWalletAddress: function(coinName) {
        return dynamineConfig.getInfoForCoin(coinName).walletAddress;
      }
    }
  }]);
})(window.angular, app);
