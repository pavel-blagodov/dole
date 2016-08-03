(function () {
  "use strict";

  angular
    .module("dlMenu", ["dlGroupService"])
    .controller("dlMenuController", dlMenuController);

  function dlMenuController($scope, dlGroupService) {
    var vm = this;
    vm.onGroupClick = onGroupClick;

    function onGroupClick() {
      $scope.menu.setMainPage('app/group/dl_group.html', {closeMenu: true});
    }
  }
})();
