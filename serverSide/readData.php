<?php
class MyDB extends SQLite3 {
    function __construct() {
        $this->open('playerData.db');
    }
}

    $namePeram = $_GET["name"];
    $passwordPeram = $_GET["password"];


   function getData($debug, $name = "", $password = ""){ 
       global $db;
       $sql = "SELECT * FROM ACCOUNTS
        WHERE NAME=" . "'" . $name . "'" . " AND PASSWORD=" . "'" . $password . "'";
    
        echo($sql);
        $ret = $db->query($sql);
        while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
            echo "NAME = ". $row['NAME'] ."<br>";
            echo "PASSWORD = ". $row['PASSWORD'] ."<br>";
        }
        echo "Operation done successfully<br>";
        $db->close();
}


   function createDatabase($debug){
    global $db;
    if($debug){
        if(!$db) {
            echo($db->lastErrorMsg());
        } else {
            echo("Opened database successfully\n");
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
            echo("Table created successfully\n");
        }
    }    
}

    if(!file_exists('playerData.db')){
        $db = new MyDB;
        createDatabase(true);
        getData(true, $namePeram, $passwordPeram);
    } else{
        $db = new MyDB;
        getData(true, "Teddy", "654321");

    }

   ?>