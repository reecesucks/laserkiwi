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
var rotate_left = false;
var rotate_right = false;

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
		var img = new Image();
		img.src = "../laserkiwi/img/laserkiwi.png";
		this.img = new Image();
		this.img = img;
		//let img = document.getElementById("LaserKiwi");
		//img.laserkiwi = document.getElementById("LaswerKiwi")
    this.xpos = xpos;
    this.ypos = ypos;
		this.angle = 0;
  }
	shoot_bullet(){
	 const bullet = new Bullet(laserkiwi.xpos, laserkiwi.ypos, laserkiwi.angle);
	 let bullet_img = document.getElementById("Bullet");
	 bullet_img.bullet = document.getElementById("Bullet");
	 bulletArray.push(bullet);
	}
	rotate_left(){
		console.log(laserkiwi.angle);
	}
	rotate_right(){
		console.log(laserkiwi.angle);
	}
}
//let laserkiwi_img = document.getElementById("LaserKiwi");
const laserkiwi = new LaserKiwi(ctx.canvas.width/2 - (50), ctx.canvas.height/2 - (50));
//laserkiwi_img.laserkiwi = document.getElementById("LaserKiwi");

//Bullet SPRITE
class Bullet {
	constructor(x, y, angle){
		this.x = x;
		this.y = y;
		var img = new Image();
		img.src = "../laserkiwi/img/laser.png";
		this.img = new Image();
		this.img = img;
		this.angle = angle;
		//let bullet_img = document.getElementById("Bullet");
		//bullet_img.bullet = document.getElementById("Bullet");
	}
	deleteBullet(){
		this.x = 9999;
		this.y = 9999;
		const index = bulletArray.indexOf(bulletArray[i]);
		if (index > -1) {
			bulletArray.splice(index, 1);
		}
	}
}
//let bullet_img = document.getElementById("Bullet");
//bullet_img.bullet = document.getElementById("Bullet");



//NEW ZEALAND SPRITE
class Aotearoa {
  constructor(health, x, y, path) {
		var img = new Image();
		img.src = "../laserkiwi/img/NZpixel.png";
		this.img = new Image();
		this.img = img;
    this.health = health;
		this.x = ctx.canvas.width/2 - (img.width/2)
		this.y = ctx.canvas.height/2 - (img.height/2)
  }
}

const aotearoa = new Aotearoa(AOTEAROA_HEALTH, AOTEAROA_X, AOTEAROA_Y, PATH_AOTEAROA);

class Covid {
	constructor(x, y){
	var img = new Image();
	img.src = "../laserkiwi/img/smallcovid.png";
	this.img = new Image();
	this.img = img;
	this.x = x;
	this.y = y;
	this.desinationX = 600;
	this.desinationY = 100;
	}
 	walk(){
		this.x += Math.random() * (1 - -1) + -1;
		this.y += Math.random() * (1 - -1) + -1;
		if(this.x < this.desinationX) {
			this.x += COVID_SPEED;
		}
		else {
			this.x -= COVID_SPEED;
		}
		if(this.y < this.desinationY) {
			this.y += COVID_SPEED;
		}
		else {
			this.y -= COVID_SPEED;
		}
	}
	delete(){
		console.log("delete covid");
		this.x = -9999;
		this.y = -9999;

		}

}

//et covid_img = document.getElementById("Covid");
//const covid = new Covid(200,200);
//covidArray.push(covid);
//covid_img.covid = document.getElementById("Covid");


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
	ctx.drawImage(aotearoa.img, aotearoa.x, aotearoa.y);
	ctx.drawImage(laserkiwi.img, laserkiwi.xpos, laserkiwi.ypos)
	//ctx.drawImage(covid.img, covid.x, covid.y)
}

