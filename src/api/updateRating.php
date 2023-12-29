<?php

include 'DbConnect.php';
$objDb = new DbConnect;
$dbh = $objDb->connect();

$user = json_decode(file_get_contents('php://input'));

$command = 'UPDATE course_reviews SET course_name=?, course_code=?, term=?, level=?, rating=?, school_name=?, comments=?, tips_and_tricks=? WHERE id=?';
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
    $user->id
];
$success = $stmt->execute($params);

if ($success) {
    $response = ['status' => 1, 'message' => 'Updated successfully'];
} else {
    $errorInfo = $stmt->errorInfo();
    $response = ['status' => 0, 'message' => 'Failed to update', 'error' => $errorInfo];
    error_log(json_encode($errorInfo));
}

echo json_encode($response);

?>
