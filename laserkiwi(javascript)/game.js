//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
ctx.font = GAME_FONTS;


const bulletArray = [];
const covidArray = [];

//Direction booleans
var up = false;
var down = false;
var left = false;
var right = false;

//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;

var background_image = new Image();
background_image.src = "img/water.png";

function setAssetReady()
{
	this.ready = true;
}

//Display Preloading
ctx.fillRect(0,0,stage.width,stage.height);
ctx.fillStyle = "#000";
ctx.canvas.width  = window.innerWidth-100;
ctx.canvas.height = window.innerHeight-21;
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

var gameloop, facing, currX, currY, charX, charY, isMoving;

//Laserkiwi sprite
class LaserKiwi {
  constructor(xpos, ypos) {
		let img = document.getElementById("LaserKiwi");
		img.laserkiwi = document.getElementById("LaswerKiwi")
    this.xpos = xpos;
    this.ypos = ypos;
		this.angle = 0;
  }
	shoot_bullet(){
	 const bullet = new Bullet(laserkiwi.xpos, laserkiwi.ypos, laserkiwi.angle);
	 let bullet_img = document.getElementById("Bullet");
	 bullet_img.bullet = document.getElementById("Bullet");
	 bulletArray.push(bullet);
	 console.log(bulletArray.length);
	 ctx.drawImage(bullet_img.bullet, bullet.x, bullet.y)
	}
}
let laserkiwi_img = document.getElementById("LaserKiwi");
const laserkiwi = new LaserKiwi(ctx.canvas.width/2 - (50), ctx.canvas.height/2 - (50));
laserkiwi_img.laserkiwi = document.getElementById("LaserKiwi");

//Bullet SPRITE
class Bullet {
	constructor(x, y, angle){
		this.x = x;
		this.y = y;
		this.angle = angle;
		let bullet_img = document.getElementById("Bullet");
		bullet_img.bullet = document.getElementById("Bullet");
	}
	deleteBullet(){
		this.x = 9999;
		this.y = 9999;
		const index = bulletArray.indexOf(bulletArray[i]);
		if (index > -1) {
			bulletArray.splice(index, 1);
		}
		console.log("bullet Deleted");
		console.log(this.x, this.y, bulletArray.length);
	}
}
let bullet_img = document.getElementById("Bullet");
bullet_img.bullet = document.getElementById("Bullet");



//NEW ZEALAND SPRITE
class Aotearoa {
  constructor(health, x, y, path) {
    this.health = health;
		let img = document.getElementById("Aotearoa");
		img.aotearoa = document.getElementById("Aotearoa");
		this.x = ctx.canvas.width/2 - (img.aotearoa.width/2)
		this.y = ctx.canvas.height/2 - (img.aotearoa.height/2)
  }
}

let img = document.getElementById("Aotearoa");
const aotearoa = new Aotearoa(AOTEAROA_HEALTH, AOTEAROA_X, AOTEAROA_Y, PATH_AOTEAROA);
//aotearoa.x = ctx.canvas.width/2 - (img.aotearoa.naturalWidth/2)

class Covid {
	constructor(x, y){
	this.x = x;
	this.y = y;
	let covid_img = document.getElementById("Covid");
	covid_img = document.getElementById("Covid");
	}
}

let covid_img = document.getElementById("Covid");
const covid = new Covid(200,200);
covid_img.covid = document.getElementById("Covid");


function preloading()
{
	if (charImage.ready)
	{
		clearInterval(preloader);

		//Initialise game
		//facing = "E"; //N = North, E = East, S = South, W = West
		//isMoving = false;

		gameloop = setInterval(update, TIME_PER_FRAME);
		document.addEventListener("keydown",keyDownHandler, false);
		document.addEventListener("keyup",keyUpHandler, false);
	}
}

function drawBackground() {

	ctx.drawImage(background_image, 1, 1);
	ctx.drawImage(img.aotearoa, aotearoa.x, aotearoa.y);
	ctx.drawImage(laserkiwi_img.laserkiwi, laserkiwi.xpos, laserkiwi.ypos)
	ctx.drawImage(covid_img.covid, covid.x, covid.y)
}

function moveBullets(){
	for (i = 0; i < bulletArray.length; i++) {
		bulletArray[i].x -= BULLET_SPEED * Math.cos(bulletArray[i].angle * Math.PI / 180)
    bulletArray[i].y += BULLET_SPEED * Math.sin(bulletArray[i].angle * Math.PI / 180)
		ctx.drawImage(bullet_img, bulletArray[i].x, bulletArray[i].y)

		if(bulletArray[i].x < - 5 || bulletArray[i].x > ctx.canvas.width || bulletArray[i].y < - 300 || bulletArray[i].y > ctx.canvas.height)
		{
			bulletArray[i].deleteBullet();
		}
	}
}

function createCovid(COVID_MAX_AMMOUNT)
{
	console.log(COVID_MAX_AMMOUNT);
}
function startMessage(){
	///PUT GAME INTRO HERE
	console.log("game intro will go here");
	createCovid(COVID_MAX_AMMOUNT);
}
//------------
//Key Handlers
//------------
function keyMovement()
{
	if(up && (laserkiwi.ypos > 0))
	{
		laserkiwi.ypos -= LASERKIWI_SPEED;
	}
	else if (down && (laserkiwi.ypos < ctx.canvas.height - laserkiwi_img.laserkiwi.height))
	{
		laserkiwi.ypos += LASERKIWI_SPEED;
	}
	else if (left && (laserkiwi.xpos > 0 ))
	{
		laserkiwi.xpos -= LASERKIWI_SPEED;
	}
	else if (right && (laserkiwi.xpos < ctx.canvas.width - laserkiwi_img.laserkiwi.width))
	{
		laserkiwi.xpos += LASERKIWI_SPEED;
	}
}

function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	//console.log(keyPressed);

	if (keyPressed == "&")
	{
		if(laserkiwi.ypos > 0)	{
			up = true;
		}
	}
	else if (keyPressed == "(")
	{
		if(laserkiwi.ypos < ctx.canvas.height - laserkiwi_img.laserkiwi.height)	{
			down = true;
		}
	}
	else if (keyPressed == "%")
	{
		if(laserkiwi.xpos > 0 )
		{
			//laserkiwi.xpos -= LASERKIWI_SPEED;
			left = true;
		}
	}
	else if (keyPressed == "'")
	{
		if(laserkiwi.xpos < ctx.canvas.width - laserkiwi_img.laserkiwi.width)
		{
			//laserkiwi.xpos += LASERKIWI_SPEED;
			right = true;
		}
	}
}

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	if (keyPressed == " ")
	{
		laserkiwi.shoot_bullet();
	}
	if (keyPressed == "&")
	{
		up = false;
	}
	if (keyPressed == "(")
	{
		down = false;
	}
	if (keyPressed == "%")
	{
		left = false;
	}
	if (keyPressed == "'")
	{
		right = false;
	}
}

//------------
//Game Loop
//------------
//charX = CHAR_START_X;
//charY = CHAR_START_Y;

//currX = IMAGE_START_X;
//currY = IMAGE_START_EAST_Y;

var intro = false;
function update()
{
	if(!intro) {
		startMessage();
		intro = true;
	}
	//Clear Canvas
	//ctx.fillStyle = "grey";
	keyMovement();

	ctx.fillRect(0, 0, stage.width, stage.height);
	drawBackground();
	if(bulletArray.length > 0){
		moveBullets();
	}



	//Draw Image
	//ctx.drawImage(charImage,currX,currY);


}
