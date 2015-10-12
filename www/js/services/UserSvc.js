angular.module('bluevoo.services')

.service('UserSvc', function($http, c) {
  var _this = this;

  _this.getUser = function getUser() {
    console.log(c.url);
  };
});
