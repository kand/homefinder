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
				var _$searchForm = null;
	
				// initialize jquery vars			
				var _initVars = function(){
					_$searchForm = $('#search');
				};
				
				// create google map
				var _buildMap = function(){
					var myOptions = {
						center: new google.maps.LatLng(44.9719, -113.3405),
						zoom: 8,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						zoomControlOptions: {
							position: google.maps.ControlPosition.RIGHT_TOP
						},
						streetViewControl: false,
						panControl: false
					};
					var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
				};
				
				// set up search form
				var _initSearch = function(e){
					_$searchForm.submit(function(e){
						e.preventDefault();
						
						HF.search({
							errorCallback: function(data){
								
							},
							successCallback: function(data){
								
							},
							data: _$searchForm.serialize()
						});
					});
				}
				
				// public interface
				return {
					ready: function(e){
						_initVars();
						_buildMap();
						_initSearch();
					}
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
					<input id="search_city" name="search_city" type="text"/>
				</div>
				<div>
					<label for="search_state">State </label>
					<input id="search_state" name="search_state" type="text"/>	
				</div>
				<div>
					<label for="search_zip">Zip </label>
					<input id="search_zip" name="search_zip" type="text" class="field-zip"/>
				</div>
				<button id="search_submit" type="submit">Search</button>
			</form>
		</div>
		<div id="content">
			<div id="map_canvas" style="width:100%; height:100%"></div>
		</div>
	</body>
</html>