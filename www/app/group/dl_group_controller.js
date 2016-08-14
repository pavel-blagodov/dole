(function () {
  "use strict";

  angular
    .module("dlGroup", [
      "dlGroupService",
      "dlPromiseHelper",
      "dlWizardService"
    ])
    .controller("dlGroupController", dlGroupController);

  function dlGroupController($scope, dldb, dlWizardService, dlGroupService, dlPromiseHelper) {
    var vm = this;
    vm.createGroup = createGroup;
    vm.selectGroup = selectGroup;
    vm.deleteGroup = deleteGroup;

    activate();

    function activate() {
      fetchGroups();

    }

    function fetchGroups() {
      dlPromiseHelper(vm, dlGroupService.getGroups())
        .applyToScope("groups");
    }

    function selectGroup(doc) {
      dlWizardService.setSelectedGroup(doc).then(function () {
        $scope.appNavigator.pushPage('app/overview/dl_overview.html', {closeMenu: true,  animation: 'slide'});
      });
    }

    function deleteGroup(doc) {
      ons.notification.confirm({
        message: 'Are you sure?',
        callback: function (answer) {
          if (answer) {
            dlGroupService.deleteGroup(doc);
          }
        }
      });
    }

    function createGroup() {
      $scope.appNavigator.pushPage('app/group/dl_group_create.html');
    }
  }
})();
