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
.controller('paramsController',function($scope,oneDayTripService){
    
    $scope.activities=[
        {'key':'L','text':'Low'},
        {'key':'M','text':'Mid'},
        {'key':'H','text':'High'}
    ];
    
    $scope.topics=[
        {'key':1,'text':'History'},
        {'key':2,'text':'Shopping'}
    ];
     
    $scope.activity = $scope.activities[0];
    $scope.selected_topics = [$scope.topics[0]];
    $scope.budget_from = 0;
    $scope.budget_to = 500;
    
    $scope.setFreeBudget = function(checked){
        if(checked){
            $scope.budget_from = null;
            $scope.budget_to = null;
        }else{
            $scope.budget_from = 0;
            $scope.budget_to = 500;
        }
    }
    
    $scope.getTrips = function(){
        var activity = $scope.activity.key;
        var budgets = [$scope.budget_from || 0,$scope.budget_to || 0];
        
        var topics = [];
        angular.forEach($scope.selected_topics, function(val){
            topics.push( val.text);
        });
        
        var query= oneDayTripService.buildQueryString({
            activity:activity,
            topics:topics.join(','),
            budget:budgets.join(',')
        });
    }
})
