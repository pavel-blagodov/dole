(function () {
  "use strict";

  angular
    .module("dlResultService", [
      "dldb",
      "dlldb",
      "dlWizardService"
    ])
    .factory("dlResultService", dlResultFactory);

  function dlResultFactory(dldb, dlldb,  dlWizardService) {
    var dlResultService = {
      calculate: calculate
    };

    return dlResultService;

    function calculate(currency) {
      return dlldb.get("rates").then(function (rates) {

        return dlWizardService.getItems().then(function (rows) {

          var debtors = {};
          var creditors = {};
          console.log(rows)
          _.forEach(rows, function (row) {
            if (currency !== row.doc.outgo.currency) {
              var rate = _.find(rates.rates.query.results.rate, function (rate) {
                return rate.id === row.doc.outgo.currency + currency;
              });
              row.doc.parts.onePartAmount *= rate.Rate;
            }
            var onePartAmount = row.doc.parts.onePartAmount;
            _.forEach(row.doc.parts.byUser, function (desc, member) {
              debtors[member] = debtors[member] || 0;
              creditors[member] = creditors[member] || 0;
              if (desc.dole < 1 && desc.involved) {
                debtors[member] -= onePartAmount;
              }
              if (desc.dole >= 1) {
                if (desc.involved) {
                  var creditorPart = desc.dole - 1;
                } else {
                  var creditorPart = desc.dole;
                }

                creditors[member] += creditorPart * onePartAmount;
              }
            });
          });
          var result = {};
          _.forEach(creditors, function (part, member) {
            result[member] = creditors[member] + debtors[member];
          });
          console.log(debtors)
          console.log(creditors)
          return result;
        });

      });

    }
  }
})();
