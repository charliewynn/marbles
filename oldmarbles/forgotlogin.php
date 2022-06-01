<?php
$host="cwynnmarbles.db.2873762.hostedresource.com"; // Host name 
$username="cwynnmarbles"; // Mysql username 
$password="M20Inches"; // Mysql password 
$db_name="cwynnmarbles"; // Database name 
$tbl_name="Players"; // Table name

// Connect to server and select databse.
$con = mysql_connect("$host","$username","$password");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("$db_name")or die("cannot select DB");

// username and password sent from form 
$marblesemail=$_POST['marblesemail'];

// To protect MySQL injection (more detail about MySQL injection)
$marblesemail = stripslashes($marblesemail);
$marblesemail = mysql_real_escape_string($marblesemail);

$sql="SELECT * FROM $tbl_name WHERE Email='$marblesemail'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

if($count>=1)
{

	mail("$marblesemail", "Recover Marbles Login", 
	"To recover your marbles username follow the link below\n\n".
	"http://www.cwynn.com/marbles/recoverusername.html\n\n\n".
	"To create a new marbles password follow the link below\n\n".
	"http://www.cwynn.com/marbles/renewpassword.html\n\n\n".
	"If you were not expecting to recieve this email simple ignore it.");
	
	echo "An email has been sent to $marblesemail";
	@readfile("login.html");
}	
else
{
	echo "No Player found with that email";
	@readfile("forgotlogin.html");
}
?>