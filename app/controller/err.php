<?php
require('controller.php');

class Err extends Controller {
	
	public static function error404($args, $data){
		echo "ARGZ ='" . $args . "' Datarz = '" . $data . "'\r\n";
 		
		Controller::render();
	}
}
?>