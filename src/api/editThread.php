<?php
include 'DbConnect.php';

$objDb = new DbConnect;
$dbh = $objDb->connect();

$post = json_decode(file_get_contents('php://input'));

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $content = $post->content;
    $post_id = $post->id;

    $sql = 'UPDATE forum_posts SET content = :content WHERE id = :post_id';
    $stmt = $dbh->prepare($sql);

    $stmt->bindParam(':content', $content, PDO::PARAM_STR);
    $stmt->bindParam(':post_id', $post_id, PDO::PARAM_INT);

    $success = $stmt->execute();

    if ($success) {
        $response = ['status' => 1, 'message' => 'Post updated successfully'];
    } else {
        $error_message = $stmt->errorInfo(); 
        $response = ['status' => 0, 'message' => 'Failed to update post. Error: ' . $error_message[2]];
    }

    $stmt->closeCursor();
} else {
    $response = ['status' => 0, 'message' => 'Invalid request method'];
}

echo json_encode($response);
?>
