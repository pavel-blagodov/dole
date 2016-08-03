(function () {
  "use strict";

  angular.module('dlDetails', [
    "onsen.directives",
    "onsen",
    "dlWizardService"
  ]).controller("dlDetailsController", dlDetailsController);

  function dlDetailsController($scope, dlWizardService) {
    var vm = this;
    vm.details = {};
    vm.onSubmit = onSubmit;
    vm.takePicture = takePicture;

    function onSubmit() {
      dlWizardService.setToWizard("details", vm.details).then(function () {
        $scope.appNavigator.resetToPage('app/overview/dl_overview.html');
        return dlWizardService.done();
      });
    }
    function takePicture() {
      navigator.camera.getPicture(takePictureSuccess, takePictureError, {allowEdit: true});
    }
    function takePictureSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = imageData;
      vm.details.imgSrc = imageData;
    }
    function takePictureError() {}
  }

})();
