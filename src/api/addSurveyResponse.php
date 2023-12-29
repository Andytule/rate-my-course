<?php

include 'DbConnect.php';

$objDb = new DbConnect;
$dbh = $objDb->connect();

$user = json_decode(file_get_contents('php://input'));

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $satisfaction = $user->satisfaction;
    $improvements = $user->improvements;
    $comments = $user->comments;

    $user_id = isset($user->user_id) ? $user->user_id : null;
    $anonymous = isset($user->anonymous) ? $user->anonymous : 0;

    if ($anonymous == 1) {
        $user_id = null;
    }

    $sql = 'INSERT INTO survey_responses (user_id, satisfaction, improvements, comments, anonymous) VALUES (:user_id, :satisfaction, :improvements, :comments, :anonymous)';
    $stmt = $dbh->prepare($sql);

    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindParam(':satisfaction', $satisfaction, PDO::PARAM_STR);
    $stmt->bindParam(':improvements', $improvements, PDO::PARAM_STR);
    $stmt->bindParam(':comments', $comments, PDO::PARAM_STR);
    $stmt->bindParam(':anonymous', $anonymous, PDO::PARAM_INT);

    $success = $stmt->execute();

    if ($success) {
        $response = ['status' => 1, 'message' => 'Survey response inserted successfully'];
    } else {
        $error_message = $stmt->errorInfo(); 
        $response = ['status' => 0, 'message' => 'Failed to insert survey response. Error: ' . $error_message[2]];
    }

    $stmt->closeCursor();
} else {
    $response = ['status' => 0, 'message' => 'Invalid request method'];
}

echo json_encode($response);
?>
