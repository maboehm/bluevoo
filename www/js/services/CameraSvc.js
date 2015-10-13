angular.module('bluevoo.services')

.service('LocationSvc', function($cordovaCamera, $ionicPlatform, $q, toastr) {
  var _this = this;

  _this.takePicture = function() {
    var deferred = $q.defer();
    $ionicPlatform.ready(function() {

      if (!angular.isDefined(window.Camera)) {
        return deferred.reject();
      }

      var options = {
        quality: 90,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        deferred.resolve(imageData);
      }, function(err) {
        toastr.error('Something went wrong');
      });

    }, false);
  };
});
