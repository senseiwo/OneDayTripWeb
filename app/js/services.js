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
  .factory('oneDayTripHook',function(){
      var hook = {
            hooks: [],
            register: function ( name, callback ) {
                if('undefined' === typeof( hook.hooks[name])){
                    hook.hooks[name] = [];
                }     
                hook.hooks[name].push( callback )
            },
            call: function ( name, args ) {
                if( 'undefined' !== typeof( hook.hooks[name] ) ){
                    for( i = 0; i < hook.hooks[name].length; ++i ){
                        if( true !== hook.hooks[name][i]( args ) ) 
                        { 
                           break; 
                        }
                    }
                }    
            }
        }
        return hook;
  })
  .factory('oneDayTripMapApi', function(){
      geocoder = new google.maps.Geocoder();
      
      var mapApi = {
          el:document.getElementById('trip-map'),
          zooming:8,
          directionService: new google.maps.DirectionsService(),
          directionRenderer: new google.maps.DirectionsRenderer( {'draggable':true} )
      };
      
      mapApi.getLocationNameByCoordinate = function(coords,callback){
          var latlng = new google.maps.LatLng(coords.lat, coords.lng);
          geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
             if (results[1]) {
                callback(results[1].formatted_address);
             }
          }
        });
      }
      
      mapApi.drawPaths = function(coords){
          mapApi.getLocationNameByCoordinate(coords[0], function(origin){
              mapApi.getLocationNameByCoordinate(coords[coords.length -1], function(destination){
                  var points = [];
                  for ( var i=1; i<coords.length-1; i++ ) 
                  {
                      points.push({
                          location:new google.maps.LatLng(coords[i].lat,coords[i].lng),
                          stopover:true
                      });
                  }
                  var request = {
                    origin: origin,
                    destination: destination,
                    waypoints: points,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING
                  };
                  mapApi.directionService.route(request, function(res, stat) {
                    if (stat === google.maps.DirectionsStatus.OK) {
                        mapApi.directionRenderer.setDirections(res); 
                    }
                  });
              })
          }) 
      }
      
      mapApi.setCurrentCoordinates = function(coord){
          mapApi.map = new google.maps.Map(mapApi.el, {
                center: coord,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: mapApi.zooming
          });
          mapApi.directionRenderer.setMap( mapApi.map);
      }
      
      return mapApi;
  })
  .factory('oneDayTripUtils',function(){
      var utils = {};
      
      utils.buildQueryString = function(data){
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
    
    utils.getCoordsFromAttr = function(attrs){
        var coords = [];
        angular.forEach(attrs, function(attr){
            coords.push({lat:attr.coordinate.yCoordinate,lng:attr.coordinate.xCoordinate});
        })
        return coords;
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
      var data = {
          getFakeTrips: function() {
            var trips = {
                "trips": [
                    {
                        "id": 1,
                        "duration": '12h',
                        "totalCost": 500,
                        "attractions": [
                            {
                                "order": 1,
                                "name": 'Epam',
                                "imageURL": null,
                                "rating": 0,
                                "timing": 0,
                                "price": null,
                                "attractionType": null,
                                "coordinate": {
                                    "xCoordinate": "113.955133",
                                    "yCoordinate": "22.533188"
                                }
                            },
                            {
                                "order": 2,
                                "name": "Coco park",
                                "imageURL": "http://startinchina.com/shenzhen/shopping/coco_park.html",
                                "rating": 3,
                                "timing": 4,
                                "price": 500,
                                "attractionType": "SHOPPING",
                                "coordinate": {
                                    "xCoordinate": "113.957307",
                                    "yCoordinate": "22.530676"
                                }
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "duration": '6h',
                        "totalCost": 200,
                        "attractions": [
                            {
                                "order": 1,
                                "name": 'Park',
                                "imageURL": null,
                                "rating": 0,
                                "timing": 0,
                                "price": null,
                                "attractionType": null,
                                "coordinate": {
                                    "xCoordinate": "113.955133",
                                    "yCoordinate": "22.533188"
                                }
                            },
                            {
                                "order": 2,
                                "name": "Coco park",
                                "imageURL": "http://startinchina.com/shenzhen/shopping/coco_park.html",
                                "rating": 3,
                                "timing": 4,
                                "price": 500,
                                "attractionType": "SHOPPING",
                                "coordinate": {
                                    "xCoordinate": "113.957307",
                                    "yCoordinate": "22.530676"
                                }
                            }
                        ]
                    }
                ]
            };
            
            return trips;
        }
    }
    return data;
  })