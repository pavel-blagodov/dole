(function () {
  "use strict";

  angular
    .module("dlldb", ["pouchdb"])
    .factory("dlldb", dlLocalDatabaseFactory);

  function dlLocalDatabaseFactory(pouchDB) {
    return pouchDB('doleLocal');
  }
})();
