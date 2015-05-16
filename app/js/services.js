angular.module('OneDayTrip.services', []).
  factory('oneDayTripService', function($http) {

    var tripApi = {};

    tripApi.getTrips = function() {
      return $http({
        method: 'GET',
        url: 'url'
      });
    }
    
    tripApi.buildQueryString=function(data){
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
    
    return tripApi;
  });