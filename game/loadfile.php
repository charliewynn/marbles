<?php
  $file = $_POST['file'];
  if(file_exists($file.".txt") && filesize($file.".txt") > 0)
  {  
    $handle = fopen($file.".txt", "r");  
    $contents = fread($handle, filesize($file.".txt"));  
    fclose($handle);  
      
    echo $contents;  
  }  
?>