angular.module('bluevoo.controllers')

.controller('ProfileCtrl', function($scope, $ionicModal, UserSvc) {
  $scope.getOwnProfile = function getOwnProfile() {
    UserSvc.getOwnProfile().then(function(user) {
      $scope.existingUser = user;
      console.log('Nutzer geladen');
    });
  };

  $scope.updateProfile = function updateProfile() {

  };

  $scope.openBusinessTags = function openBusinessTags() {
      $scope.modal.show();
      $scope.tagCategory = 'Business Tags';
  };
  $scope.openPrivateTags = function openPrivateTags() {
      $scope.modal.show();
      $scope.tagCategory = 'Private Tags';
  };

  $ionicModal.fromTemplateUrl('templates/autocomplete.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeModal = function() {
    $scope.modal.hide();
    console.log($scope.existingUser.businessTags);
    //$scope.existingUser.businessTags = angular.copy($scope.tags);
  };

  $scope.loadBusinessTags = function loadBusinessTags(query) {
    arr = ['bpm', 'mobile', 'bluemix'];

    return _.filter(arr, function(tag) {
      return tag.search(query) > -1;
    });
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.getOwnProfile();
  });
});
