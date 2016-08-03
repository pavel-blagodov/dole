(function () {
  "use strict";

  angular
    .module("dlFilters", [])
    .filter("obj", objectFilter)
    .filter("lodash", lodashFilter);

  function lodashFilter() {
    return function (value, method) {
      return _[method].apply(Object, [value]);
    }
  }

  function objectFilter() {
    return function (value, method) {
      return Object[method].apply(Object, [value]);
    }
  }
})();
