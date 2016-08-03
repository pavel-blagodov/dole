(function () {
  "use strict";

  angular
    .module("dldb", ["pouchdb"])
    .factory("dldb", dlDatabaseFactory);

  function dlDatabaseFactory(pouchDB) {
    return pouchDB('dole');
  }
})();
