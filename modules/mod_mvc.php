<?php
	/**
	 * Call appropriate controllers based on RequestURI and other variables
	 * 	given by mod_rewrite.php.
	 */

	$datastr = "";
	foreach($RequestedData as $k=>$v){
		$datastr .= $k . "=" . $v. "&";
	}
	$datastr = trim($datastr,"&");
	 
	echo("[MOD] [MVC] Controller='" . $RequestedController 
	 		. "' Method='" . $RequestedMethod 
	 		. "' Args='" . implode(",", $RequestedArgs) 
	 		. "' Data='" . $datastr . "'\r\n");

	$lowReqCont = strtolower($RequestedController);

	$REP_DOC_ROOT = str_replace("\\", "/", $DocumentRoot);
	$CONTROLLER_FILE = $REP_DOC_ROOT . $APP_CONTROLLERS . $lowReqCont . ".php";
	$VIEW_FILE = $REP_DOC_ROOT . $APP_VIEWS . $lowReqCont . "/" . $RequestedMethod . ".php";
	
	// check that requested resources exist, if not call error
	if(!file_exists($CONTROLLER_FILE)){
		echo("[MOD] [MVC] [ERROR] Controller not found at '" . $CONTROLLER_FILE . "', returned 404.");
		$RequestedController = $ERR_CONTROLLER;
		$RequestedMethod = "error404";
		$RequestedArgs = array($CONTROLLER_FILE);
		$RequestedData = array();
		$CONTROLLER_FILE =  $REP_DOC_ROOT . $APP_CONTROLLERS . strtolower($RequestedController) . ".php";
	}
	
	echo "WHAT THE FUCKING FUCK : " . $RequestedData . "\r\n";
	
	// use reflection to call appropriate class and method
	require($CONTROLLER_FILE);
	$controller = new ReflectionClass($RequestedController);
	$method = $controller->getMethod($RequestedMethod);
	$method->invoke($RequestedArgs,$RequestedData);
	
?>