angular.module('bluevoo.controllers')

.controller('ProfileCtrl', function($scope, $stateParams, toastr, UserSvc, LocationSvc) {

  $scope.load = function() {
    $scope.id = $stateParams.id;
    UserSvc.getUser($scope.id).then(function(user) {
      $scope.user = user;
      $scope.user.businessTags = $scope.user.businessTags ? $scope.user.businessTags.join(' ') : 'No Business Tags';
      $scope.user.privateTags = $scope.user.privateTag ? $scope.user.privateTags.join(' ') : 'No Private Tags';
      $scope.user.telephone = $scope.user.telephone ? $scope.user.telephone : 'No phone number';

      console.log($scope.user);
      LocationSvc.getCheckinForUser(user._id).then(function(response) {
        $scope.checkin = response.data.rows[0];
        $scope.$broadcast('scroll.refreshComplete');
      });
    }, function() {
      toastr.error('Ooops, please try again');
       $scope.$broadcast('scroll.refreshComplete');
    });
  };
  $scope.$on('$ionicView.beforeEnter', $scope.load);
});
