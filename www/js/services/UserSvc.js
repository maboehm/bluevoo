angular.module('bluevoo.services')

.service('UserSvc', function($http, $q, c) {
  var _this = this;

  _this.getUser = function getUser() {
    var deferred = $q.defer();

    $http.get(c.url + '91ce0de075c4d59029358707cab5e7c8')
    .then(function success(response) {
      deferred.resolve(response.data);
    }, function onError(err) {
      console.log(err);
      deferred.reject(err);
    });

    return deferred.promise;
  };
});
