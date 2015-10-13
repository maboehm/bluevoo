angular.module('bluevoo.controllers')

.controller('ProfileCtrl', function($scope, $stateParams, toastr, UserSvc, LocationSvc) {

  function load() {
    $scope.id = $stateParams.id;
    UserSvc.getUser($scope.id).then(function(user) {
      $scope.user = user;
      $scope.user.businessTags = $scope.user.businessTags.join(' ');
      $scope.user.privateTags = $scope.user.privateTags.join(' ');

      LocationSvc.getCheckinForUser(user._id).then(function(response) {
        $scope.checkin = response.data.rows[0];
      });
    }, function() {
      toastr.error('Ooops, please try again');
    });
  }
  $scope.$on('$ionicView.beforeEnter', load);
});
