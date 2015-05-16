angular.module('OneDayTrip.controllers', []).
  controller('tripsController', function($scope) {
    $scope.tripList = [
      {name: "trip1"},
      {name: "trip2"}
    ];
    $scope.nameapp="hello"
  }
)
