<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

include 'DbConnect.php';
$objDb = new DbConnect;
$dbh = $objDb->connect();

class User
{
    public $id;
    public $email;
    public $role_id;

    function set_id($id)
    {
        $this->id = $id;
    }

    function set_email($email)
    {
        $this->email = $email;
    }

    function set_role_id($role_id)
    {
        $this->role_id = $role_id;
    }
}

$user = json_decode(file_get_contents('php://input'));

$method = $_SERVER['REQUEST_METHOD'];
$command = 'SELECT * FROM users WHERE email=? AND password=? LIMIT 1';
$stmt = $dbh->prepare($command);

$params = [$user->email, $user->password];
$success = $stmt->execute($params);

if ($success) {
    if ($row = $stmt->fetch()) {
        $userInfo = new User();
        $userInfo->set_id($row['id']);
        $userInfo->set_email($row['email']);
        $userInfo->set_role_id($row['role_id']);

        $response = ['status' => 1, 'message' => 'Logged in successfully.', 'user' => $userInfo];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to log in.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Failed attempting to log in.'];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
