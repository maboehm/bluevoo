angular.module('bluevoo.services')

.service('UserSvc', function($http, $q, $cookies, $rootScope, c) {
  var _this = this;

  var testData = {
    existingUser: {
      username: 'Hans Wurst',
      businessUnit: 'IBM Analytics',
      ibmLocation: 'Frankfurt',
      businessTags: ['bpm', 'mobile', 'bluemix'],
      privateTags: ['squash', 'segeln']
    },
    id: '91ce0de075c4d59029358707cab5e7c8'
  };

  _this.getUser = function getUser(id) {
    var deferred = $q.defer();

    $http.get(c.url + id)
      .then(function success(response) {
        if (id === $rootScope.userId) {
          $rootScope.user = response.data;
        }
        deferred.resolve(response.data);
      }, function onError(err) {
        console.log(err);
        deferred.reject(err);
      });

    return deferred.promise;
  };

  _this.getProfilePic = function(id) {
    var deferred = $q.defer();
    $http.get(c.url + '_design/design/_view/ImagePerUser?key=%22' + id + '%22').then(function(response) {
      if (response.data.rows.length > 0) {
        deferred.resolve(response.data.rows[0].value);
      } else {
        deferred.reject();
      }
    });
    return deferred.promise;
  };

  _this.getOwnProfile = function getOwnProfile() {
    return _this.getUser($rootScope.userId);
  };

  _this.updateUser = function updateUser(user) {
    var deferred = $q.defer();
    var template = {
      type: "user",
    };
    console.log(_.merge(user, template));
    user.businessUnit = angular.isString(user.businessUnit) ? user.businessUnit : user.businessUnit[0];
    user.ibmLocation = angular.isString(user.ibmLocation) ? user.ibmLocation : user.ibmLocation[0];

    $http.post(c.url, _.merge(user, template)).then(function(response) {
      $cookies.put('userId', response.data.id);
      deferred.resolve(_.merge(user, template, response.data));
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  };

  _this.createUser = function createUser(user) {
    return _this.updateUser(user);
  };
});
