angular.module('bluevoo').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.checkin', {
      url: '/checkin',
      views: {
        'menuContent': {
          templateUrl: 'templates/checkin.html',
          controller: 'CheckinCtrl'
        }
      }
    })
    .state('app.nearme', {
      url: '/nearme',
      views: {
        'menuContent': {
          templateUrl: 'templates/nearme.html',
          controller: 'NearmeCtrl'
        }
      }
    })
    .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
});
