angular.module('bluevoo')
  .run(function($ionicPlatform, $rootScope, $cookies, TagSvc, $geolocation, UserSvc) {
    $rootScope.map = {
      center: {
        latitude: 50,
        longitude: 9
      }
    };
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    $rootScope.userId = $cookies.get('userId');
    UserSvc.getUser($rootScope.userId).then(function(user) {
      $rootScope.user = user;
    });
    TagSvc.init();
    $geolocation.getCurrentPosition({
      timeout: 60000,
      enableHighAccuracy: false
    }).then(function(position) {
      console.log(position);
      $rootScope.map.center.latitude = position.coords.latitude;
      $rootScope.map.center.longitude = position.coords.longitude;
      $rootScope.myPosition = angular.copy($rootScope.map.center);
    }, function(error) {
      console.log(error);
    });
  });

angular.module('bluevoo')
  .config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: true,
      maxOpened: 1,
      positionClass: 'toast-bottom-full-width',
      timeOut: 2500,
      closeButton: true
    });
  });
