<script type="text/javascript" >
    const highScoreNames = [];
    const highScoreScores = [];
</script>
<?php

$conn = mysqli_connect("localhost", "reecnsxt_my_user", "PGz3D@c5Grci&PH&", "reecnsxt_laserkiwi");

$sql = "SELECT id, name, score FROM leaderboard";

$result = $conn->query($sql);


if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    //echo "id: " . $row["id"]. " - Name: " . $row["name"]. " " . $row["score"]. "<br>";
    ?> 
    <script type="text/javascript"> 
    highScoreNames.push("<?php echo $row["name"];?>"); 
    highScoreScores.push(<?php echo $row["score"];?>); 
    </script>
    <?php
  }
} else {
  echo "0 results";
}
?>
<script type="text/javascript">

    for(var i = 0; i <highScoreScores.length; i++){
        for(var j =0; j < highScoreScores.length; j++){
            if(highScoreScores[i] > highScoreScores[j]){
                [ highScoreScores[i], highScoreScores[j] ]= [ highScoreScores[j], highScoreScores[i] ];
                [ highScoreNames[i], highScoreNames[j] ]= [ highScoreNames[j], highScoreNames[i] ];
            }
        }
        
    }
    console.log(highScoreNames);
    console.log(highScoreScores);
</script>
<?php

mysqli_close($conn);


?>
