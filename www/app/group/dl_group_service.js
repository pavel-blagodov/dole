(function () {
  "use strict";

  angular
    .module("dlGroupService", [
      "dldb",
      "dlldb"
    ])
    .factory("dlGroupService", dlGroupFactory);

  function dlGroupFactory(dldb, dlldb, $q) {
    var dlGroupService = {
      put: put,
      addGroup: addGroup,
      getGroups: getGroups,
      deleteGroup: deleteGroup
    };

    return dlGroupService;

    function deleteGroup(doc) {
      doc._deleted = true;
      dldb.put(doc);
    }

    function getGroups(includeDocs) {
      return dldb.allDocs({
        startkey: "group-",
        endkey: "group-\uffff",
        include_docs: includeDocs === undefined ? true : includeDocs
      }).then(function (resp) {
        return resp.rows;
      });
    }

    function addGroup(groupName) {
      if (!groupName) {
        return $q.eject("Name should be specified.");
      }
      return put(groupName);
    }

    function put(groupName) {
      var group = {};
      group._id = (["group-", groupName, "-", (new Date()).getTime().toString()]).join("");
      group.name = groupName;
      return dldb.put(group);
    }
  }
})();
