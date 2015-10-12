angular.module('bluevoo')
  .run(function($ionicPlatform, $rootScope, $cookies, TagSvc, $geolocation) {
    $rootScope.map = {};
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
    TagSvc.init();
    $geolocation.getCurrentPosition({
      timeout: 60000,
      enableHighAccuracy: true
    }).then(function(position) {
      $rootScope.map.center = _.pick(position.coords, ['latitude', 'longitude']);
      $rootScope.myPosition = angular.copy($rootScope.map.center);
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
