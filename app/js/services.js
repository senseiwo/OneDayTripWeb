angular.module('OneDayTrip.services', []).
  factory('oneDayTripHttpApi', function($http) {

    var http = {};

    http.getTrips = function() {
      return $http({
        method: 'GET',
        url: 'url'
      });
    }
    
    return http;
  })
  .factory('oneDayTripMapApi', function(){
      var mapApi = {
          el:document.getElementById('trip-map'),
          zooming:8
      };
      
      mapApi.getLocationNameByCoordinate = function(coordinates){
          
      }
      
      mapApi.setCurrentCoordinates = function(coord){
          var map = new google.maps.Map(mapApi.el, {
                center: { lat: coord.lat, lng: coord.lng},
                zoom: mapApi.zooming
          });
      }
      
      return mapApi;
  })
  .factory('oneDayTripUtils',function(){
      var utils = {};
      
      utils.buildQueryString=function(data){
        if ( ! angular.isObject( data ) ) { 
            return( ( data === null ) ? "" : data.toString() ); 
        }
        var buffer = [];
        for ( var name in data ) 
        { 
            if ( ! data.hasOwnProperty( name ) ) { 
                continue; 
            }
            var value = data[ name ];

            buffer.push(
                encodeURIComponent( name ) + "=" + encodeURIComponent( ( value === null ) ? "" : value )
            ); 
        }
        return buffer.join( "&" ).replace( /%20/g, "+" );
    }
      
      return utils;
  })
  .factory('oneDayTripData',function(){
      var data={
          getActivities:function(){
              return [
                        {'key':'L','text':'Low'},
                        {'key':'M','text':'Mid'},
                        {'key':'H','text':'High'}
                    ];
          },
          getTopics:function(){
             return [
                        {'key':'HISTORY','text':'History'},
                        {'key':'SHOPPING','text':'Shopping'}
                    ];
          }
      }
      return data;
  })
  .factory('oneDayTripFakeData',function(){
      var data={
          getFakePoints: function() {
            var points = [
                {
                    id: "1",
                    name: "Fantastic place for boys",
                    points:
                            [{
                                    id: "1",
                                    type: "hist",
                                    coordinate: {lon: "114.24270629882812", lat: "22.741989621606027"},
                                    comments: "this place is awesome!"
                                },
                                {
                                    id: "2",
                                    type: "hist",
                                    coordinate: {lon: "114.28321838378906", lat: "22.730907082662497"},
                                    comments: "this place is not so good!"
                                },
                                {
                                    id: "3",
                                    type: "hist",
                                    coordinate: {lon: "114.3460464477539", lat: "22.689181188747252"},
                                    comments: "hate it!!!!"
                                }
                            ]
                },
                {
                    id: "2", name: "For lesbians",
                    points:
                            [{
                                    id: "1",
                                    type: "hist",
                                    coordinate: {lon: "114.35729026794434", lat: "22.654017060763145"},
                                    comments: "this place is awesome!"
                                },
                                {
                                    id: "2",
                                    type: "hist",
                                    coordinate: {lon: "114.4717025756836", lat: "22.5737552844127"},
                                    comments: "this place is not so good!"
                                },
                                {
                                    id: "3",
                                    type: "hist",
                                    coordinate: {lon: "114.51152801513672", lat: "22.44879309308878"},
                                    comments: "hate it!!!!"
                                }
                            ]
                }
            ];
            return points;
        }
    }
    return data;
  })