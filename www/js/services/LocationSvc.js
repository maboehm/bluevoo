angular.module('bluevoo.services')

.service('LocationSvc', function($http, $q, $rootScope, TagSvc, c) {
  var _this = this;

  function removeOldCheckin() {
    var deferred = $q.defer();

    $http.get(c.url + '_design/design/_view/allCheckinsPerUser?key="' + $rootScope.userId + '"').then(function(response) {
      console.log(response);
      if (response.data.rows.length === 0) {
        return deferred.resolve();
      }
      $http.delete(c.url + response.data.rows[0].id  + '?rev=' + response.data.rows[0].value._rev).then(function(response) {
        console.log(response);
        deferred.resolve();
      }, function() {
        deferred.reject();
      });
    }, function() {
      deferred.refect();
    });

    deferred.resolve(true);

    return deferred.promise;
  }

  _this.checkin = function(checkin) {
    var deferred = $q.defer();
    var location = _.filter(TagSvc.locations[checkin.type.toLowerCase()], function(location) {
      return location.value.name === checkin.location;
    })[0];
    var checkinObj = {
      type: "checkin",
      user_id: $rootScope.userId,
      username: $rootScope.user.username,
      location_id: location.id,
      locationname: checkin.location,
      timestamp: new Date().getTime()
    };
    console.log(checkinObj);
    removeOldCheckin().then(function() {
      $http.post(c.url, checkinObj).then(function(response) {
        deferred.resolve(response.data);
      }, function(error) {
        deferred.reject(error);
      });
    });

    return deferred.promise;
  };
});
