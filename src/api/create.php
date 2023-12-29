<?php

include 'DbConnect.php';
$objDb = new DbConnect;
$dbh = $objDb->connect();

$user = json_decode(file_get_contents('php://input'));

$method = $_SERVER['REQUEST_METHOD'];
$command = 'INSERT INTO users(email, password, role_id) VALUES(?, ?, ?)';
$stmt = $dbh->prepare($command);

$params = [$user->email, $user->password, 1];
$success = $stmt->execute($params);

if ($success) {
    $response = ['status' => 1, 'message' => 'Account Created Successfully.'];
} 
else {
    $response = ['status' => 10, 'message' => 'Failed To Create Account.'];
}

echo json_encode($response)

?>
