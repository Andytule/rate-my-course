<?php
include 'DbConnect.php';

$objDb = new DbConnect;
$dbh = $objDb->connect();

$post = json_decode(file_get_contents('php://input'));

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $content = $post->content;
    $parent_id = isset($post->parent_id) ? $post->parent_id : null;
    $account = $post->account;

    $sql = 'INSERT INTO forum_posts (content, parent_id, account) VALUES (:content, :parent_id, :account)';
    $stmt = $dbh->prepare($sql);

    $stmt->bindParam(':content', $content, PDO::PARAM_STR);
    $stmt->bindParam(':parent_id', $parent_id, PDO::PARAM_INT);
    $stmt->bindParam(':account', $account, PDO::PARAM_INT);

    $success = $stmt->execute();

    if ($success) {
        $response = ['status' => 1, 'message' => 'Post inserted successfully'];
    } else {
        $error_message = $stmt->errorInfo(); 
        $response = ['status' => 0, 'message' => 'Failed to insert post. Error: ' . $error_message[2]];
    }

    $stmt->closeCursor();
} else {
    $response = ['status' => 0, 'message' => 'Invalid request method'];
}

echo json_encode($response);
?>
