(function () {
  "use strict";

  angular.module('dlResult', [
    "onsen.directives",
    "onsen",
    "dlResultService"
  ]).controller("dlResultController", dlResultController);

  function dlResultController($scope, dlResultService) {
    var vm = this;

    activate();

    function activate() {
      vm.resultCurrency = "USD";
      dlResultService.calculate("USD").then(function (result) {
        vm.result = result;
      });
    }

  };

})();
