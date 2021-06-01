<?php
$result = [];
echo "heelo";
//$result['scoreDoubled'] = $_POST['score'] * 2;
echo json_encode($result);

$score = $_POST['score'];
$name = $_POST['name'];
echo json_encode($result);

$conn = mysqli_connect("localhost", "username", "password", "database");

$sql = "INSERT INTO leaderboard VALUES (null, '$name', '$score')";

if (mysqli_query($conn, $sql)) {
   //echo "New record created successfully !";
  } else {
   //echo "Error: " . $sql . " " . mysqli_error($conn);
  }
?>
