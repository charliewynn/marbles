<?php
  $file = $_POST['file'];
  if(file_exists($file.".html") && filesize($file.".html") > 0)
  {  
    $handle = fopen($file.".html", "r");  
    $contents = fread($handle, filesize($file.".html"));  
    fclose($handle);  
      
    echo $contents;  
  }  
?>