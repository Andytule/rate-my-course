<?php
class DbConnect {
    private $server = 'sql5.freesqldatabase.com';
    private $dbname = 'sql5664657';
    private $user = 'sql5664657';
    private $pass = 'ETyIh1GNQX';

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname . ';port=3306', $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Echo some information about the connection
            echo "Connected to MySQL server at {$this->server}.\n";
            echo "Database name: {$this->dbname}\n";
            echo "User: {$this->user}\n";
            echo "PDO driver name: " . $conn->getAttribute(PDO::ATTR_DRIVER_NAME) . "\n";
            echo "PDO server version: " . $conn->getAttribute(PDO::ATTR_SERVER_VERSION) . "\n";

            return $conn;
        } catch (\PDOException $e) {
            echo "Database Error: " . $e->getMessage();
            return null;
        }
    }
}

// class DbConnect {
    //     private $server = 'localhost';
    //     private $dbname = 'ratemycourse';
    //     private $user = 'root';
    //     private $pass = '';

    //     public function connect() {
    //         try {
    //             $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
    //             $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //             return $conn;
    //         } catch (\Exception $e) {
    //             echo "Database Error: " . $e->getMessage();
    //         }
    //     }
    // }
?>