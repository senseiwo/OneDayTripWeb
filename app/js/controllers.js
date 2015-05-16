angular.module('OneDayTrip.controllers', [])
.controller('tripsController', function($scope, oneDayTripService,oneTripFakeData) {

    oneDayTripService.getTrips().success(function(resp) {
        //$scope = response.???? 
    })
    $scope.tripList = oneTripFakeData.getFakePoints();
    
  }
)
.controller('paramsController',function($scope,oneDayTripService, oneTripData){
    
    $scope.activities = oneTripData.getActivities();
    $scope.topics = oneTripData.getTopics();
     
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