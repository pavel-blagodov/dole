(function () {
  "use strict";

  angular
    .module("dlParts", [
      "onsen.directives",
      "onsen",
      "dlWizardService",
      "dlMemberService",
      "dlPromiseHelper",
      "dlSteps",
      "dlFilters"
    ])
    .controller("dlPartsController", dlPartsController);

  function dlPartsController($scope, dldb, dlWizardService, dlMemberService, dlPromiseHelper) {
    var vm = this;
    vm.onAddMember = onAddMember;
    vm.onNextButton = onNextButton;
    vm.addPart = addPart;
    vm.takeOffPart = takeOffPart;
    vm.debtorParts = {};
    vm.isPlusButtonDisabled = isPlusButtonDisabled;
    vm.maybeDisableInput = maybeDisableInput;
    vm.disableEnableMember = disableEnableMember;
    vm.calculateOnePart = calculateOnePart;
    var previousParts = {};

    activate();

    function calculateOnePart() {
      if (!vm.outgo) {
        return 0;
      }
       var selectedCount = 0;
      _.forEach(vm.debtorParts, function (user) {
        selectedCount += user.involved;
      });

      return vm.outgo.amount / selectedCount;
    }

    function activate() {
      fetchMembers();

      dlPromiseHelper(vm, dlWizardService.getFromWizard("outgo"))
	.applyToScope("outgo");

      dlWizardService.getSelectedGroup().then(function (selectedGroup) {
        var changes = dldb
            .changes({
              since: 'now',
              live: true,
              filter: function (doc) {
                return doc._id.startsWith("member-" + selectedGroup.name);
              }
            }).on('change', fetchMembers);

        $scope.$on("$destroy", function () {
          changes.cancel();
        });
      });
    }

    function fetchMembers() {
      dlPromiseHelper(vm, dlMemberService.getMembers())
        .applyToScope(function (debtors) {
          _.forEach(debtors, function (n) {
            vm.debtorParts[n.doc.name] = {
              dole: 1,
              involved: true
            };
          });
          vm.debtors = debtors;
        });
    }

    function isPlusButtonDisabled() {
      var available = 0;
      var used = 0;
      _.forEach(vm.debtorParts, function (user) {
        available += user.involved;
        used += user.dole;
      });
      console.log(available, used)
      return used >= available;
    }

    function disableEnableMember(name) {
      if (!vm.debtorParts[name].involved) {
        previousParts[name] = vm.debtorParts[name].dole;
        vm.debtorParts[name].dole = 0;
      } else {
        vm.debtorParts[name].dole = previousParts[name];
      }
    }

    function addPart(changedName) {
      previousParts = {};
      vm.debtorParts[changedName].dole = Number(vm.debtorParts[changedName].dole || 0) + 1;
    }

    function takeOffPart(changedName) {
      previousParts = {};
      vm.debtorParts[changedName].dole = Number(vm.debtorParts[changedName].dole || 0) - 1;
    }

    function maybeDisableInput(name) {
      if (!vm.debtorParts[name].involved) {
        return;
      }
      var available = 0;
      var used = 0;
      _.forEach(vm.debtorParts, function (user) {
        available += user.involved;
        used += user.dole;
      });

      return used === 1 && available === 1;
    }

    function onNextButton(doc) {
      var partsDesc = {
        onePartAmount: calculateOnePart(),
        byUser: vm.debtorParts
      };
      console.log(partsDesc)
      dlWizardService.setToWizard("parts", partsDesc).then(function () {
        $scope.appNavigator.pushPage('app/wizard/details/dl_details.html');
      });
    }

    function onAddMember() {
      $scope.appNavigator.pushPage('app/member/dl_member.html');
    }
  }
})();
