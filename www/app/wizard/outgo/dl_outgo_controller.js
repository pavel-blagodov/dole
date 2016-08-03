(function () {
  "use strict";

  angular.module('dlOutgo', [
    "onsen.directives",
    "onsen",
    "dlWizardService"
  ]).controller("dlOutgoController", dlOutgoController);

  function dlOutgoController($scope, dlWizardService) {
    var vm = this;
    vm.currency = ["USD", "EUR", "BYN", "RUB"];
    vm.outgo = {
      currency: vm.currency[0]
    };
    vm.onNextButton = onNextButton;

    function onNextButton() {
      dlWizardService.setToWizard("outgo", vm.outgo).then(function () {
        $scope.appNavigator.pushPage('app/wizard/parts/dl_parts.html');
      });
    }
  };

})();
