<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "snake_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$score = $data['score'];

$sql = "INSERT INTO scores (name, score) VALUES ('$name', '$score')";

$response = array();
if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

$conn->close();

echo json_encode($response);
?>