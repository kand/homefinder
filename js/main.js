$(document).ready(function(e){
	Main.ready(e);
});

var Main = (function($){
	
	var _map = null;
	var _markers = [];
	
	// create google map
	var _buildMap = function(){
		var myOptions = {
			center: new google.maps.LatLng(39.50, -98.35),
			zoom: 5,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_TOP
			},
			streetViewControl: false,
			panControl: false
		};
		_map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	};
	
	// change the viewport of the map based on given address/location
	var _changeViewport = function(address){
		// build request
		var req = {
			address: address
		};
		// call geocoder
		(new google.maps.Geocoder()).geocode(req,function(results,status){
			if(status === google.maps.GeocoderStatus.OK){
				// successful call to geocoder, get top result viewport geometry
				var view = results[0].geometry.viewport;
				// set viewport of map
				_map.fitBounds(view);
			}
		});
	};
	
	// public interface
	return {
		ready: function(e){
			_buildMap();
		},
		getMap: function(){ return _map; },
		changeViewport: _changeViewport,
		addMarker: function(marker){ _markers.push(marker); },
		clearMarkers: function(){
			var len = _markers.length;
			for(var i = 0; i < len; i++){
				_markers[i].setMap(null);
			}
			_markers.length = 0;
		}
	}
})($);