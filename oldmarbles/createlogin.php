<?php
$host="cwynnmarbles.db.2873762.hostedresource.com"; // Host name 
$username="cwynnmarbles"; // Mysql username 
$password="M20Inches"; // Mysql password 
$db_name="cwynnmarbles"; // Database name 
$tbl_name="Players"; // Table name


$con = mysql_connect("$host","$username","$password");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("$db_name")or die("cannot select DB");

// username and password sent from form 
$marblesusername=$_POST['marblesusername']; 
$marblespassword=$_POST['marblespassword'];
$myconfirmpassword=$_POST['confirmpassword'];
$marblesemail=$_POST['marblesemail'];

// To protect MySQL injection (more detail about MySQL injection)
$marblesusername = stripslashes($marblesusername);
$marblesusername = mysql_real_escape_string($marblesusername);

$marblespassword = stripslashes($marblespassword);
$marblespassword = mysql_real_escape_string($marblespassword);
$marblespassword_encrypted = md5($marblespassword);

$myconfirmpassword = stripslashes($myconfirmpassword);
$myconfirmpassword = mysql_real_escape_string($myconfirmpassword);

$marblesemail = stripslashes($marblesemail);
$marblesemail = mysql_real_escape_string($marblesemail);


$sql="SELECT * FROM $tbl_name WHERE Name='$marblesusername'";
$result=mysql_query($sql);
if (!$result) {
die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br />Query is: $sql<br />Error is: ".mysql_error());
}
// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1)
{
	echo "Username Already Taken, try another username";
	@readfile("createlogin.html");
}
else if($marblesusername.length < 2)
{
	echo "Username must be at least 2 characters long";
	@readfile("createlogin.html");
}
else if($marblesusername.length >= 15)
{
	echo "Username must be less than 15 characters long";
	@readfile("createlogin.html");
}
else {
	if($marblespassword == $myconfirmpassword)
	{
		$sql="INSERT INTO $tbl_name (Name, Password, Email)
		VALUES
		('$marblesusername','$marblespassword_encrypted','$marblesemail')";

		if (!mysql_query($sql,$con))
		{
			die('Error: ' . mysql_error());
		}
		  
		$number_of_days = 10 ;
		$date_of_expiry = time() + 60 * 60 * 24 * $number_of_days ;
		setcookie( "marbleslogin", $marblesusername, $date_of_expiry );
		
		header("location:index.php");
	}
	else
	{
		echo "Passwords Don't Match";
		@readfile("createlogin.html");
	}
}

?>