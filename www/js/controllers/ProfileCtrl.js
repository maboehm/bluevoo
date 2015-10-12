angular.module('bluevoo.controllers')

.controller('ProfileCtrl', function($scope) {
  $scope.existingUser = {
    name : 'Hans Wurst',
    businessUnit : 'IBM Analytics',
    ibmLocation : 'Frankfurt',
    businessTags : [ 'bpm','mobile','bluemix' ],
    privateTags : [ 'squash','segeln' ]
  };
  $scope.updateProfile = function updateProfile() {

  };
});
