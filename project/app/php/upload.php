<?php

$target_dir = "./uploads/";
@mkdir($target_dir);
$file = array();
$index = 'fileupload';
$success = 'false';
$data = array();
try{
    if(isset($_FILES[$index])==true){
        $file = $_FILES[$index];
        $name = basename($file["name"]);
        $explode_name = explode(".",$name);
        $extension = $explode_name[count($explode_name)-1];
        $code = md5(soundex($name));
        $data['code'] = $code;
        $name = $code.".".$extension;
        $data['name'] = $name;
        $target_file = $target_dir . $name;
        $data['path'] = $target_file;
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
        $uploadOk = 1;
        $check = getimagesize($file["tmp_name"]);
        if($check !== false) {
            $uploadOk = 1;
        } else {
            $uploadOk = 0;
        }
        if($uploadOk==1){
            @touch($target_file);
            if (move_uploaded_file($file["tmp_name"], $target_file)) {
                $success = 'true';
            }
        }
        $data['success'] = $success;
    }
}catch(Exception $ex){}
echo json_encode($data);
?>
