<?php

include 'DbConnect.php';

$objDb = new DbConnect;
$dbh = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $threadId = $_GET['id'];

    $sql = 'SELECT * FROM forum_posts WHERE id = :threadId';
    $stmt = $dbh->prepare($sql);
    $stmt->bindParam(':threadId', $threadId, PDO::PARAM_INT);

    if ($stmt->execute()) {
        $thread = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($thread) {
            $response = ['status' => 1, 'data' => $thread];
        } else {
            $response = ['status' => 0, 'message' => 'Thread not found'];
        }
    } else {
        $error_message = $stmt->errorInfo();
        $response = ['status' => 0, 'message' => 'Failed to fetch thread. Error: ' . $error_message[2]];
    }

    $stmt->closeCursor();
} else {
    $response = ['status' => 0, 'message' => 'Invalid request method'];
}

echo json_encode($response);
?>
