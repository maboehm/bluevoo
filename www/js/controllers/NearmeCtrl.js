angular.module('bluevoo.controllers')

.controller('NearmeCtrl', function($scope, LocationSvc, toastr,UserSvc) {

  $scope.load = function() {
    LocationSvc.getNearbyCheckins().then(function(nearme) {
      $scope.nearme = _.sortBy(nearme, function(pos) {
        console.log(pos.value.image);
        return pos.value.distance;
      });
      /*$scope.nearme = _.map($scope.nearme, function(near) {
        UserSvc.getProfilePic(near.value.user_id).then(function(image) {
          near.image = image;
        });
        return near;
      });*/
      console.log($scope.nearme);
      $scope.$broadcast('scroll.refreshComplete');
    }, function() {
      toastr.error('Something went wrong');

      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.$on('$ionicView.beforeEnter', $scope.load);
});
