<?php
$host="cwynnmarbles.db.2873762.hostedresource.com"; // Host name 
$username="cwynnmarbles"; // Mysql username 
$password="M20Inches"; // Mysql password 
$db_name="cwynnmarbles"; // Database name 
$tbl_name="Players"; // Table name
$currentUser=$_COOKIE['marbleslogin'];
mysql_connect($host,$username,$password);
@mysql_select_db($db_name) or die( "Unable to select database");
$query="SELECT * FROM $tbl_name WHERE Name != '$currentUser'";
$result=mysql_query($query);
if (!$result)
{
	die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br>Query is: $sql<br>Error2 is: ".mysql_error());
}
$num=mysql_numrows($result);

mysql_close();

echo "
<html><head><title>cWynn Answers</title>
	<style type=\"text/css\">
		iframe {
		display:none;
		}
		
		#rounded-corner{
		font-family:\"Lucida Sans Unicode\", \"Lucida Grande\", Sans-Serif;font-size:12px;
		width:480px;
		text-align:left;
		border-collapse:collapse;margin:20px;
		}#rounded-corner 
		thead 
		th.rounded-company{
		background:#b9c9fe url(\"http://media.smashingmagazine.com/cdn_smash/images/express-css-table-design/table-images/left.png\")
		left -1px no-repeat;
		}
		#rounded-corner thead th.rounded-q4{background:#b9c9fe
		url(\"http://media.smashingmagazine.com/cdn_smash/images/express-css-table-design/table-images/right.png\")
		right -1px no-repeat;
		}
		#rounded-corner th{
		font-weight:normal;
		font-size:13px;
		color:#039;
		background:#b9c9fe;
		padding:8px;}
		#rounded-corner
		td{background:#e8edff;border-top:1px solid #fff;color:#669;
		padding:8px;}#rounded-corner tfoot td.rounded-foot-left{background:#e8edff 
		url(\"http://media.smashingmagazine.com/cdn_smash/images/express-css-table-design/table-images/botleft.png\")
		left bottom no-repeat;}#rounded-corner tfoot td.rounded-foot-right{background:#e8edff 
		url(\"http://media.smashingmagazine.com/cdn_smash/images/express-css-table-design/table-images/botright.png\")
		right bottom no-repeat;}#rounded-corner tbody tr:hover td{background:#d0dafd;}
	
		
		body{margin:0;padding:0}
		#body{margin:auto}
		.createButton {
		background:-moz-linear-gradient(center top , #0079f4, #005cba);
		background: -webkit-gradient(linear, center top, center bottom, from(#0079f4), to(#005cba));
		border-radius: 50px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
		-moz-border-radius: 50px;
		-moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
		-webkit-border-radius: 50px;
		-webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
		color: #fff;
		cursor: pointer;
		float: center
		font-size: 18px;
		font-weight: bold;
		padding: 5px 20px;
		text-decoration: none;
		}
	</style>
</head>
<body>";

echo "<br><br><center>";
echo $_Error;
echo"<br><b><center>Choose 3 players to play against 
			<a href=\"index.php\" align=center class=\"createButton\">Cancel</a>
			</center></b><br><br>";
echo "<div align=center style=\"height:300px; overflow:auto;\">
<form name=\"form1\" method=\"post\" action=\"makegame.php\">
<table id=\"rounded-corner\" summary=\"Current Marbles Games\">
				<thead>
					<tr>
						<th scope=\"col\" class=\"rounded-company\">Player</th>
						<th scope=\"col\" class=\"rounded-q4\"> Name</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
					<td colspan=\"1\" class=\"rounded-foot-left\">
					<em>Choose 3 players to play against</em>
					</td>
					<td class=\"rounded-foot-right\">&nbsp;</td>
					</tr>
				</tfoot>
				<tbody>";
					$i=0;
					while ($i < $num) {

						$Name=mysql_result($result,$i,"Name");
						$PlayerId=mysql_result($result,$i,"PlayerId");
							echo "<tr>
								<td>$Name</td>
								<td><input type=\"checkbox\" name=\"Players[]\" value=\"$PlayerId\"></td>
                                                              </tr>";
						
						$i++;
					}
					

					echo "
					<tr><td colspan=2 align=center>
					<div align=center><input class=\"createButton\" type=\"submit\" name=\"Submit\" value=\"Create Game\">
					</div>
					</td>
					</tr>
				</tbody>
			</table></form>
</body></html>";
?>
