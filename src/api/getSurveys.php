<?php

include 'DbConnect.php';
$objDb = new DbConnect;
$dbh = $objDb->connect();

class SurveyResponse
{
    public $id;
    public $satisfaction;
    public $improvements;
    public $comments;
    public $anonymous;
    public $user_id;
}

$method = $_SERVER['REQUEST_METHOD'];
$command = 'SELECT * FROM survey_responses';
$stmt = $dbh->prepare($command);

$success = $stmt->execute();

if ($success) {
    $data = $stmt->fetchAll(PDO::FETCH_CLASS, 'SurveyResponse');

    if ($data) {
        $response = ['status' => 1, 'message' => 'Data received.', 'data' => $data];
    } else {
        $response = ['status' => 0, 'message' => 'Data not received.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Failed attempting to retrieve data.'];
}

echo json_encode($response);
?>
