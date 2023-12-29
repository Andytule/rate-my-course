<?php

include 'DbConnect.php';
$objDb = new DbConnect;
$dbh = $objDb->connect();

class user
{
    public $id;
    public $email;
    public $role_id;

    function set_id($id) {
        $this->id = $id;
    }

    function set_email($email) {
        $this->email = $email;
    }

    function set_role_id($role_id) {
        $this->role_id = $role_id;
    }
}

$user = json_decode(file_get_contents('php://input'));

$method = $_SERVER['REQUEST_METHOD'];
$command = 'SELECT * FROM users WHERE email=? LIMIT 1';
$stmt = $dbh->prepare($command);

$params = [$user->email];
$success = $stmt->execute($params);

if ($success) {
    if($row = $stmt->fetch()) {
        $userInfo = new user();
        $userInfo->set_id($row['id']);
        $userInfo->set_email($row['email']);
        $userInfo->set_role_id($row['role_id']);

        $response = ['status' => 1, 'message' => 'User Found.', 'user' => $userInfo];
    } else {
        $response = ['status' => 0, 'message' => 'User Not Found.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Failed Attempting To Search.'];
}


echo json_encode($response);

?>