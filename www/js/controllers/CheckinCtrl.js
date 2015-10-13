angular.module('bluevoo.controllers')

.controller('CheckinCtrl', function($scope, $ionicModal, $state, $ionicHistory, $ionicPopup, toastr, TagSvc, LocationSvc,UserSvc) {
  $scope.text = "Check in to location";
  $scope.checkin = {
    type: 'Customer'
  };
  var modalScope = $scope.$new(true);
  var availableTags = [];
  modalScope.tags = {};

  $scope.openLocations = function openLocations() {
    $scope.modal.show();
    modalScope.tagCategory = 'Location';
    modalScope.tagPlaceholder = 'Add a location';
    modalScope.tags.tags = $scope.checkin.location;
    availableTags = _.map(TagSvc.locations[$scope.checkin.type.toLowerCase()], function(location) {
      return location.value.name;
    });
  };

  $ionicModal.fromTemplateUrl('templates/autocomplete.html', {
    scope: modalScope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  modalScope.closeModal = function() {
    $scope.modal.hide();
    $scope.checkin.location = modalScope.tags.tags ?  modalScope.tags.tags[0].text : '';
  };

  modalScope.loadSuggestions = function loadSuggestions(query) {
    return _.filter(availableTags, function(tag) {
      return tag.toLowerCase().search(query.toLowerCase()) > -1;
    });
  };

  $scope.places = [
    "IBM Böblingen",
    "IBM Herrenberg",
    "IBM Ehningen",
    "Other"
  ];

  $scope.types = ['IBM', 'Hotel', 'Customer'];

  $scope.placeChanged = function() {
    console.log('hi');
    console.log($scope.checkin);
  };

  $scope.doCheckin = function() {
    LocationSvc.checkin($scope.checkin).then(function() {
      toastr.success('Checked in with success');
      $state.go('app.map');
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
    }, function() {
      toastr.error('Something went wrong');
    });
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    if (!$scope.userId) {
      var alertPopup = $ionicPopup.alert({
        title: 'You shouldn\'t be here',
        template: 'You need to have a profile to checkin.'
      });
      alertPopup.then(function(res) {
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $state.go('app.map.login');
      });
    }
    UserSvc.getOwnProfile();
  });

  modalScope.checkTag = function(tag) {
    /*modalScope.addNew = false;
    if (_filter(modalScope.availableTags, function(location) {
      return location === tag;
    }).length === 0) {
      modelScope.addNew = true;
    }*/

    return modalScope.tags.tags ? modalScope.tags.tags.length !== 1 : true;
  };
});
