<?php
include 'DbConnect.php';
$objDb = new DbConnect;
$dbh = $objDb->connect();

class User
{
    public $id;
    public $password;
    public $email;
    public $role_id;

    function set_id($id) {
        $this->id = $id;
    }

    function set_password($password) {
        $this->password = $password;
    }

    function set_email($email) {
        $this->email = $email;
    }

    function set_role_id($role_id) {
        $this->role_id = $role_id;
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$command = 'SELECT * FROM users';
$stmt = $dbh->prepare($command);

$success = $stmt->execute();

if ($success) {
    if($data = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
        $response = ['status' => 1, 'message' => 'Data received.', 'data' => $data];
    } else {
        $response = ['status' => 0, 'message' => 'Data not received.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Failed attempting to fetch data.'];
}

echo json_encode($response);

?>
