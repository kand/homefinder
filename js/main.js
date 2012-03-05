$(document).ready(function(e){
	Main.ready(e);
});

var Main = (function($){
	
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
		var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	};
	
	// public interface
	return {
		ready: function(e){
			_buildMap();
		}
	}
})($);