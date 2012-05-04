
function loadSecondMarketMap(latitude, longitude){
    var DragableMap = null; 
    var level = 13; 
    var options;
    var centerLatlng = new google.maps.LatLng(latitude, longitude); 
	
    options = {   
      zoom: level, 
      center: centerLatlng, 
      mapTypeId: google.maps.MapTypeId.ROADMAP, 
      mapTypeControl: true 
    }; 
    
    DragableMap = new google.maps.Map(document.getElementById("googleMapDiv"), options); 
	
	
	var myLatLng = new google.maps.LatLng(latitude, longitude);
	
    var marker = new google.maps.Marker({
        	position: myLatLng,
        	map: DragableMap
    	});
    //attachInfoWindow(marker, i, DragableMap, '26 Broadway, 12th Floor \n New York, NY 10004');

	
	var infowindow = new google.maps.InfoWindow({ 
      content: '26 Broadway, 12th Floor</br> New York, NY 10004',
    });
	
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(DragableMap,marker);
    });
}