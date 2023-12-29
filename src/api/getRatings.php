<?php

include 'DbConnect.php';
$objDb = new DbConnect;
$dbh = $objDb->connect();

class rating
{
    public $id;
    public $courseName;
    public $courseCode;
    public $term;
    public $level;
    public $rating;
    public $schoolName;
    public $comments;
    public $tipsAndTricks;

    function set_id($id) {
        $this->id = $id;
    }

    function set_courseName($courseName) {
        $this->courseName = $courseName;
    }

    function set_courseCode($courseCode) {
        $this->courseCode = $courseCode;
    }

    function set_term($term) {
        $this->term = $term;
    }

    function set_level($level) {
        $this->level = $level;
    }

    function set_rating($rating) {
        $this->rating = $rating;
    }

    function set_schoolName($schoolName) {
        $this->schoolName = $schoolName;
    }

    function set_comments($comments) {
        $this->comments = $comments;
    }

    function set_tipsAndTricks($tipsAndTricks) {
        $this->tipsAndTricks = $tipsAndTricks;
    }
}

$user = json_decode(file_get_contents('php://input'));
$method = $_SERVER['REQUEST_METHOD'];
$command = 'SELECT * FROM course_reviews';
$stmt = $dbh->prepare($command);

$success = $stmt->execute();

if ($success) {
    if($data = $stmt->fetchALL(PDO::FETCH_ASSOC)) {

        $response = ['status' => 1, 'message' => 'Data received.', 'data' => $data];
    } else {
        $response = ['status' => 0, 'message' => 'Date not received.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Failed Attempting To Search.'];
}


echo json_encode($response);



?>
