<?php
	date_default_timezone_set('America/Chicago');
	
	$DebugLog = true;

	echo date("--------------d/m/Y h:i:s--------------",time()) . "\r\n";
	echo "REQUEST: " . $RequestMethod . " " .$RequestURI . "\r\n";
	echo "QUERY: " . $QueryString . "\r\n";
	echo "ROOT: " . $DocumentRoot . "\r\n";
	echo "DEFAULT DOC: " . $DefaultDoc . "\r\n";
	echo "GATEWAY INTERFACE: " . $GatewayInterface . "\r\n";
	echo "HEADERS:\r\n----\r\n" . $RequestHeaders . "\r\n----\r\n";
	echo "REDIRECT STATUS: " . $RedirectStatus . "\r\n";
	echo "REMOTE ADDR: " . $RemoteAddr . ":" . $RemotePort . "\r\n";
	echo "SCRIPT FILE: " . $ScriptFilename . "\r\n";
	echo "SCRIPT NAME: " . $ScriptName . "\r\n";
	echo "SERVER NAME: " . $ServerName . "\r\n";
	echo "SERVER ADDRESS: " . $ServerAddr . ":" . $ServerPort . "\r\n";
	echo "PROTOCOL: " . $ServerProtocol . "\r\n";
	
	//echo $DebugLogFileName."\r\n";
	//echo $ServerSignature."\r\n";
	//echo $ServerSoftware."\r\n";
	//echo $UniqueID."\r\n";
	//echo $PhpSelf."\r\n";
	//echo $ModuleSignature."\r\n";
	//$ModuleSignature .= " debug/0.1";
?>