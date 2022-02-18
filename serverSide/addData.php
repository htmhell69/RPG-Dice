<?php
    class MyDB extends SQLite3 {
        function __construct() {
            $this->open('playerData.db');
        }
    }

    $name = $_GET["name"];
    function createDatabase(){
        global $db;
        if(!$db) {
            echo($db->lastErrorMsg());
        } else {
            echo("Opened database successfully\n");
        }

        $sql =<<<EOF
            CREATE TABLE ACCOUNTS
            (NAME TEXT PRIMARY KEY     NOT NULL,
            PASSWORD          TEXT    NOT NULL,
            SAVE1             TEXT);
            EOF;

        $ret = $db->exec($sql);
        if(!$ret){
            echo($db->lastErrorMsg());
        } else {
            echo("Table created successfully\n");
        }
            
    }


    function addData(){
        global $db;
        $sql =<<<EOF
        INSERT INTO ACCOUNTS (NAME, PASSWORD)
        VALUES ('Teddy', '654321');
        INSERT INTO ACCOUNTS (NAME, PASSWORD)
        VALUES ('Mark','123456' );
        EOF;
        

        $ret = $db->exec($sql);
        if(!$ret){
            echo $db->lastErrorMsg();
        }else{
            echo("successfuly added data");
        }   
    }
    

if(!file_exists("playerData.db")){
    $db = new MyDB();
    createDatabase();
    addData();

} else{
    $db = new MyDB();
    addData();
}
    
 
 ?>


