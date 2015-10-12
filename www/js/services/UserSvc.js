angular.module('bluevoo.services')

.service('UserSvc', function($http, $q, c) {
  var _this = this;

  var testData = {
    existingUser: {
      name: 'Hans Wurst',
      businessUnit: 'IBM Analytics',
      ibmLocation: 'Frankfurt',
      businessTags: ['bpm', 'mobile', 'bluemix'],
      privateTags: ['squash', 'segeln']
    },
    id: '91ce0de075c4d59029358707cab5e7c8'
  };

  _this.getUser = function getUser(id) {
    var deferred = $q.defer();

    $http.get(c.url + testData.id)
      .then(function success(response) {
        deferred.resolve(response.data);
      }, function onError(err) {
        console.log(err);
        deferred.reject(err);
      });

    return deferred.promise;
  };

  _this.getOwnProfile = function getOwnProfile() {
    var deferred = $q.defer();

    deferred.resolve(testData.existingUser);

    return deferred.promise;
  };
});
