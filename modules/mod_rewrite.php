<?php
	/**
	 * Direct traffic to appropriate locations by rewriting the $RequestURI var.
	 * 	Uses this scheme for parsing URLS:
	 * 		{controller}/{function}/{arg1}/{arg2}/.../{argn}
	 */
	
	/** Landing controller */
	$DEFAULT_CONTROLLER = "Home";
	/** Error controller */
	$ERR_CONTROLLER = "Err";
	/** Folder where views are located */
	$APP_VIEWS = "/app/view/";
	/** Folder where models are located */
	$APP_MODELS = "/app/model/";
	/** Folder where controllers are located */
	$APP_CONTROLLERS = "/app/controller/";
	
	// break up request into components
	$RequestArray = explode("?", $RequestURI);
	$RequestedPathArray = preg_split("~/~", $RequestArray[0], NULL, PREG_SPLIT_NO_EMPTY);
	$RequestedController = $DEFAULT_CONTROLLER;
	$RequestedMethod = "index";
	$RequestedArgs = array();
	$RequestedData = array();
	
	if(sizeof($RequestArray) > 1){
		$data = explode("&", $RequestArray[1]);
		foreach($data as $kv){
			$kv = explode("=", $kv);
			if(sizeof($kv) == 2){
				$RequestedData[$kv[0]] = $kv[1];
			}
		}
	}
	
	if (sizeof($RequestedPathArray) > 0){
		$RequestedController = $RequestedPathArray[0];

		if(sizeof($RequestedPathArray) > 1){
			// a method and args are specified
			$RequestedMethod = $RequestedPathArray[1];
			for($i = 2; $i < sizeof($RequestedPathArray); $i++){
				$RequestedArgs[$i - 2] = $RequestedPathArray[$i];
			}	
		}
	} 
	
	$RequestURI = "";
	
	echo("[MOD] [REWRITE] new request uri = " . $RequestURI . "\r\n");
?>