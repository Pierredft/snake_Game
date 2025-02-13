<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "snake_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name, score AS highScore FROM scores ORDER BY score DESC LIMIT 1";
$result = $conn->query($sql);

$highScore = 0;
$highScoreName = '';
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $highScore = $row['highScore'];
    $highScoreName = $row['name'];
}

$conn->close();

echo json_encode(['highScore' => $highScore, 'highScoreName' => $highScoreName]);
?>