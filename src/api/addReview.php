<?php

include 'DbConnect.php';
$objDb = new DbConnect;
$dbh = $objDb->connect();

$user = json_decode(file_get_contents('php://input'));

$method = $_SERVER['REQUEST_METHOD'];
$command = 'INSERT INTO course_reviews(course_name, course_code, term, level, rating, school_name, comments, tips_and_tricks, creator_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
$stmt = $dbh->prepare($command);

$params = [
    $user->courseName, 
    $user->courseCode, 
    $user->term,
    $user->level,
    $user->rating * 2,
    $user->schoolName,
    $user->comments,
    $user->tipsAndTricks,
    $user->creator_id
];
$success = $stmt->execute($params);

if ($success) {
    $response = ['status' => 1, 'message' => 'Review Created Successfully.'];
} 
else {
    $response = ['status' => 0, 'message' => 'Failed To create review.'];
}

echo json_encode($response)

?>
