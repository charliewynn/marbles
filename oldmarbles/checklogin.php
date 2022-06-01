<?php
$host="cwynnmarbles.db.2873762.hostedresource.com"; // Host name 
$username="cwynnmarbles"; // Mysql username 
$password="M20Inches"; // Mysql password 
$db_name="cwynnmarbles"; // Database name 
$tbl_name="Players"; // Table name
$tbl_name2="Games"; // Table name

// Connect to server and select databse.
$con = mysql_connect("$host","$username","$password");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("$db_name")or die("cannot select DB");

// username and password sent from form 
$myusername=$_POST['marblesusername']; 
$mypassword=$_POST['marblespassword'];

// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);
$mypassword_encrypted = md5($mypassword);

$sql="SELECT * FROM $tbl_name WHERE Name='$myusername' and Password='$mypassword_encrypted'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1)
{
	// Register $myusername, $mypassword and redirect to file "login_success.php"
	//session_register("myusername");
	//session_register("mypassword"); 
	$number_of_days = 10 ;
	$date_of_expiry = time() + 60 * 60 * 24 * $number_of_days ;
	setcookie( "marbleslogin", $myusername, $date_of_expiry );
	
	header("location:index.php");	
}	
else
{
	echo "Incorrect Username or password";
	@readfile("login.html");
}
?>