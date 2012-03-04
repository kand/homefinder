<!DOCTYPE html>
<html>
	<head>
		<title>HomeFinder</title>
		
		<link rel="stylesheet" type="text/css" href="css/main.css" />

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAIxlLQ0BaDehnTc9Fk4F32ATV8xJipxJE&sensor=false"></script>
		<script type="text/javascript">
			$(document).ready(function(e){
				// set up maps api
				var myOptions = {
					center: new google.maps.LatLng(-34.397, 150.644),
					zoom: 8,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoomControlOptions: {
						position: google.maps.ControlPosition.RIGHT_TOP
					},
					streetViewControl: false,
					panControl: false
				};
				var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
			});
		</script>
	
	</head>
	<body>
		<div id="header">HEAD</div>
		<div id="content">
			<div id="map_canvas" style="width:100%; height:100%"></div>
		</div>
	</body>
</html>

<?php

?>