<?php
    
    class MyDB extends SQLite3 {
        function __construct() {
            $this->open('playerData.db');
        }
    }

    
    //checking if bot
    $captcha;
    $captcha = filter_input(INPUT_POST, 'token', FILTER_SANITIZE_STRING);
    $secretKey = "6LfT48MeAAAAAOI3m-yrPcNVehRtBei1Cw-_Cr7w";
    $ip = $_SERVER['REMOTE_ADDR'];
  
    // post request to server
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array('secret' => $secretKey, 'response' => $captcha);
  
    $options = array(
      'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
      )
    );
    $context  = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $responseKeys = json_decode($response,true);
    header('Content-type: application/json');
    if($responseKeys["success"]) {
      $isBot = false;
    } else {
      $isBot = true;
    }
    
    function stringInputCleaner($data){
    //remove space before and after
    $data = trim($data); 
    //remove slashes
    $data = stripslashes($data); 
    $data= (filter_var($data, FILTER_SANITIZE_STRING));
    return $data;
    } 

    $doDebug = $_POST["debug"];
    if($doDebug == "true"){
        $doDebug = true;
    } else {
        $doDebug = false;
    }
    
    $namePeram = stringInputCleaner($_POST["name"]);
    $passwordPeram = stringInputCleaner($_POST["password"]);
    $savePeram = $_POST["save"];
    $type = $_POST["type"];


    function createDatabase($debug){
        global $db;
        if($debug){
            if(!$db) {
                echo($db->lastErrorMsg());
            } else {
                echo("Opened database successfully<br>");
            }
        }
    
        $sql =<<<EOF
            CREATE TABLE ACCOUNTS
            (NAME TEXT PRIMARY KEY     NOT NULL,
            PASSWORD          TEXT    NOT NULL,
            SAVE1             TEXT);
            EOF;

        $ret = $db->exec($sql);
        if($deb){
            if(!$ret){
                echo($db->lastErrorMsg());
            } else {
                echo($sql . "<br>");
                echo("Table created successfully<br>");
            }
            
        }
}


    function addData($debug, $name, $password, $save){
        global $db, $type, $savePeram;
        if($type == "save"){
            $sql = "UPDATE ACCOUNTS
            SET SAVE1 = '$save'
            WHERE NAME='$name' AND PASSWORD='$password'";
        }else{
            $sql ="
        INSERT INTO ACCOUNTS (NAME, PASSWORD)
        VALUES ('$name', '$password');
        ";
        }
        
        
        $ret = $db->exec($sql);
        if($debug){
            if(!$ret){
                echo $db->lastErrorMsg();
            }else{
                echo($sql . "<br>");
                echo("successfuly added data<br");
            }  
        } 
    }
    
if(!$isBot){
if(!file_exists("playerData.db")){
    $db = new MyDB();
    createDatabase($doDebug);
    addData($doDebug,$namePeram,$passwordPeram, $savePeram);

} else{
    $db = new MyDB();
    addData($doDebug,$namePeram,$passwordPeram, $savePeram);
}

}
   

?>


