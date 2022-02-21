<?php

    class MyDB extends SQLite3 {
        function __construct() {
            $this->open('playerData.db');
        }
    }

    function stringInputCleaner($data){
    //remove space before and after
    $data = trim($data); 
    //remove slashes
    $data = stripslashes($data); 
    $data= (filter_var($data, FILTER_SANITIZE_STRING));
    return $data;
    } 

    $doDebug = $_GET["debug"];
    if($doDebug == "true"){
        $doDebug = true;
    } else {
        $doDebug = false;
    }
    $namePeram = stringInputCleaner($_GET["name"]);
    $passwordPeram = stringInputCleaner($_GET["password"]);


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


    function addData($debug, $name, $password){
        global $db;
        $sql ="
        INSERT INTO ACCOUNTS (NAME, PASSWORD)
        VALUES ('$name', '$password');
        ";
        
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
    

if(!file_exists("playerData.db")){
    $db = new MyDB();
    createDatabase($doDebug);
    addData($doDebug,$namePeram,$passwordPeram);

} else{
    $db = new MyDB();
    addData($doDebug,$namePeram,$passwordPeram);
}
   

?>


