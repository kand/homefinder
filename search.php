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
		$json = json_decode(file_get_contents($request),true);
		
		// reformulate our json to suit our needs
		$json = Search::reformulate_json($json);
		
		return json_encode($json);
	}
	
	/**
	 * Translate my search criteria into a query string for homefinder
	 */
	private static function translate_criteria_to_homefinder($postData){
		// what the query has available
		$query = array(
			"apikey" => Search::$API_KEY,
			"area" => "",
			"page" => 1,
			"resultSize" => 7
		);
		
		// translate data
		foreach($postData as $k=>$v){
			// make sure url is proper format
			$v = urlencode($v);
			// translate
			if(!empty($v)){
				if($k == "search_city"){
					$query["area"] = $v . $query["area"];
				} else if($k == "search_state"){
					$query["area"] = $query["area"] . "," . $v;
				} else if($k == "search_zip" && strlen($v) === 5 && is_numeric($v)){
					$query["area"] = $v;
				} else if($k == "search_page_num" && is_numeric($v)){
					$query["page"] = $v;
				} else if($k == "search_results_size" && is_numeric($v)){
					$query["resultsSize"] == $v;
				}
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
	
	/**
	 * Setup json how I want it
	 */
	private static function reformulate_json($json_in){
		$json_out = array();
		
		$json_out["status"] = $json_in["status"]["code"];
		$json_out["errors"] = $json_in["status"]["errorStack"];
		
		if(isset($json_in["data"])){
			// set up meta data
			$json_out["total"] = $json_in["data"]["meta"]["totalMatched"];
			$json_out["pages"] = $json_in["data"]["meta"]["totalPages"];
			$json_out["page"] = $json_in["data"]["meta"]["currentPage"];
			
			if(isset($json_in["data"]["listings"])){
				// set up listing data
				$listings_in = $json_in["data"]["listings"];
				$json_out["listings"] = array();
				for($i = 0; $i < sizeof($listings_in); $i++){
					$listing_out = array();
					$listing_out["id"] = $listings_in[$i]["id"];
					$listing_out["address"] = $listings_in[$i]["address"];
					$listing_out["type"] = $listings_in[$i]["type"];
					$listing_out["bed"] = $listings_in[$i]["bed"];
					$listing_out["bath"] = $listings_in[$i]["bath"];
					$listing_out["squareFootage"] = $listings_in[$i]["squareFootage"];
					$listing_out["description"] = $listings_in[$i]["description"];
					$listing_out["price"] = $listings_in[$i]["price"];
					$listing_out["primaryPhoto"] = $listings_in[$i]["primaryPhoto"];
					$json_out["listings"][$i] = $listing_out;
				}
			}
		}
		
		return $json_out;
	}
}
?>