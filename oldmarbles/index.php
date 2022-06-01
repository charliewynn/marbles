<?php

if(!isset($_COOKIE['marbleslogin']))
{
	@readfile("login.html");
}
else
{
	$host="cwynnmarbles.db.2873762.hostedresource.com"; // Host name 
	$username="cwynnmarbles"; // Mysql username 
	$password="M20Inches"; // Mysql password 
	$db_name="cwynnmarbles"; // Database name 
	$tbl_name="Players"; // Table name 
	$tbl_name2="Games"; // Table name
	$user = $_COOKIE['marbleslogin'];
	mysql_connect($host,$username,$password);
	@mysql_select_db($db_name) or die( "Unable to select database");
	$query="SELECT * FROM $tbl_name WHERE Name = '$user'";
	$result=mysql_query($query);
	if (!$result)
	{
		die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br />Query is: $sql<br />Error is: ".mysql_error());
	}
	$playerId=mysql_result($result,0,"playerId");
	$query="SELECT * FROM $tbl_name2 WHERE (P1 = $playerId OR P2 = $playerId OR P3 = $playerId OR P4 = $playerId)";
	
	$result=mysql_query($query);
	if (!$result)
	{
		die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br />Query is: $sql<br />Error is: ".mysql_error());
	}					

	$num=mysql_numrows($result);
	echo "
	<html>
		<head>
			<title>Marbles by Charlie</title>
		</head>
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
			float: center;
			font-size: 18px;
			font-weight: bold;
			padding: 5px 20px;
			text-decoration: none;
			}
			
			
			body{margin:0;padding:0}
			#body{margin:auto}
		</style>
		<script>
		  function post_to_url(path, param, method) {
				method = method || \"post\"; // Set method to post by default, if not specified.
				// The rest of this code assumes you are not using a library.
				// It can be made less wordy if you use one.
				var form = document.createElement(\"form\");
				form.setAttribute(\"method\", method);
				form.setAttribute(\"action\", path);

				var hiddenField = document.createElement(\"input\");
				hiddenField.setAttribute(\"type\", \"hidden\");
				hiddenField.setAttribute(\"id\", \"GameId\");
				hiddenField.setAttribute(\"name\", \"GameId\");
				hiddenField.setAttribute(\"value\", param);

				form.appendChild(hiddenField);

				document.body.appendChild(form);    // Not entirely sure if this is necessary
				form.submit();
			}
		  </script>
		<body>
		
		<div id=\"body\" align=center>
			<br><br>Logged in as ".$_COOKIE['marbleslogin'].". <a href=\"logout.php\">Logout</a><br><br>
			<br><br><br>
			
			
			<a href=\"creategame.php\" align=center class=\"createButton\">Create Game</a><br>

			<table id=\"rounded-corner\" summary=\"Current Marbles Games\">
				<thead>
					<tr>
						<th scope=\"col\" class=\"rounded-company\">Game Id</th>
						<th scope=\"col\" class=\"rounded-q1\">Players</th>
						<th scope=\"col\" class=\"rounded-q4\">Waiting On</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
					<td colspan=\"2\" class=\"rounded-foot-left\">
					<em>Current Games - Click a game row to view</em>
					</td>
					<td class=\"rounded-foot-right\">&nbsp;</td>
					</tr>
				</tfoot>
				<tbody>
				
					<!--each games-->";
					$i=0;
					while ($i < $num) {

						$GameId=mysql_result($result,$i,"GameId");
						$xsTurn=mysql_result($result,$i,"XsTurn");
						$isComplete=mysql_result($result,$i,"Complete");
						if(!$isComplete)
						{
						
							$query2="SELECT * FROM $tbl_name WHERE Name = '$xsTurn'";
							$result3=mysql_query($query2);
							if (!$result3)
							{
								die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br />Query is: $sql<br />Error is: ".mysql_error());
							}
							
							$numTurn=mysql_numrows($result3);
							if($numTurn > 0)
							{
								$xsTurn=mysql_result($result3,0,"Name");
							}
							else
							{
								$xsTurn="Unknown";
							}
							$sql = 'SELECT Name FROM'
								. ' (SELECT P1 as p FROM `Games` g WHERE (P1 = '.$playerId.' OR P2 = '.$playerId.' OR P3 = '.$playerId.' OR P4 = '.$playerId.') and g.GameId = '.$GameId
								. ' UNION'
								. ' SELECT P2 as p FROM `Games` g WHERE (P1 = '.$playerId.' OR P2 = '.$playerId.' OR P3 = '.$playerId.' OR P4 = '.$playerId.') and g.GameId = '.$GameId
								. ' UNION'
								. ' SELECT P3 as p FROM `Games` g WHERE (P1 = '.$playerId.' OR P2 = '.$playerId.' OR P3 = '.$playerId.' OR P4 = '.$playerId.') and g.GameId = '.$GameId
								. ' UNION'
								. ' SELECT P4 as p FROM `Games` g WHERE (P1 = '.$playerId.' OR P2 = '.$playerId.' OR P3 = '.$playerId.' OR P4 = '.$playerId.') and g.GameId = '.$GameId.')a join `Players` pl on p = pl.playerId';
						
							$result2=mysql_query($sql);
							
							if (!$result2)
							{
								die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br />Query is: $sql<br />Error is: ".mysql_error());
							}
							$numPlayers=mysql_numrows($result2);
							if($numPlayers == 0)
							{
								$P1 = "No Players";
							}
							if($numPlayers >= 1)
							{
								$P1=mysql_result($result2,0,"Name");
							}
							if($numPlayers >= 2)
							{
								$P2=mysql_result($result2,1,"Name");
							}
							if($numPlayers >= 3)
							{
								$P3=mysql_result($result2,2,"Name");
							}
							if($numPlayers >= 4)
							{
								$P4=mysql_result($result2,3,"Name");
							}
							
							echo "<tr onclick=\"post_to_url('marblesgame.php','$GameId','Post')\"><td>$GameId</td><td> $P1 $P2 $P3 $P4</td><td> $xsTurn 's Turn</td></tr>";
						}
						$i++;
					}

					echo "
					
				</tbody>
			</table>
				
			<table id=\"rounded-corner\" summary=\"Past Marbles Games\">
				<thead>
					<tr>
						<th scope=\"col\" class=\"rounded-company\">Game Id</th>
						<th scope=\"col\" class=\"rounded-q1\">Players</th>
						<th scope=\"col\" class=\"rounded-q4\">Winner</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
					<td colspan=\"2\" class=\"rounded-foot-left\">
					<em>Completed Games - Click on a game row to view game</em>
					</td>
					<td class=\"rounded-foot-right\">&nbsp;</td>
					</tr>
				</tfoot>
				<tbody>";
					$i=0;
					while ($i < $num) {

						$GameId=mysql_result($result,$i,"GameId");
						$isComplete=mysql_result($result,$i,"Complete");
						$Winner=mysql_result($result,$i,"Winner");
						if($isComplete)
						{
						
							$query2="SELECT * FROM $tbl_name WHERE Name = '$Winner'";
							$result3=mysql_query($query2);
							if (!$result3)
							{
								die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br />Query is: $sql<br />Error is: ".mysql_error());
							}
							
							$numTurn=mysql_numrows($result3);
							if($numTurn > 0)
							{
								$Winner=mysql_result($result3,0,"Name");
							}
							else
							{
								$Winner="Unknown";
							}
							$sql = 'SELECT Name FROM'
								. ' (SELECT P1 as p FROM `Games` g WHERE (P1 = '.$playerId.' OR P2 = '.$playerId.' OR P3 = '.$playerId.' OR P4 = '.$playerId.') and g.GameId = '.$GameId
								. ' UNION'
								. ' SELECT P2 as p FROM `Games` g WHERE (P1 = '.$playerId.' OR P2 = '.$playerId.' OR P3 = '.$playerId.' OR P4 = '.$playerId.') and g.GameId = '.$GameId
								. ' UNION'
								. ' SELECT P3 as p FROM `Games` g WHERE (P1 = '.$playerId.' OR P2 = '.$playerId.' OR P3 = '.$playerId.' OR P4 = '.$playerId.') and g.GameId = '.$GameId
								. ' UNION'
								. ' SELECT P4 as p FROM `Games` g WHERE (P1 = '.$playerId.' OR P2 = '.$playerId.' OR P3 = '.$playerId.' OR P4 = '.$playerId.') and g.GameId = '.$GameId.')a join `Players` pl on p = pl.playerId';
						
							$result2=mysql_query($sql);
							
							if (!$result2)
							{
								die("I JUST GOT A BLEEDIN QUERY ERROR!!!!!<br />Query is: $sql<br />Error is: ".mysql_error());
							}
							$numPlayers=mysql_numrows($result2);
							mysql_close();
							if($numPlayers == 0)
							{
								$P1 = "No Players";
							}
							if($numPlayers >= 1)
							{
								$P1=mysql_result($result2,0,"Name");
							}
							if($numPlayers >= 2)
							{
								$P2=mysql_result($result2,1,"Name");
							}
							if($numPlayers >= 3)
							{
								$P3=mysql_result($result2,2,"Name");
							}
							if($numPlayers >= 4)
							{
								$P4=mysql_result($result2,3,"Name");
							}
							
							echo "<tr onclick=\"post_to_url('marblesgame.php','$GameId','Post')\"><td>$GameId</td><td> $P1 $P2 $P3 $P4</td><td> $Winner</td></tr>";
						}
						$i++;
					}

					echo "
				</tbody>
			</table>
		</div>
		</body>
	</html>";
}
?>