(function () {
  "use strict";

  angular
    .module("dlSteps", [
      "onsen.directives",
      "onsen"
    ])
    .directive("dlSteps", dlStepsDirective);

  function dlStepsDirective() {

    return {
      restrict: "AE",
      scope: {
        active: "=",
        complete: "="
      },
      templateUrl: "app/components/dl_steps/dl_steps.html",
      controller: controller
    };

    function controller() {
      
    }
  }
})();
