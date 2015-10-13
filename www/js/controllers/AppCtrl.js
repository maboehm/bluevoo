angular.module('bluevoo.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $state, $ionicHistory, UserSvc, TagSvc) {

  /////////
  //Tags //
  /////////
  var modalScope = $scope.$new(true);
  var availableTags = [];
  modalScope.tags = {
    tags: []
  };

  $ionicModal.fromTemplateUrl('templates/autocomplete.html', {
    scope: modalScope
  }).then(function(modal) {
    $scope.tagModal = modal;
  });

  modalScope.closeModal = function() {
    $scope.tagModal.hide();
    var formatted = _.map(modalScope.tags.tags, function(tag) {
      return tag.text;
    });
    if (modalScope.tagCategory === 'Your Business Unit') {
      $scope.newUser.businessUnit = formatted;
    } else {
      $scope.newUser.ibmLocation = formatted;
    }
  };

  modalScope.loadSuggestions = function loadSuggestions(query) {
    console.log(availableTags);
    return _.filter(availableTags, function(tag) {
      return tag.toLowerCase().search(query.toLowerCase()) > -1;
    });
  };
  modalScope.checkTag = function($tag) {
    return modalScope.tags.tags ? modalScope.tags.tags.length !== 1 : true;
  };

  $scope.openLocationTags = function openLocationTags() {
    $scope.tagModal.show();
    modalScope.maxTags = 1;
    modalScope.tagCategory = 'Your Location';
    modalScope.tags.tags = $scope.newUser.ibmLocation;
    availableTags = _.flatten(_.map(TagSvc.locations.ibm, function(location) {
      return location.value.name;
    }));
    $scope.$broadcast('show');
  };
  $scope.openBUTags = function openBUTags() {
    $scope.tagModal.show();
    modalScope.maxTags = 1;
    modalScope.tagCategory = 'Your Business Unit';
    modalScope.tags.tags = $scope.newUser.businessUnit;
    availableTags = _.flatten(TagSvc.businessUnits);
    $scope.$broadcast('show');
  };

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
    $ionicHistory.nextViewOptions({
      historyRoot: true
    });
    $state.go('app.map');
  };
  $scope.signup = function() {
    $scope.modal.show();
  };
  $scope.doSignup = function() {
    UserSvc.createUser($scope.newUser).then(function(data) {
      $scope.closeSignup();
      $rootScope.userId = data.id;
      $rootScope.currentUser = data;
    });
  };

  $state.get('app.map.login').onEnter = function() {
    $scope.signup();
  };
});
