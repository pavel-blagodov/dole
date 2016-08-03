(function () {
  "use strict";

  angular
    .module("dlMemberService", [
      "dldb",
      "dlWizardService"
    ])
    .factory("dlMemberService", dlMemberFactory);

  function dlMemberFactory(dldb, dlWizardService) {
    var dlMemberService = {
      addMember: addMember,
      deleteMember: deleteMember,
      getMembers: getMembers
    };

    return dlMemberService;

    function addMember(memberName) {
      if (!memberName) {
        return $q.eject("Name should be specified.");
      }
      return put(memberName);
    }

    function deleteMember(doc) {
      doc._deleted = true;
      dldb.put(doc);
    }

    function getMembers(groupName) {
      return dlWizardService.getSelectedGroup().then(function (selectedGroup) {
        return dldb.allDocs({
          startkey: "member-" + selectedGroup.name,
          endkey: "member-" + selectedGroup.name + "\uffff",
          include_docs: true
        }).then(function (resp) {
          return resp.rows;
        });
      });
    }

    function put(memberName) {
      return dlWizardService.getSelectedGroup().then(function (selectedGroup) {
        var member = {};
        member._id = ([
          "member-",
          selectedGroup.name,
          "_",
          memberName,
          "-",
          (new Date()).getTime().toString()
        ]).join("");
        member.name = memberName;
        member.group = selectedGroup.name;
        return dldb.put(member);
      });
    }
  }
})();
