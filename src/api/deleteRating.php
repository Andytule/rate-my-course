<?php

include 'DbConnect.php';

$objDb = new DbConnect;
$dbh = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $id = json_decode(file_get_contents('php://input'))->id;

    $sql = 'DELETE FROM course_reviews WHERE id = :id';
    $stmt = $dbh->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Rating deleted successfully'];
    } else {
        $error_message = $stmt->errorInfo();
        $response = ['status' => 0, 'message' => 'Failed to delete rating. Error: ' . $error_message[2]];
    }

    $stmt->closeCursor();
} else {
    $response = ['status' => 0, 'message' => 'Invalid request method'];
}

echo json_encode($response);
?>
