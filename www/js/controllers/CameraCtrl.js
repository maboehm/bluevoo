angular.module('bluevoo.controllers')

.controller('CameraCtrl', function($scope, $cordovaCamera, $ionicPlatform, toastr) {

  $ionicPlatform.ready(function() {

    if (!angular.isDefined(window.Camera)) {
      return;
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
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      toastr.error('Something went wrong');
    });

  }, false);
});
