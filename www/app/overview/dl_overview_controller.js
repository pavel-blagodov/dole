(function () {
  "use strict";

  angular.module('dlOverview', [
    "onsen.directives",
    "dldb",
    "onsen",
    "dlWizardService"
  ]).controller("dlOverviewController", function ($scope, dldb, dlWizardService) {
    var vm = this;

    vm.onAddNew = onAddNew;
    vm.onAddMember = onAddMember;
    vm.onCalculateButton = onCalculateButton;

    activate();

    function onCalculateButton() {
      $scope.appNavigator.pushPage('app/result/dl_result.html');
    }

    function onAddMember() {
      $scope.appNavigator.pushPage('app/member/dl_member.html');
    }

    function onAddNew() {
      $scope.appNavigator.pushPage('app/wizard/outgo/dl_outgo.html');
    }
    function activate() {
      dlWizardService.getItems().then(function (items) {
        vm.items = items;
      })
      dlWizardService.getSelectedGroup().then(function (selectedGroup) {
        vm.selectedGroup = selectedGroup.name;
      });
    }
  });

})();
