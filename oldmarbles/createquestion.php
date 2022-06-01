<?php

$host="cwynnlogin2.db.2873762.hostedresource.com"; // Host name 
$username="cwynnlogin2"; // Mysql username 
$password="L20Inches"; // Mysql password 
$db_name="cwynnlogin2"; // Database name 
$tbl_name="questions"; // Table name

$con = mysql_connect("$host","$username","$password");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("$db_name", $con);
$questionfile="$_POST[questionname]".date(DATE_RFC822).".php";
$questionfile=strtolower($questionfile);
$questionurl="www.cwynn.com/answers/$questionfile";
$sql="INSERT INTO $tbl_name (name, question, questionurl)
VALUES
('$_POST[questionname]','$_POST[question]','$questionurl')";

if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
echo "1 record added";
echo "
<html>
	<head>
		<title>cWynn Answers:$_POST[questionname]</title>
		<meta http-equiv=\"REFRESH\" content=\"0;url=http://$questionurl\">
		<style type=\"text/css\">
		iframe {
		display:none;
		}
		</style>
	</HEAD>
	<body>
	</body>
</html>";

$filename = "$questionfile";
$Content = "
<html><head>
<title>cWynn Answers:$_POST[questionname]</title>
<style type=\"text/css\">
iframe {
display:none;
}
</style>
</head>
<body>
<a href=\"http://www.cwynn.com/answers/createquestion.htm\">Create Question</a><br><br><br><hr><hr>
<a href=\"http://www.cwynn.com/answers/answers.php\">View Questions</a><br><br><br><hr><hr>
<b><center>$_POST[questionname]</center></b><br><br>
$_POST[question]\r\n
</body></html>
";
 
$File = "$filename"; 
 $Handle = fopen($File, 'w');
 fwrite($Handle, $Content);
 print "Data Written"; 
 fclose($Handle); 
 
/*
if($handle = fopen($filename, 'a')){
if(is_writable($filename)){
if(fwrite($handle, $content) === FALSE){
echo "Cannot write to file $filename";
exit;
}
echo "The file $filename was created and written successfully!";
fclose($handle);
}
else{
echo "The file $filename, could not written to!";
exit;
}
}
else{
echo "The file $filename, could not be created!";
exit;
}*/

mysql_close($con)
?>