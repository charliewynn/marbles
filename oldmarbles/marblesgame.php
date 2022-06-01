<?php
$host="cwynnmarbles.db.2873762.hostedresource.com"; // Host name 
$username="cwynnmarbles"; // Mysql username 
$password="M20Inches"; // Mysql password 
$db_name="cwynnmarbles"; // Database name 
$tbl_name="Games"; // Table name

// Connect to server and select databse.
$con = mysql_connect("$host","$username","$password");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("$db_name")or die("cannot select DB");

// username and password sent from form 
$myGameId=$_POST['GameId'];
// To protect MySQL injection (more detail about MySQL injection)
$myGameId = stripslashes($myGameId);
$myGameId = mysql_real_escape_string($myGameId);

$sql="SELECT * FROM $tbl_name WHERE GameId='$myGameId'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1)
{	

	$id=mysql_result($result,0,"GameId");
	$P1=mysql_result($result,0,"P1");
	$P2=mysql_result($result,0,"P2");
	$P3=mysql_result($result,0,"P3");
	$P4=mysql_result($result,0,"P4");
	$GameBoard=mysql_result($result,0,"GameData");
	$XsTurn=mysql_result($result,0,"XsTurn");
	echo "
		<html>
			<head>
				<title>Marbles on cwynn.com</title>
			</head>
			<style type=\"text/css\">
			iframe {
			display:none;
			}
			</style>
			<body>
			$id <br>
			$P1 <br>
			$P2 <br>
			$P3 <br>
			$P4 <br>
			$GameBoard <br>
			$XsTurn <br>			
			
			
			</body>
		</html>";
	
}	
else if($count==0)
{
	echo "No game Found";
	@readfile("index.php");
} 
else
{	
	echo "Server Error";
	@readfile("index.php");
}
?>