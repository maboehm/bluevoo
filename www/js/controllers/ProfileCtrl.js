angular.module('bluevoo.controllers')

.controller('ProfileCtrl', function($scope, $ionicModal, $ionicPopup, $state, $ionicHistory, TagSvc, UserSvc) {
  var modalScope = $scope.$new(true);
  var availableTags = [];
  modalScope.tags = {};

  $scope.getOwnProfile = function getOwnProfile() {
    UserSvc.getOwnProfile().then(function(user) {
      $scope.existingUser = user;
    });
  };
  $scope.updateProfile = function updateProfile() {
    UserSvc.updateUser($scope.existingUser);
  };

  $scope.openBusinessTags = function openBusinessTags() {
    $scope.modal.show();
    modalScope.tagCategory = 'Business Tags';
    modalScope.tags.tags = $scope.existingUser.businessTags;
    availableTags = TagSvc.businessTags;
  };
  $scope.openPrivateTags = function openPrivateTags() {
    $scope.modal.show();
    modalScope.tagCategory = 'Private Tags';
    modalScope.tags.tags = $scope.existingUser.privateTags;
    availableTags = TagSvc.privateTags;
  };

  $ionicModal.fromTemplateUrl('templates/autocomplete.html', {
    scope: modalScope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  modalScope.closeModal = function() {
    $scope.modal.hide();
    var formatted = _.map(modalScope.tags.tags, function(tag) {
      return tag.text.toLowerCase();
    });
    if (modalScope.tagCategory === 'Business Tags') {
      $scope.existingUser.businessTags = formatted;
    } else {
      $scope.existingUser.privateTags = formatted;
    }
  };

  modalScope.loadSuggestions = function loadSuggestions(query) {
    return _.filter(availableTags, function(tag) {
      return tag.search(query.toLowerCase()) > -1;
    });
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    if (!$scope.userId) {
      var alertPopup = $ionicPopup.alert({
        title: 'You shouldn\'t be here',
        template: 'You need to have a profile to edit one.'
      });
      alertPopup.then(function(res) {
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $state.go('app.map.login');
      });
    }
    $scope.getOwnProfile();
  });
});
