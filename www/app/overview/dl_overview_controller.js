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
    vm.deleteItem = deleteItem;

    activate();

    function deleteItem(doc) {
      ons.notification.confirm({
        message: 'Are you sure?',
        callback: function (answer) {
          if (answer) {
            dlWizardService.deleteItem(doc);
          }
        }
      });
    }

    function onCalculateButton() {
      $scope.appNavigator.pushPage('app/result/dl_result.html');
    }

    function onAddMember() {
      $scope.appNavigator.pushPage('app/member/dl_member.html');
    }

    function onAddNew() {
      $scope.appNavigator.pushPage('app/wizard/outgo/dl_outgo.html');
    }
    function fetchItems() {
      dlWizardService.getItems().then(function (items) {
        vm.items = items;
      })
    }
    function activate() {
      fetchItems();
      dlWizardService.getSelectedGroup().then(function (selectedGroup) {
        vm.selectedGroup = selectedGroup.name;
      });
      var changes = dldb
          .changes({
            since: 'now',
            live: true,
            filter: function (doc) {
              return doc._id.startsWith("item-");
            }
          })
          .on('change', fetchItems);

      $scope.$on("$destroy", function () {
        changes.cancel();
      });
    }
  });

})();
