<?php	
	
	$pastdate = mktime(0,0,0,1,1,1970);
	setcookie("marbleslogin","aaa",$pastdate);
	
	echo "Logged out";
	@readfile("login.html");
?>