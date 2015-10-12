angular.module('bluevoo.controllers')

.controller('MapCtrl', function(uiGmapGoogleMapApi, $scope, TagSvc) {
  angular.extend($scope.map, {
    zoom: 14
  });

  $scope.test = function test() {
    $scope.user = TagSvc.locations;
    console.log($scope.myPosition);
  };
});
