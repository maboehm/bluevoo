angular.module('bluevoo.controllers')

.controller('MapCtrl', function(uiGmapGoogleMapApi, $scope, LocationSvc, TagSvc, $state) {
  angular.extend($scope.map, {
    zoom: 14
  });
  console.log($scope.map);
  $scope.nearbyUsers = [];

  $scope.test = function test() {
    console.log($scope.map.center);
    LocationSvc.getNearbyCheckins().then(function(checkins) {
      console.log(checkins);
      $scope.nearbyUsers = checkins;
    });
  };
  uiGmapGoogleMapApi.then(function(maps) {
    console.log(maps);
  });

  $scope.doClick = function() {
    $state.go('app.nearme');
  };
});
