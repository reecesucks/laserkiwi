<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

// Create connection
//$conn = new mysqli($servername, $username, $password);
$conn = mysqli_connect("localhost", "username", "password", "database");

// Check connection
//if ($conn->connect_error) {
//  die("Connection failed: " . $conn->connect_error);
//}
//echo "Connected successfully";

$time = date("Y-m-d H:i:s");
$ip = $_SERVER['REMOTE_ADDR'];
//$theDate = date("Y-m-d H:i:s");
//$stringDate = $theDate->format('Y-m-d H:i:s');
//echo "<br>";
//echo $time;
//echo "<br>";
//echo $ip;
//echo "<br>";
//$test = 'hello';
//echo $stringDate;
//$query = mysqli_query($conn, "INSERT INTO leaderboard VALUES (NULL, 'hi', '16')");
//$query = mysqli_query($conn, "INSERT INTO visits VALUES ($time, $_SERVER['REMOTE_ADDR'])");
//$sql = "INSERT INTO employee (first_name,last_name,city_name,email)
//  VALUES ('$first_name','$last_name','$city_name','$email')";

$sql = "INSERT INTO page_visits VALUES (null, '$time', '$ip')";

if (mysqli_query($conn, $sql)) {
   //echo "New record created successfully !";
  } else {
   //echo "Error: " . $sql . " " . mysqli_error($conn);
  }
mysqli_close($conn);

?>
