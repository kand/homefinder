<!DOCTYPE html>
<html>
	<head>
		<title>HomeFinder</title>
		
		<link rel="stylesheet" type="text/css" href="css/main.css" />

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAIxlLQ0BaDehnTc9Fk4F32ATV8xJipxJE&sensor=false"></script>
		<script type="text/javascript" src="js/hf.js"></script>
		<script type="text/javascript" src="js/utility.js"></script>
		
		<script type="text/javascript">
			$(document).ready(function(e){
				Main.ready(e);
			});
			
			var Main = (function($){
				
				// call on document ready
				var _ready = function(e){
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
				}
				
				// public interface
				return {
					ready: _ready
				}
			})($)
		</script>
	
	</head>
	<body>
		<div id="nav">
			<h1>HOMEFINDER</h1>
			
			<form id="search">
				<div>
					<label for="search_city">City </label>
					<select id="search_city">
						<option value="1">Madison</option>
					</select>
				</div>
				<div>
					<label for="search_state">State </label>
					<select id="search_state">
						<option value="1">WI</option>
					</select>				
				</div>
				<div>
					<label for="search_zip">Zip </label>
					<input type="text" class="field-zip"/>
				</div>
			</form>
		</div>
		<div id="content">
			<div id="map_canvas" style="width:100%; height:100%"></div>
		</div>
	</body>
</html>