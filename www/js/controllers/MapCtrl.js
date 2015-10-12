angular.module('bluevoo.controllers')

.controller('MapCtrl', function(uiGmapGoogleMapApi, $scope, TagSvc) {
  $scope.map = {
    center: {
      latitude: 48.6640875,
      longitude: 9.0346769
    },
    zoom: 8
  };

  $scope.test = function test() {
    $scope.user = TagSvc.locations;
  };
});
