angular.module('bluevoo.directives')

.directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function($scope, $element) {
      $scope.$on('show', function() {
        $timeout(function() {
          $element.find('input')[0].focus();
        }, 50);
      });
    }
  };
}]);
