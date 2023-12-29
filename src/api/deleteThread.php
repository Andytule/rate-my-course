<?php

include 'DbConnect.php';

$objDb = new DbConnect;
$dbh = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $threadId = json_decode(file_get_contents('php://input'))->id;

    $sql = 'DELETE FROM forum_posts WHERE id = :threadId';
    $stmt = $dbh->prepare($sql);
    $stmt->bindParam(':threadId', $threadId, PDO::PARAM_INT);

    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Thread deleted successfully'];
    } else {
        $error_message = $stmt->errorInfo();
        $response = ['status' => 0, 'message' => 'Failed to delete thread. Error: ' . $error_message[2]];
    }

    $stmt->closeCursor();
} else {
    $response = ['status' => 0, 'message' => 'Invalid request method'];
}

echo json_encode($response);
?>
