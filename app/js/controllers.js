angular.module('OneDayTrip.controllers', []).
  controller('tripsController', function($scope) {
    $scope.tripList = [
      {name: "trip1", text: "bla bla bla"},
      {name: "trip2", text: "bla bla bla"}
    ];
  }
)
