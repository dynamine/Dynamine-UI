(function(angular, app){
  app.factory('coinMetrics', [function() {
    let MAX_METRICS = 20;

    let metrics = {
      bitcoin: {
        walletTransactions: [],
        walletBalance: 0,
        hashRate: []
      },
      litecoin: {
        walletTransactions: [],
        walletBalance: 0,
        hashRate: []
      },
      monero: {
        walletTransactions: [],
        walletBalance: 0,
        hashRate: []
      },
      zcash: {
        walletTransactions: [],
        walletBalance: 0,
        hashRate: []
      }
    }

    return {
      setSingleMetric: function(coin, metricName, metricValue) {
        if(angular.isDefined(metrics[coin][metricName])){
          metrics[coin][metricName] = metricValue;
        }
      },
      addMetric: function(coin, metricName, metricValue) {
        if(angular.isDefined(metrics[coin]) && angular.isDefined(metrics[coin][metricName])) {
          metrics[coin][metricName].push(metricValue);

          if(metrics[coin][metricName].length > MAX_METRICS) {
            metrics[coin][metricName].shift();
          }
        }
      },
      getMetricsByName: function(coin, metricName) {
        return metrics[coin][metricName];
      },
      clearMetricsByName: function(coin, metricName) {
        metrics[coin][metricName] = [];
      },
      getMetrics: function() {
        return Object.assign({}, metrics); //returning a copy of the data to prevent other things from unintentionally screwing up the graphs
      }
    }
  }]);
})(window.angular, app)
