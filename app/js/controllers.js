angular.module('OneDayTrip.controllers', [])
.controller('tripsController', function($scope, oneDayTripService) {

    oneDayTripService.getTrips().success(function(resp) {
        //$scope = response.???? 
    })
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
    
    $scope.topics=[
        {'key':1,'text':'History'},
        {'key':2,'text':'Shopping'}
    ];
})
