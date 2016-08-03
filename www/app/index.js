(function () {
  "use strict";

  angular.module('dole', [
    "dlMember",
    "dlParts",
    "dlDetails",
    "dlOutgo",
    "dlMenu",
    "dlGroup",
    "dlGroupService",
    "dlOverview",
    "dlResult"
  ]);

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    angular
      .module('dole')
      .run(run);

    angular.bootstrap(document.getElementsByTagName("html"), ["dole"]);

    function run($rootScope, dlGroupService, dlldb, $http) {
      document.addEventListener("online", online, false);
      online();
      function online() {
        $http.get('http://query.yahooapis.com/v1/public/yql?format=json&q=select * from yahoo.finance.xchange where pair in ("USDEUR",  "USDBYN",  "USDRUB", "EURUSD", "EURBYN", "EURRUB", "BYNUSD", "BYNEUR", "BYNRUB", "RUBUSD", "RUBEUR", "RUBBYN")&env=store://datatables.org/alltableswithkeys').then(function (rates) {
          return dlldb.get("rates").then(function (resp) {
            console.log(rates)
            resp.rates = rates.data;
            return dlldb.put(resp);
          }, function (resp) {
            if (resp.status == 404) {
              return dlldb.put({
                _id: "rates",
                rates: rates.data
              });
            }
          });
        });
      }

    }
  }

})();
