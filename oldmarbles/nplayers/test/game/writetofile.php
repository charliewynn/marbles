<?php
  $file = $_POST['file'];
  $text = $_POST['text'];
  $fp = fopen($file.".txt", 'w');  
  fwrite($fp, stripslashes(htmlspecialchars("\n".$text)));  
  fclose($fp); 
?>