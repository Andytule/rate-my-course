<?php

include 'DbConnect.php';

$objDb = new DbConnect;
$dbh = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = 'SELECT forum_posts.id, forum_posts.content, forum_posts.date, forum_posts.account, forum_posts.parent_id, users.email
            FROM forum_posts
            INNER JOIN users ON forum_posts.account = users.id';
    
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($posts as &$post) {
        $post['date'] = date("Y-m-d\TH:i:s", strtotime($post['date']));
    }

    $response = ['status' => 1, 'message' => 'Posts retrieved successfully', 'data' => $posts];
} else {
    $response = ['status' => 0, 'message' => 'Invalid request method'];
}

echo json_encode($response);