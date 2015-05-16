angular.module('OneDayTrip.controllers', [])
.controller('tripsController', function($scope) {
    $scope.tripList = [
      {name: "trip1", text: "bla bla bla"},
      {name: "trip2", text: "bla bla bla"}
    ];
  }
)
.controller('paramsController',function($scope){
    $scope.activities=[
        {'key':1,'text':'Low'},
        {'key':2,'text':'Mid'},
        {'key':3,'text':'High'}
    ];
})
