/**
 * https://9b8ae9df-db6e-44dc-a427-4ef7f194ff97-bluemix.cloudant.com/bluevoo/_design/design/_view/allLocations

6:36:56 PM: https://9b8ae9df-db6e-44dc-a427-4ef7f194ff97-bluemix.cloudant.com/bluevoo/_design/design/_view/allLocations?q=location:ibm
 */
angular.module('bluevoo.services')

.service('TagSvc', function($http, c) {
  var _this = this;
  var locationTypes = ['ibm', 'customer'];
  var tagTypes = [
    {
      name: 'businessUnits',
      url: 'allBusinessUnits'
    },
    {
      name: 'businessTags',
      url: 'allBusinessTags'
    },
    {
      name: 'privateTags',
      url: 'allPrivateTags'
    }
  ];

  _this.locations = {};

  function getAllLocations() {
    $http.get(c.url + '_design/design/_view/allLocations').then(function(response) {

      _.forEach(locationTypes, function(type) {
        _this.locations[type] = _.filter(response.data.rows, function(row) {
          return row.value.locationType === type;
        });
      });
      console.log(_this.locations);
    }, function(error) {
      console.log(error);
    });
  }

  function getAllLists(type) {
    _.forEach(tagTypes, function(tag) {

      $http.get(c.url + '_design/design/_view/'+tag.url+'?limit=50&reduce=true&group=true ').then(function(response) {
        _this[tag.name] = _.map(response.data.rows, function(row) {
          return row.key;
        });
      }, function(error) {
        console.log(error);
      });
    });
  }

  _this.businessTags = ['bpm', 'mobile', 'bluemix'];

  _this.init = function() {
    getAllLocations();
    getAllLists();
  };
});
