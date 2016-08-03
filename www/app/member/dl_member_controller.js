(function () {
  "use strict";

  angular
    .module("dlMember", [
      "dlMemberService",
      "dlPromiseHelper",
      "dlWizardService",
      "dldb"
    ])
    .controller("dlMemberController", dlMemberController);

  function dlMemberController($scope, dlMemberService, dlPromiseHelper, dlWizardService, dldb) {
    var vm = this;
    vm.addMember = addMember;

    var vm = this;
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var filter = ["displayName", "name"];

    navigator.contacts.find(filter, onSuccess, onError, options);

    activate();

    function activate() {
      fetchMembers();
      dlWizardService.getSelectedGroup().then(function (selectedGroup) {
        var changes = dldb
            .changes({
              since: 'now',
              live: true,
              filter: function (doc) {
                return doc._id.startsWith("member-" + selectedGroup.name);
              }
            }).on('change', fetchMembers);
      });
    }

    function fetchMembers() {
      dlPromiseHelper(vm, dlMemberService.getMembers())
        .applyToScope(function (members) {
          vm.members = members;
        });
    }

    function onSuccess(contacts) {
      $scope.$apply(function () {
        vm.contacts = contacts;
      });
    }

    function onError(contactError) {

    }

    function addMember(name) {
      dlMemberService.addMember(name);
      vm.memberName = "";
    }
    function cancel() {
      $scope.appNavigator.popPage();
    }
  }
})();
