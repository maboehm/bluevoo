angular.module('bluevoo.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $state, UserSvc) {

  ////////////
  // signup //
  ////////////
  $scope.newUser = {};
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeSignup = function() {
    $scope.modal.hide();
    $state.go('app.map');
  };
  $scope.signup = function() {
    $scope.modal.show();
  };
  $scope.doSignup = function() {
    UserSvc.createUser($scope.newUser).then(function(data) {
      $scope.closeSignup();
      $rootScope.userId = data.id;
    });
  };

  $state.get('app.map.login').onEnter = function() {
    $scope.signup();
  };
});
