angular.module('bluevoo.controllers')

.controller('CheckinCtrl', function($scope) {
  $scope.text = "Check in to location";
  $scope.checkin = {};

  $scope.places = [
    "IBM Böblingen",
    "IBM Herrenberg",
    "IBM Ehningen",
    "Other"
  ];

  $scope.types = ['IBM', 'Hotel', 'Kunde'];

  $scope.placeChanged = function() {
    console.log('hi');
    console.log($scope.checkin);
  };
});
