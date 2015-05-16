angular.module('OneDayTrip.controllers', []).
  controller('tripsController', function($scope, oneDayTripService) {

    oneDayTripService.getTrips().success(function(resp) {
        //$scope = response.????
    })

    $scope.tripList =
    [
     {
       id:"1",
       name:"Fantastic place for boys",
       points:
        [{
        id:"1",
        type:"hist",
        coordinate:{lon:"114.24270629882812",lat:"22.741989621606027"},
        comments:"this place is awesome!"
        },
        {
        id:"2",
        type:"hist",
        coordinate:{lon:"114.28321838378906",lat:"22.730907082662497"},
        comments:"this place is not so good!"
        },
        {
        id:"3",
        type:"hist",
        coordinate:{lon:"114.3460464477539",lat:"22.689181188747252"},
        comments:"hate it!!!!"
        }
        ]
     },
     {
       id:"2",name:"For lesbians",
       points:
        [{
        id:"1",
        type:"hist",
        coordinate:{lon:"114.35729026794434",lat:"22.654017060763145"},
        comments:"this place is awesome!"
        },
        {
        id:"2",
        type:"hist",
        coordinate:{lon:"114.4717025756836",lat:"22.5737552844127"},
        comments:"this place is not so good!"
        },
        {
        id:"3",
        type:"hist",
        coordinate:{lon:"114.51152801513672",lat:"22.44879309308878"},
        comments:"hate it!!!!"
        }
        ]
     }
    ];
  }
)