<!DOCTYPE HTML>

<html>
<head>
    <?php include ('ip.php');?>
    <?php include ('highscores.php');?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="shortcut icon" href="../laserkiwi/img/laserkiwi_QAl_icon.ico" type="image/x-icon">
<title>LaserKiwi</title>
<link rel="stylesheet" type = "text/css" href = "../laserkiwi/assets/css/fontLoader.css">
</head>
<body>


  <script type="text/javascript" src="https://code.jquery.com/jquery-1.8.2.js"></script>
  <style type="text/css">
  #overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  filter:alpha(opacity=70);
  -moz-opacity:0.7;
  -khtml-opacity: 0.7;
  opacity: 0.7;
  z-index: 100;
  display: none;
  }
  .cnt223 a{
  text-decoration: none;
  }
  .popup{

  width: 100%;
  margin: 0 auto;
  display: none;
  position: fixed;
  z-index: 101;
  }
  .cnt223{

    min-width: 100px;
    width: 535px;
    min-height: 538px;
    margin: 100px auto;
    background: #f3f3f3;
    z-index: 103;
    padding: 15px 35px;
    border-radius: 5px;
    box-shadow: 0 2px 5px #000;
    background-image: url("../laserkiwi/img/cov_update_bg.png");
  }
  .cnt223 p{
    clear: both;

    font-family: "retro_gaming", Times, serif;
    color: #000000;
    font-size: 20px;
    text-align: center;
    width: 400px;
    padding-left: 50px;
    position: fixed;
    top: 420px;

  }
  .cnt223 p a{
    color: #d91900;
    font-family: "retro_gaming", Times, serif;

    line-height: 70px;

  }
  .cnt223 .x{
    float: right;
    height: 35px;
    left: 22px;
    position: relative;
    top: -25px;
    width: 34px;
  }
  .cnt223 .x:hover{
    cursor: pointer;
  }
  </style>
  <script type='text/javascript'>
    var STARTING_MESSAGE = false;
    $(function(){

      var overlay = $('<div id="overlay"></div>');
      overlay.show();
      overlay.appendTo(document.body);
      $('.popup').show();
      $('.close').click(function(){
        $('.popup').hide();
        overlay.appendTo(document.body).remove();
        STARTING_MESSAGE =true;
        return false;
  });




  $('.x').click(function(){
  $('.popup').hide();
  overlay.appendTo(document.body).remove();
  return false;
  });
  });
  </script>
    <div class='popup'>
      <div class='cnt223'>
          <p> Use the arrow keys to move. Use A and D to rotate. Press the space bar to shoot.    <br> Defend Aotearoa.
            <br>
          <a href='' class='close'>START</a>
        </p>
      </div>
    </div>



		<canvas id="gameCanvas">
        Please upgrade your browser to support HTML5.<br/>
        One recommendation is to install the latest Chrome or Firefox.
				<img id="Aotearoa" src="img/NZpixel.png">
				<img id="LaserKiwi" src="img/laserkiwi.png">
				<img id="Covid" src="img/smallcovid.png">
				<img id="Bullet" src="img/laser.png">
    </canvas>

		<script type="text/javascript" src="constants.js"></script>
		<script type="text/javascript" src="game.js"></script>
</body>
</html>
