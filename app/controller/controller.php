<?php
class Controller {
	
	private function __construct(){
	}
	
	protected static function render(){
		// read in view
		$viewLoc = file_get_contents($VIEW_FILE);
		
		// execute php view and get output
		
		// write to file
	}
}
?>