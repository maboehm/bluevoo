angular.module('bluevoo.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeSignup = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.signup = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doSignup = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeSignup();
    }, 1000);
  };
});
