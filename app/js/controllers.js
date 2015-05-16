angular.module('OneDayTrip.controllers', [])
.controller('tripsController', function($scope, oneDayTripHttpApi,oneDayTripFakeData) {

//    oneDayTripHttpApi.getTrips().success(function(resp) {
//        //$scope = response.????
//    })
    $scope.tripList = oneDayTripFakeData.getFakePoints();
    
  }
)
.controller('paramsController',function($scope, oneDayTripData, 
                                                oneDayTripUtils,
                                                start_coord,
                                                oneDayTripContext,
                                                oneDayTripMapApi,
                                                oneDayTripFakeData){
    
    $scope.activities = oneDayTripData.getActivities();
    $scope.topics = oneDayTripData.getTopics();
     
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
    
    $scope.getTrips = function() {
        var activity = $scope.activity.key;
        var budgets = [$scope.budget_from || 0,$scope.budget_to || 0];
        
        var topics = [];
        angular.forEach($scope.selected_topics, function(val){
            topics.push(val.key);
        });

        var data = oneDayTripFakeData.getFakePoints();
        oneDayTripContext.setCurrentTrips(data);
        console.log(data)
        drawRoute(data)

        oneDayTripMapApi.getLocationNameByCoordinate(start_coord,function(result){
            var query = oneDayTripUtils.buildQueryString({
                activity:activity,
                startPointName:result,
                coordinates:[start_coord.lat,start_coord.lng].join(','),
                topics:topics.join(','),
                budget:budgets.join(',')
            });
        })

    }
})
.controller('mapController',function($scope, oneDayTripMapApi,start_coord){
    $scope.initMap = function(coord){
        oneDayTripMapApi.setCurrentCoordinates(start_coord);
    }
})