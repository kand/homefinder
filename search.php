<?php

// call search function
$json = Search::get_homefinder_data($_POST);
echo($json);

class Search {
	
	private static $HOMEFINDER_SEARCH_URL = "http://services.homefinder.com/listingServices/search";
	private static $API_KEY = "5cbjttg52c7anctpr78t73v8";
	
	/**
	 * Get search data from homefinder
	 */
	public static function get_homefinder_data($postData){
		// build request string
		$request = Search::$HOMEFINDER_SEARCH_URL . "?" . Search::translate_criteria_to_homefinder($postData);

		// do a get request and decode json
		$json = json_decode(file_get_contents($request));
		
		// reformulate our json to suit our needs
		
		return json_encode($json);
	}
	
	/**
	 * Translate my search criteria into a query string for homefinder
	 */
	public static function translate_criteria_to_homefinder($postData){
		// what the query has available
		$query = array(
			"apikey" => Search::$API_KEY,
			"area" => ""
		);
		
		// translate data
		foreach($postData as $k=>$v){
			if($k == "search_city"){
				$query["area"] = $v . $query["area"];
			} else if($k == "search_state"){
				$query["area"] = $query["area"] . "," . $v;
			} else if($k == "search_zip" && strlen($v) === 5 && is_numeric($v)){
				$query["area"] = $v;
			}
		}
		
		// turn query into string
		$query_as_str = "";
		foreach($query as $k=>$v){
			$query_as_str .= $k . "=" . $v . "&";
		}
		// trim off trailing &
		$query_as_str = trim($query_as_str,"&");
		// return string query
		return $query_as_str;
	}
}
?>