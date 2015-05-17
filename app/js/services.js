angular.module('OneDayTrip.services', []).
  factory('oneDayTripHttpApi', function($http) {

    var http = {};

    http.getTrips = function(query) {
      return $http.get('/trips?'+query)
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
  .factory('oneDayTripFakeData2',function(){
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
                                "attractionType": "CODING",
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
                                "attractionType": "EATING",
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
                                "attractionType": "RELAX",
                                "coordinate": {
                                    "xCoordinate": "113.955133",
                                    "yCoordinate": "22.533188"
                                }
                            },
                            {
                                "order": 2,
                                "name": "Walmart",
                                "imageURL": "http://upload.wikimedia.org/wikipedia/commons/1/1a/COCO_Park_Enterance.jpg",
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
  .factory('oneDayTripFakeData',function(){
                var data = {
                    getFakeTrips: function() {
                      var trips = {"trips":[{"id":1,"duration":"12h","totalCost":900,"attractions":[{"order":1,"name":"Xiao Ben Bake Restourant","imageURL":"http://i1.s2.dpfile.com/pc/12b25724dee7fbc23a992b9e5c08343b%28700x700%29/thumb.jpg","rating":3,"timing":1,"price":50,"attractionType":"RESTAURANT","coordinate":{"xCoordinate":"113.95203","yCoordinate":"22.531359"}},{"order":2,"name":"Costal city","imageURL":"http://img3.fengniao.com/album/upload/2/269/53735/10746969.jpg","rating":4,"timing":3,"price":600,"attractionType":"SHOPPING","coordinate":{"xCoordinate":"113.941446","yCoordinate":"22.523238"}},{"order":3,"name":"Li Xiang Park","imageURL":"http://www.hqcyw.cn/Uploads/2014050809483601.jpg","rating":5,"timing":1,"price":150,"attractionType":"PARK","coordinate":{"xCoordinate":"113.936094","yCoordinate":"22.541765"}},{"order":4,"name":"A She Dong Ting Restaurant","imageURL":"http://s3-media2.fl.yelpcdn.com/bphoto/vD_pIgdac01qaQqSTp92pg/348s.jpg","rating":3,"timing":1,"price":100,"attractionType":"RESTAURANT","coordinate":{"xCoordinate":"113.976205","yCoordinate":"22.549906"}}]},{"id":2,"duration":"4h","totalCost":1610,"attractions":[{"order":1,"name":"Window Of The World","imageURL":"http://www.alltrip.cn/UploadFile/CityImages_34556.jpg","rating":3,"timing":2,"price":200,"attractionType":"PARK","coordinate":{"xCoordinate":"113.979491","yCoordinate":"22.54078"}},{"order":2,"name":"Happy Valley","imageURL":"http://www.517dv.com/upload/custom/00/00/00/00/88/92.1.jpg","rating":3,"timing":2,"price":210,"attractionType":"PARK","coordinate":{"xCoordinate":"113.98675","yCoordinate":"22.546722"}},{"order":3,"name":"Happy Harbour","imageURL":"http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1204/21/c4/11326725_11326725_1334983441409_mthumb.jpg","rating":4,"timing":2,"price":500,"attractionType":"SHOPPING","coordinate":{"xCoordinate":"113.998133","yCoordinate":"22.529523"}},{"order":4,"name":"Coco park","imageURL":"http://www.shenzhentour.com/UserFiles/Image/3%2813%29.jpg","rating":3,"timing":4,"price":500,"attractionType":"SHOPPING","coordinate":{"xCoordinate":"114.060326","yCoordinate":"22.540385"}},{"order":5,"name":"Nan Tou Gu Cheng Museum","imageURL":"http://www.china.com.cn/ch-pic/guangdong/zm/070418_1350/135.jpg","rating":4,"timing":1,"price":200,"attractionType":"HISTORY","coordinate":{"xCoordinate":"113.927084","yCoordinate":"22.546596"}}]}]}
                        return trips
                    }
      }
      return data
  })