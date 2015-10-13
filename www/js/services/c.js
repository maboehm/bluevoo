angular.module('bluevoo.services')

.service('c', function($location) {
  var _this = this;

  _this.url = $location.host() === 'localhost' ?
    'api/' :
    'https://9b8ae9df-db6e-44dc-a427-4ef7f194ff97-bluemix.cloudant.com/bluevoo/';

    _this.url = 'https://9b8ae9df-db6e-44dc-a427-4ef7f194ff97-bluemix.cloudant.com/bluevoo/';
});
