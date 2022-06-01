<?php
$Players=$_POST['Players'];

if(count($Players) != 3)
{
	for($i = 0; $i <= 3; $i++)	{        if(isset($_POST['Players'][$i]))        {	        echo "$player  <br/>";            mysql_close();	   }	   }
		echo "A game must contain 3 Players and only 3 players <br/>";	echo "hello ".count($Players);
	//include('creategame.php');
}
else
{
	$host="cwynnmarbles.db.2873762.hostedresource.com"; // Host name 
	$username="cwynnmarbles"; // Mysql username 
	$password="M20Inches"; // Mysql password 
	$db_name="cwynnmarbles"; // Database name 
	$tbl_name="Players"; // Table name
	$currentUser=$_COOKIE['marbleslogin'];
	mysql_connect($host,$username,$password);
	@mysql_select_db($db_name) or die( "Unable to select database");
	$query="SELECT * FROM $tbl_name WHERE Name = '$currentUser'";
	$result=mysql_query($query);

	echo "
	<html>
		<head>
			<title>Marbles by Charlie2</title>
		<style type=\"text/css\">
		iframe {
		display:none;
		}</style>
		</head><body>";

	if (!$result)
	{
		die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br>Query is: $sql<br>Error2 is: ".mysql_error());
	}


    echo "creating a game with ".mysql_result($result,$i,"Name")."<br>";
    $p1 = mysql_result($result,$i,"PlayerId");

	for($i = 0; $i <= 3; $i++)
	{
        if(isset($_POST['Players'][$i]))
        {
	        mysql_connect($host,$username,$password);
	        @mysql_select_db($db_name) or die( "Unable to select database");
            $player = $_POST['Players'][$i];
            $query = "SELECT * FROM $tbl_name WHERE PlayerId = '$player'";
            $result=mysql_query($query);

            if (!$result)
            {
	            die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br>Query is: $sql<br>Error2 is: ".mysql_error());
            }

            if($i == 0) $p2 = mysql_result($result,0,"PlayerId");
            if($i == 1) $p3 = mysql_result($result,0,"PlayerId");
            if($i == 2) $p4 = mysql_result($result,0,"PlayerId");
            $player = mysql_result($result,0,"Name");

	        echo "$player  <br/>";
            mysql_close();
	   }
	}

    echo $p1."|".$p2."|".$p3."|".$p4;

    $newBoard = "11111222223333344444";
    $newBoard = $newBoard."000000000000000000000";
    $newBoard = $newBoard."000000000000000000000";
    $newBoard = $newBoard."000000000000000000000";
    $newBoard = $newBoard."000000000000000000000";
    $newBoard = $newBoard."0";
    echo $newBoard;		$host="cwynnmarbles.db.2873762.hostedresource.com"; // Host name 	$username="cwynnmarbles"; // Mysql username 	$password="M20Inches"; // Mysql password 	$db_name="cwynnmarbles"; // Database name 	$tbl_name="Games"; // Table name		$con = mysql_connect("$host","$username","$password");		mysql_select_db("$db_name")or die("cannot select DB");	if (!$con)	{		die('Could not connect: ' . mysql_error());	}	$sql="INSERT INTO $tbl_name (		GameId ,		P1 ,		P2 ,		P3 ,		P4 ,		GameData ,		XsTurn ,		Complete ,		Winner		)		VALUES (		NULL ,  '$p1',  '$p2',  '$p3',  '$p4',  '$newBoard',  '0',  '0',  '0'		);";echo $sql;	if (!mysql_query($sql,$con))	{		die('Error: ' . mysql_error());	}    echo "</body></html>";
}

?>
