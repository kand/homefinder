<?php

// convert scratch pad stuff back for ease of use
$DocumentRoot = $_QUICKPHP_SCRATCHPAD_0;
$RequestURI = $_QUICKPHP_SCRATCHPAD_1;
$QueryString = $_QUICKPHP_SCRATCHPAD_2;

// call search function
Search::get_homefinder_data($QueryString);

class Search {
	
	private $HOMEFINDER_SEARCH_URL = "http://services.homefinder.com/listingServices/search";
	private $API_KEY = "5cbjttg52c7anctpr78t73v8";
	
	public static function get_homefinder_data($query){

		// foreach( $fields as $key => $value )
		// $fields_string .= $key.'='.$value.'&';
		// $fields_string = rtrim( $fields_string, '&' );
		
		echo "QUERY : " . $query . "\r\n";
		
		// send request to url
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL,$HOMEFINDER_SEARCH_URL);
		curl_setopt($ch,CURLOPT_POST,count($fields));
		curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string );
		
		// get result
		$result = curl_exec($ch);
		
		// close curl
		curl_close($ch);
	}	
}
?>