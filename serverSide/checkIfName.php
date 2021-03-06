<?php
class MyDB extends SQLite3 {
    function __construct() {
        $this->open('playerData.db');
    }
}

    function stringInputCleaner($data)
    {
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
    $type = $_GET["type"];

   function getData($debug, $name = ""){ 
       global $db;
       $sql = "SELECT * FROM ACCOUNTS
        WHERE NAME=" . "'" . $name . "'";

        if($debug){
            echo($sql . "<br>");
        }
        $ret = $db->query($sql);
        if(gettype($ret->fetchArray(SQLITE3_ASSOC)) == "boolean"){
            echo "false";
        } else{
            echo "true";
        }
        

        if($debug){
            echo "Operation done successfully<br>";
        }
        $db->close();
    }



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
    if($debug){
        if(!$ret){
            echo($db->lastErrorMsg());
        } else {
            echo("Table created successfully<br>");
        }
    }    
}

    if(!file_exists('playerData.db')){
        $db = new MyDB;
        createDatabase($doDebug);
        getData($doDebug, $namePeram);
    } else{
        $db = new MyDB;
        getData($doDebug, $namePeram);

    }

   

   ?>