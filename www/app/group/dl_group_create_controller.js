(function () {
  "use strict";

  angular
    .module("dlGroup")
    .controller("dlGroupCreateController", dlGroupCreateController);

  function dlGroupCreateController($scope, $rootScope, dlGroupService) {
    var vm = this;
    vm.addGroup = addGroup;

    function addGroup() {
      dlGroupService.addGroup(vm.groupName).then(cancel);
    }
    function cancel() {
      $scope.appNavigator.popPage();
    }
  }
})();
