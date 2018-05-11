(function(angular, app){
  app.factory('coinMetrics', [function() {
    let MAX_METRICS = 30;

    let metrics = {
      bitcoin: {
        hashRate: [ 30, 40, 15, 80, 45, 90]
      },
      litecoin: {
        hashRate: []
      },
      monero: {
        hashRate: []
      },
      zcash: {
        hashRate: []
      }
    }

    return {
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
      getMetrics: function() {
        return Object.assign({}, metrics); //returning a copy of the data to prevent other things from unintentionally screwing up the graphs
      }
    }
  }]);
})(window.angular, app)
