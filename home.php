<!DOCTYPE html>
<html>
	<head>
		<title>HomeFinder</title>
		
		<link rel="stylesheet" type="text/css" href="css/main.css" />

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAIxlLQ0BaDehnTc9Fk4F32ATV8xJipxJE&sensor=false"></script>
		<script type="text/javascript" src="js/hf.js"></script>
		<script type="text/javascript" src="js/utility.js"></script>
		
		<script type="text/javascript" src="js/main.js"></script>
	
	</head>
	<body>
		<div id="nav">
			<h1>HOMEFINDER</h1>
			
			<form id="search">
				<div id="result_message"></div>
				<div class="search-row">
					<label for="search_city">City </label>
					<input id="search_city" name="search_city" type="text"/>
				</div>
				<div class="search-row">
					<label for="search_state">State </label>
					<input id="search_state" name="search_state" type="text"/>	
				</div>
				<div class="search-row">
					<label for="search_zip">Zip </label>
					<input id="search_zip" name="search_zip" type="text" class="field-zip"/>
				</div>
				<button id="search_submit" type="submit">Search</button><img id="search_loading" alt="loading..." src="img/loader.gif"/>
			</form>
			
			
			<div id="search_results">
				<h2>Results</h2>
				<div id="result_total">I found 0 listings!</div>
				<div id="result_list"></div>
				<div id="pageCounter">page <span id="result_page">0</span> / <span id="result_pages">0</span></div> 
			</div>
		</div>
		<div id="map_container">
			<div id="map_canvas"></div>
		</div>
	</body>
</html>