function checkBulletCovid(){
	for(i = 0; i < bulletArray.length; i++){
		for(j = 0; j < covidArray.length; j++){
			if((bulletArray[i].x > covidArray[j].x - covidArray[j].img.width) && (bulletArray[i].x < covidArray[j].x + covidArray[j].img.width)){
				if((bulletArray[i].y > covidArray[j].y - covidArray[j].img.height) && (bulletArray[i].y < covidArray[j].y + covidArray[j].img.height)){

					bulletArray[i].deleteBullet();
					covidArray[j].delete();
					const index = covidArray.indexOf(covidArray[j]);
					if (index > -1) {
						covidArray.splice(index, 1);
					}

				}
			}
		}
	}
}

function moveBullets(){
	for (i = 0; i < bulletArray.length; i++) {
		bulletArray[i].x -= BULLET_SPEED * Math.cos(bulletArray[i].angle * Math.PI / 180)
    bulletArray[i].y += BULLET_SPEED * Math.sin(bulletArray[i].angle * Math.PI / 180)
		ctx.drawImage(bulletArray[i].img, bulletArray[i].x, bulletArray[i].y)

		if(bulletArray[i].x < - 5 || bulletArray[i].x > ctx.canvas.width || bulletArray[i].y < - 300 || bulletArray[i].y > ctx.canvas.height)
		{
			bulletArray[i].deleteBullet();
		}
	}
}

function createCovid(COVID_MAX_AMMOUNT)
{
	for(i = 0; i < COVID_MAX_AMMOUNT; i++){
		var num = Math.random() * (10 - 0) + 0;
		var x = Math.random() * (-100 - -200) + -200;
		var y = Math.random() * (ctx.canvas.height - 0) + 0;

		if(num > 3){
			var x = Math.random() * (ctx.canvas.width + 150 - ctx.canvas.width) + ctx.canvas.width;
			var y = Math.random() * (ctx.canvas.height - 0) + 0;
		}
		if(num > 7){
			var x = Math.random() * (ctx.canvas.width -0) + 0;
			var y = Math.random() * (0 + -150) + -150;
		}
		if(num > 8){
			var x = Math.random() * (ctx.canvas.width -0) + 0;
			var y = Math.random() * (ctx.canvas.height + 150 - ctx.canvas.height) + ctx.canvas.height;
		}

		//STILL NEED TO SET CITY IT IS ATTACKING
		const covid = new Covid(x,y);
		covidArray.push(covid);

	}
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
	else if (down && (laserkiwi.ypos < ctx.canvas.height - laserkiwi.img.height))
	{
		laserkiwi.ypos += LASERKIWI_SPEED;
	}
	else if (left && (laserkiwi.xpos > 0 ))
	{
		laserkiwi.xpos -= LASERKIWI_SPEED;
	}
	else if (right && (laserkiwi.xpos < ctx.canvas.width - laserkiwi.img.width))
	{
		laserkiwi.xpos += LASERKIWI_SPEED;
	}
	else if (rotate_left){
		laserkiwi.rotate_left();
	}
	else if (rotate_right){
		laserkiwi.rotate_right();
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
		if(laserkiwi.ypos < ctx.canvas.height - laserkiwi.img.height)	{
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
		if(laserkiwi.xpos < ctx.canvas.width - laserkiwi.img.width)
		{
			//laserkiwi.xpos += LASERKIWI_SPEED;
			right = true;
		}
	}
	else if (keyPressed == "A")
	{
				rotate_left = true;
	}
	else if (keyPressed == "D")
	{
				rotate_right = true;
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
	if (keyPressed == "A")
	{
		rotate_left = false;
	}
	if (keyPressed == "D")
	{
		rotate_right = false;
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
	//console.log(aotearoa.img.width);

	if(covidArray.length > 0) {
		for(i = 0; i < covidArray.length; i++) {
			covidArray[i].walk();
		}
	}
	checkBulletCovid();

	ctx.fillRect(0, 0, stage.width, stage.height);
	drawBackground();
	if(covidArray.length > 0) {
		for(i = 0; i < covidArray.length; i++) {
			//covidArray[i].walk();
			ctx.drawImage(covidArray[i].img, covidArray[i].x, covidArray[i].y)
		}
	}

	if(bulletArray.length > 0){
		moveBullets();
	}



	//Draw Image
	//ctx.drawImage(charImage,currX,currY);


}
