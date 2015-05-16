
function drawRoute(points) {
    var startPoint = points[0]
    var endPoint = points[points.length-1]
    console.log("Start: " + startPoint + ", End: " + endPoint)
}

function initialize() {
  var svc = new google.maps.DirectionsService();
  var render = new google.maps.DirectionsRenderer( {'draggable':true} );
  var request;
  var wp = [];
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(22.730907082662497, 114.28321838378906),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  

  var flightPlanCoordinates = [
    new google.maps.LatLng(22.741989621606027, 114.24270629882812),
    new google.maps.LatLng(22.730907082662497, 114.28321838378906),
    new google.maps.LatLng(22.689181188747252, 114.3460464477539)
  ];

  wp.push({'location': new google.maps.LatLng(22.730907082662497, 114.28321838378906),
            'stopover':false 
          }); 
  
  var map = map = new google.maps.Map(
	document.getElementById('map-canvas'),
	{
	 'zoom':12,
	 'mapTypeId': google.maps.MapTypeId.ROADMAP, 
	 'center': new google.maps.LatLng(22.730907082662497, 114.28321838378906)
	})

  render.setMap(map);

  request = {
   origin:new google.maps.LatLng(22.741989621606027,114.24270629882812),
   destination:new google.maps.LatLng(22.689181188747252,114.3460464477539),
   waypoints:wp,
   travelMode: google.maps.DirectionsTravelMode.WALKING
  };

  svc.route(request, function(res,sts) { 
     render.setDirections(res); 
  });
}