angular.module('bluevoo.controllers')

.controller('MapCtrl', function($scope, uiGmapGoogleMapApi) {
  $scope.map = {
    center: {
      latitude: 48.6640875,
      longitude: 9.0346769
    },
    zoom: 8
  };
  uiGmapGoogleMapApi.then(function(maps) {
    console.log(maps);
  });
});
