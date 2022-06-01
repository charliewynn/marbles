<?php
  $file = $_POST['file'];
  $text = $_POST['text'];
  $link = $_POST['link'];
  $fp = fopen($file.".html", 'a');  
  $str = stripslashes(htmlspecialchars($text));
  if($link == 'true')
    $str = '<a href=\'#\' onclick="loadBoard(\''.$str.'\');">Board</a>';
  fwrite($fp, $str.'<br>');  
  fclose($fp); 
?>