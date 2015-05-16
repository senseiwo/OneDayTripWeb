angular.module('OneDayTrip.controllers', [])
.controller('tripsController', function($scope, oneDayTripHook) {
    oneDayTripHook.register('data_arrived',function(data){
        $scope.tripList = data;
        return true;
    });
  }
)
.controller('paramsController',function($scope, oneDayTripData, 
                                                oneDayTripUtils,
                                                start_coord,
                                                oneDayTripHook,
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
        
        oneDayTripHook.call('data_arrived',oneDayTripFakeData.getFakePoints());
        
        oneDayTripMapApi.getLocationNameByCoordinate(start_coord,function(result){
            var query = oneDayTripUtils.buildQueryString({
                activity:activity,
                startPointName:result,
                coordinates:[start_coord.lat,start_coord.lng].join(','),
                topics:topics.join(','),
                budget:budgets.join(',')
            });
            
            var coords = [
              { lat: 47.6677292, lng: -122.37728820000001},
              { lat: 42.496403,  lng: -124.413128},
              { lat: 32.715738,  lng: -117.16108380000003}
            ];
            oneDayTripMapApi.drawPaths(coords);
        })

    }
})
.controller('mapController',function($scope,oneDayTripHook, oneDayTripMapApi,start_coord){
    oneDayTripHook.register('data_arrived',function(data){
        return true;
    });
    
    $scope.initMap = function(){
        oneDayTripMapApi.setCurrentCoordinates(start_coord);
    }
})