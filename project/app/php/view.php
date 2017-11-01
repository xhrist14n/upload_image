<?php
$image = "";

if(isset($_GET['image'])==true){
    $image = $_GET['image'];
}
if(isset($_POST['image'])==true){
    $image = $_POST['image'];
}
$path = './uploads/';
$data = '';
if(strlen(trim($image))>0){
    $file = fopen($path.$image,'r+');
    $data = fread($file,filesize($path.$image));
    fclose($file);
}
header('Content-type:image/png');
echo $data;
?>