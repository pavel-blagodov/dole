(function () {
  "use strict";

  angular
    .module("dlWizardService", [
      "dlldb",
      "dldb"
    ])
    .factory("dlWizardService", dlWizardFactory);

  function dlWizardFactory(dlldb, dldb, $q) {
    var dlWizardService = {
      setToWizard: setToWizard,
      createWizard: createWizard,
      getFromWizard: getFromWizard,
      setSelectedGroup: setSelectedGroup,
      getSelectedGroup: getSelectedGroup,
      done: done,
      getItems: getItems,
      deleteItem: deleteItem
    };

    return dlWizardService;

    function done() {
      dlldb.get("wizard").then(function (wizard) {
        var stamp = (new Date()).getTime();
        wizard._id = "item-" + wizard.group.name + "-" + stamp;
        delete wizard._rev;
        wizard.stamp = stamp;
        dldb.put(wizard);
      });
    }

    function setSelectedGroup(group) {
      return setToWizard("group", group).then(null, function () {
        return createWizard().then(function () {
          setToWizard("group", group);
        });
      });
    }

    function getSelectedGroup() {
      return getFromWizard("group");
    }

    function deleteItem (doc) {
      doc._deleted = true;
      dldb.put(doc);
    }

    function getItems() {
      return getSelectedGroup().then(function (selectedGroup) {
        return dldb.allDocs({
          startkey: "item-" + selectedGroup.name,
          endkey: "item-" + selectedGroup.name + "\uffff",
          include_docs: true
        }).then(function (resp) {
          return resp.rows;
        });
      });
    }

    function createWizard() {
      return dlldb.put({
        _id: "wizard"
      });
    }

    function getFromWizard(property) {
      return dlldb.get("wizard").then(function (wizard) {
        return wizard[property];
      });
    }

    function setToWizard(property, value) {
      return dlldb.get("wizard").then(function (wizard) {
        wizard[property] = value;
        return dlldb.put(wizard);
      });
    }
  }
})();
