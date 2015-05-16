angular.module('OneDayTrip.services', []).
  factory('oneDayTripService', function($http) {

    var tripApi = {};

    tripApi.getTrips = function() {
      return $http({
        method: 'GET',
        url: 'url'
      });
    }

    return tripApi;
  });