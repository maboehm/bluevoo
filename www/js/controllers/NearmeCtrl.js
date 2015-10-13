angular.module('bluevoo.controllers')

.controller('NearmeCtrl', function($scope, LocationSvc, toastr) {

  $scope.load = function() {
    LocationSvc.getNearbyCheckins().then(function(nearme) {
      $scope.nearme = _.sortBy(nearme, function(pos) {
        return pos.value.distance;

      });

      $scope.$broadcast('scroll.refreshComplete');
    }, function() {
      toastr.error('Something went wrong');

      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.$on('$ionicView.beforeEnter', $scope.load);
});
