//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
ctx.font = GAME_FONTS;

//highScoreNames = ['FIRSTT', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'];
//highScores = [1235234, 123433, 234578, 56784, 2342453, 23413, 345345, 3452, 1232, 6547];


const bulletArray = [];
const covidArray = [];
const citiesArray = [];
const infectedCities = [];
const flagArray = ["../laserkiwi/img/brz_flag.png", "../laserkiwi/img/eng_flag.png","../laserkiwi/img/ind_flag.png", "../laserkiwi/img/usa_flag.png", "../laserkiwi/img/Nigeria_flag.png", "../laserkiwi/img/japan_flag.png", "../laserkiwi/img/SA-flag.png"]

//Direction booleans
var up = false;
var down = false;
var left = false;
var right = false;
var rotate_left = false;
var rotate_right = false;
var yes = false;

var COVID_MAX_AMMOUNT = 5;
var max = 5;

var GAME_OVER = false;
var HIGH_SCORE_INPUT = false;
var NAME = ""

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

var update_background_image = new Image();
update_background_image.src = "../laserkiwi/img/cov_update_bg.png";

var factoryImage = new Image();
factoryImage.src = "../laserkiwi/img/factory.png";

var messageBoxBackground = new Image();
messageBoxBackground.src = "../laserkiwi/img/covid_stripes.png";

var ashleyBloomfield = new Image();
ashleyBloomfield.src = "../laserkiwi/img/ashley.png";

const playlist = ["../laserkiwi/audio/bg_music_TheBeths.mp3", "../laserkiwi/audio/background_music.mp3"];

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
  constructor(x, y) {
		var img = new Image();
		img.src = "../laserkiwi/img/laserkiwi.png";
		this.img = new Image();
		this.img = img;
    this.x = x;
    this.y = y;
		this.score = 0;
		this.carryingVaccine = false;
		this.killCount = 0;
		this.vaccinations = 0;
		this.angle = 0;
  }
	shoot_bullet(){
	 const bullet = new Bullet(this.x, this.y, this.angle);
	 let bullet_img = document.getElementById("Bullet");
	 bullet_img.bullet = document.getElementById("Bullet");
	 bulletArray.push(bullet);
	}
	up(){
		this.y -= LASERKIWI_SPEED;
	}
	down(){
		this.y += LASERKIWI_SPEED;
	}
	right(){
		this.x += LASERKIWI_SPEED;
	}
 	left(){
		this.x -= LASERKIWI_SPEED;
	}
	rotate_left(){
		this.angle -= LASERKIWI_ROTATESPEED;
	}
	rotate_right(){
		this.angle += LASERKIWI_ROTATESPEED;
	}
	getCentreX(){
		return this.x + this.img.width/2;
	}
	getCentreY(){
		return this.y + this.img.height/2;
	}
	draw(){
		ctx.setTransform(1,0,0,1,this.x,this.y); // set position of image center
		ctx.rotate(this.angle); // rotate
		ctx.drawImage(this.img,-this.img.width/2,-this.img.height/2); // draw image offset so its center is at x,y
		ctx.setTransform(1,0,0,1,0,0); // restore default transform
	}
}
const laserkiwi = new LaserKiwi(ctx.canvas.width/2 + 300 - 50, ctx.canvas.height/2 - (50));

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
	}
	getCollisionX()
	{
		return (this.x - (Math.cos(this.angle) * 18)); //+ this.img.width /2);// - (Math.sin(this.angle) * 18);
	}
	getCollisionY()
	{
		return (this.y - (Math.sin(this.angle) * 18)); //+ this.img.height /2);// - (Math.cos(this.angle) * 18);
	}

	draw(){
		ctx.setTransform(1,0,0,1,this.x,this.y); // set position of image center
		ctx.rotate(this.angle); // rotate
		ctx.drawImage(this.img,-this.img.width/2,-this.img.height/2); // draw image offset so its center is at x,y
		ctx.setTransform(1,0,0,1,0,0); // restore default transform
	}
	deleteBullet(){
		this.x = 9999;
		this.y = 9999;
		//const index = bulletArray.indexOf(bulletArray[i]);
		//if (index > -1) {
			//bulletArray.splice(index, 1);
		//}
	}
}

//NEW ZEALAND SPRITE
class Aotearoa {
  constructor(health, x, y, path) {
		var img = new Image();
		img.src = "../laserkiwi/img/NZpixel.png";
		this.img = new Image();
		this.img = img;
    this.health = health;
		this.x = ctx.canvas.width/2 - (this.img.width/2) + 175;
		this.y = ctx.canvas.height/2 - (this.img.height/2);
  }
}
const aotearoa = new Aotearoa(AOTEAROA_HEALTH, AOTEAROA_X, AOTEAROA_Y, PATH_AOTEAROA);

class Flag {
	constructor(x, y){
		var img = new Image();
		var num = Math.floor(Math.random() * (flagArray.length - 0) + 0);
		img.src = flagArray[num];
		this.img = new Image();
		this.img = img;
		this.x = x;
		this.y = y;
	}
}

class Covid {
	constructor(x, y, variant){
	var img = new Image();
	img.src = "../laserkiwi/img/smallcovid.png";
	this.img = new Image();
	this.img = img;
	this.x = x;
	this.y = y;
	this.desinationX = 600;
	this.desinationY = 100;
	this.hitCount = 0;
	this.variant = variant;
		if(this.variant){
			this.flag = new Flag(this.x, this.y);
		}

	}
	setDestination(){
		var num = Math.floor(Math.random() * (citiesArray.length - 0) + 0);
		this.desinationX = citiesArray[num].x + citiesArray[num].img.width/2 - this.img.width/2;
		this.desinationY = citiesArray[num].y + citiesArray[num].img.height/2 - this.img.height/2;
}
	getCentreX(){
		return this.x + this.img.width/2;
	}
	getCentreY(){
		return this.y + this.img.height/2;
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
		this.x = -9999;
		this.y = -9999;
		laserkiwi.killCount += 1;
		}

}

class City {
	constructor(name, x, y, path, pathInfected){
		this.name = name;
		this.infected = false;
		var img = new Image();
		img.src = path;
		this.img = new Image();
		this.img = img;
		var img = new Image();
		img.src = pathInfected;
		this.imgInfected = new Image();
		this.imgInfected = img;
		this.x = x
		this.y = y
	}
	getCentreX(){
		return this.x + this.img.width/2;
	}
	getCentreY(){
		return this.y + this.img.height/2;
	}
	draw(){
		if(!this.infected){
		ctx.drawImage(this.img, this.x, this.y);
	} else {
		ctx.drawImage(this.imgInfected, this.x, this.y);
		}
	}
	checkCollision(){
		if (this.infected && this.getCentreX() > vaccine.getCentreX() - 45 && this.getCentreX() < vaccine.getCentreX() + 45){
			if (this.getCentreY() > vaccine.getCentreY() -45 && this.getCentreY() < vaccine.getCentreY() + 45){
				this.infected = false;
				laserkiwi.carryingVaccine = false;
				laserkiwi.score += VACCINATION_POINTS;
				laserkiwi.vaccinations += 1;
				vaccine.setXY(150, boat.y + this.img.height/2);

			}
		}

		for(var i = 0; i < covidArray.length; i++){
			if (this.getCentreX() > covidArray[i].getCentreX() -5 && this.getCentreX() < covidArray[i].getCentreX() + 5){
				if (this.getCentreY() > covidArray[i].getCentreY() -5 && this.getCentreY() < covidArray[i].getCentreY() + 5){
					this.infected = true;
				}
			}

		}
	}
}
const nelson = new City("Nelson", aotearoa.x + 180, aotearoa.y + 280, "../laserkiwi/img/nelson.png", "../laserkiwi/img/nelsoninfected.png");
const auckland = new City("Auckland", aotearoa.x + 245, aotearoa.y + 69, "../laserkiwi/img/auckland.png", "../laserkiwi/img/aucklandinfected.png");
const wellington = new City("Wellington", aotearoa.x + 240, aotearoa.y + 269, "../laserkiwi/img/beehive.png", "../laserkiwi/img/infectedbeehive.png");
const gisborne = new City("Gisborne", aotearoa.x + 350, aotearoa.y + 180, "../laserkiwi/img/gisborne.png", "../laserkiwi/img/infectedgisborne.png");
const christchurch = new City("Christchurch", aotearoa.x + 165, aotearoa.y + 356, "../laserkiwi/img/christchurch.png", "../laserkiwi/img/christchurchinfected.png");
const dunedin = new City("Dunedin", aotearoa.x + 90, aotearoa.y + 506, "../laserkiwi/img/dunedin.png", "../laserkiwi/img/dunedininfected.png");
const queenstown = new City("Queenstown", aotearoa.x + 20, aotearoa.y + 440, "../laserkiwi/img/queenstown.png", "../laserkiwi/img/infectedqueenstown.png");

citiesArray.push(nelson);
citiesArray.push(auckland);
citiesArray.push(wellington);
citiesArray.push(gisborne);
citiesArray.push(dunedin);
citiesArray.push(queenstown);
citiesArray.push(christchurch);

class Boat {
	constructor(){
		var img = new Image();
		img.src = "../laserkiwi/img/boat.png"
		this.img = new Image();
		this.img = img;
		this.x = 125;
		this.y= aotearoa.y + (aotearoa.img.height / 4) + 50;
		this.carryingVaccine = true;
		this.moving = false;
		this.track = 1; // random int for playlist
	}
}

class Vaccine {
	constructor() {
		var img = new Image();
		img.src = "../laserkiwi/img/vaccine.png"
		this.img = new Image();
		this.img = img;
		this.x = boat.x
		this.y = boat.y
	}
	draw() {
		ctx.drawImage(this.img, this.x, this.y)
	}
	getCentreX(){
		return this.x + this.img.width/2;
	}
	getCentreY(){
		return this.y + this.img.height/2;
	}
	setXY(x, y){
		this.x = x;
		this.y = y;
	}
}

class MusicController{
	constructor(){
		var img = new Image();
		img.src = "../laserkiwi/img/musicbuttons.png"
		this.img = new Image();
		this.img = img;
		this.x = ctx.canvas.width - this.img.width;
		this.y= 0;
		this.play = true;
		this.track = Math.floor(Math.random() * (playlist.length - 0) + 0);
	}
	playMusic(){
		console.log("Play music", playlist[this.track]);
		this.sound(playlist[this.track]);
		this.song.play();
	}
	pause(){
		console.log("pause music");
		this.sound.pause;
	}
	next(){
		if(this.track + 1 < playlist.length){
				this.track +=1;
		}
		else {
			this.track = 0
		}
		this.song.pause(); //probably wont work
		this.playMusic();
	}
	previous(){
		if(this.track - 1 >= 0){
				this.track -=1;
		}
		else {
			this.track = playlist.length - 1;
		}
		this.song.pause(); //probably wont work
		this.playMusic();
	}
	sound(src) {
	  this.song = document.createElement("audio");
	  this.song.src = src;
	  this.song.setAttribute("preload", "auto");
	  this.song.setAttribute("controls", "none");
	  this.song.style.display = "none";
	 // document.body.appendChild(this.sound);
	  this.play = function(){
	    this.song.play();
	  }
	  this.stop = function(){
	    this.song.pause();
	  }
	}
}
musicController = new MusicController();

const boat = new Boat();
const vaccine = new Vaccine();
const flag = new Flag(400, 400);

function preloading()
{
	if (charImage.ready)
	{
		clearInterval(preloader);

		//Initialise game
		//facing = "E"; //N = North, E = East, S = South, W = West
		//isMoving = false;
		//introloop = setInterval(drawUpdateBackground, TIME_PER_FRAME);
		gameloop = setInterval(update, TIME_PER_FRAME);
		document.addEventListener("keydown",keyDownHandler, false);
		document.addEventListener("keyup",keyUpHandler, false);
		document.addEventListener("click", clickHander, false);
	}
}

function drawBackground() {

	ctx.drawImage(background_image, 0, 0);
	ctx.drawImage(aotearoa.img, aotearoa.x, aotearoa.y);
	drawMusicControls();
	ctx.drawImage(boat.img, boat.x, boat.y);
	for(var i = 0; i < citiesArray.length; i++){
		citiesArray[i].draw()
	}
	drawCovid();
	laserkiwi.draw();
	if(bulletArray.length > 0){
		moveBullets();
	}
	drawScoreboard();
	drawMessageBox();
	ctx.drawImage(vaccine.img, vaccine.x, vaccine.y);
	ctx.drawImage(factoryImage, 49, boat.y - (factoryImage.height/2) - 10);
	drawText();
	//ctx.drawImage(flag.img, flag.x, flag.y);
}

function drawMessageBox() {
	ctx.drawImage(messageBoxBackground, 0, ctx.canvas.height - messageBoxBackground.height);
	const infectedCities = [];
	for (var i = 0; i < citiesArray.length; i++){
		if (citiesArray[i].infected){
			infectedCities.push(citiesArray[i].name);
		}
	}
	if (infectedCities.length > 0) {
		ctx.drawImage(ashleyBloomfield, 0, ctx.canvas.height - ashleyBloomfield.height);
		var spacing = 20;
		ctx.beginPath();
		ctx.font = "15px retro_gaming";
		ctx.fillStyle = "black";
		ctx.fillText("Covid 19 detected:", 130, ctx.canvas.height - 260);
		ctx.font = "30px retro_gaming";
		ctx.fillText("Vaccinate Now", 15, ctx.canvas.height - 15);

		for (var i = 0; i < infectedCities.length; i++){
			ctx.beginPath();
			ctx.font = "15px retro_gaming";
			ctx.fillStyle = "black";
			ctx.fillText(infectedCities[i], 145, ctx.canvas.height - 260 + spacing);
			spacing += 20;
		}

	}
	else{
	    drawHighScore();
	}
}

function drawHighScore(){
	var spacing = 0;
	ctx.beginPath();
	ctx.font = "30px retro_gaming";
	ctx.fillStyle = "black";
	ctx.fillText("High Scores", 40, ctx.canvas.height - messageBoxBackground.height + 55);
	spacing += 20;
	ctx.font = "25px retro_gaming";

	ctx.fillText("1. " + highScoreNames[0], 30, ctx.canvas.height - 230 + spacing);
	ctx.fillText(highScoreScores[0], 177, ctx.canvas.height - 230 + spacing);

	for (var i = 1; i < highScoreScores.length; i++){
		ctx.beginPath();
		ctx.font = "17px retro_gaming";
		ctx.fillStyle = "black";
		ctx.fillText((i + 1) + ". " + highScoreNames[i], 21, ctx.canvas.height - 200 + spacing);
		ctx.fillText(highScoreScores[i], 190, ctx.canvas.height - 200 + spacing);
		spacing += 20;
	}

}


function checkCollion(obj1, obj2){
		if (obj1.x  > obj2.x + obj2.img.width/2 -70 && obj1.x + obj1.img.width/2 < obj2.x + obj2.img.width/2  + 70){
			if (obj1.y  > obj2.y + obj2.img.height/2 -30 && obj1.y + obj1.img.height/2 < obj2.y + obj2.img.height/2  + 100){
				return true;
			}
		}
	}



function checkBulletCovid(){
	for(i = 0; i < bulletArray.length; i++){
		for(j = 0; j < covidArray.length; j++){
			if((bulletArray[i].getCollisionX() > covidArray[j].x) && (bulletArray[i].getCollisionX() < covidArray[j].x + covidArray[j].img.width)){
				if((bulletArray[i].getCollisionY() > covidArray[j].y) && (bulletArray[i].getCollisionY() < covidArray[j].y + covidArray[j].img.height)){
					laserkiwi.score += SMALL_COVID_POINTS;
					covidArray[j].hitCount += 1;
					bulletArray[i].deleteBullet();
					if(!covidArray[j].variant){
						covidArray[j].delete();
						const index = covidArray.indexOf(covidArray[j]);
						if (index > -1) {
							covidArray.splice(index, 1);
						}
					}
					if(covidArray[j].variant && covidArray[j].hitCount > 2){
						laserkiwi.score += VARIANT_COVID_POINTS;
						covidArray[j].delete();
						const index = covidArray.indexOf(covidArray[j]);
						if (index > -1) {
							covidArray.splice(index, 1);
						}
					}
					//const index = covidArray.indexOf(covidArray[j]);
					//if (index > -1) {
					//	covidArray.splice(index, 1);
					//}
				}
			}
		}

		if(bulletArray[i].x > 9000){
			const index = bulletArray.indexOf(bulletArray[i]);
			if (index > -1) {
				bulletArray.splice(index, 1);
	//	bulletArray[i].getCollisionX();
	//	bulletArray[i].getCollisionY();
			}
		}

	}
}

function checkCityCovid(){
	for(var i = 0; i < citiesArray.length; i++){

		citiesArray[i].checkCollision();

	}
}

function moveBullets(){
	for ( var i = 0; i < bulletArray.length; i++) {
		bulletArray[i].x -= BULLET_SPEED * Math.cos(bulletArray[i].angle)// * Math.PI / 180)
    bulletArray[i].y -= BULLET_SPEED * Math.sin(bulletArray[i].angle)// * Math.PI / 180)
		bulletArray[i].draw();

		if(bulletArray[i].x < - 5 || bulletArray[i].x > ctx.canvas.width || bulletArray[i].y < - 300 || bulletArray[i].y > ctx.canvas.height)
		{
			bulletArray[i].deleteBullet();
		}
	}
}

function wait(time){
	const start = new Date();
	start_time = seconds.getTime() / 1000;

	const timer = new Date();
	current_time = seconds.getTime() / 1000;

	while(current_time - start_time < time){
		const timer = new Date();
		current_time = timer.getTime() / 1000;
	}
}

function drawScoreboard(){
	ctx.beginPath();
	ctx.rect(0, 0, 300, ctx.canvas.height);
	ctx.fillStyle = "black";
	ctx.fill();

	ctx.beginPath();
	ctx.rect(10, 10, 280, ctx.canvas.height-20);
	ctx.fillStyle = "white";
	ctx.fill();

	//var style = {font: "18px retro_gaming", fill: "#eeeeee"};
}

function drawText() {
	ctx.beginPath();
	ctx.font = "24px retro_gaming";
	ctx.fillStyle = "black";
	ctx.fillText("DEFEND AOTEAROA", 16, 35);

	ctx.beginPath();
	ctx.font = "18px retro_gaming";
	ctx.fillStyle = "black";
	ctx.fillText("Health", 14, 60);

	ctx.beginPath();
	ctx.rect(94, 45, (190 * aotearoa.health) / 100, 16);
	if(aotearoa.health > AOTEAROA_HEALTH/2){	ctx.fillStyle = "green";}
	else if (aotearoa.health > AOTEAROA_HEALTH/4) {ctx.fillStyle = "yellow";}
	else ctx.fillStyle = "red";
	ctx.fill();

	ctx.beginPath();
	ctx.font = "18px retro_gaming";
	ctx.fillStyle = "black";
	ctx.fillText("Score: " + laserkiwi.score, 14, 80);

	ctx.beginPath();
	ctx.font = "18px retro_gaming";
	ctx.fillStyle = "black";
	ctx.fillText("Covid Detroyed: " + laserkiwi.killCount, 14, 100);

	ctx.beginPath();
	ctx.font = "18px retro_gaming";
	ctx.fillStyle = "black";
	ctx.fillText("Covid Vaccinations: " + laserkiwi.vaccinations, 14, 120);

}

function createCovid(COVID_MAX_AMMOUNT){
	var count = 0;
	for(var i = 0; i < COVID_MAX_AMMOUNT; i++){
		var num = Math.random() * (10 - 0) + 0;
		var x = (250) - (count * COVID_INTERVAL);
		var y = Math.random() * (ctx.canvas.height - 0) + 0;

		if(num > 3){
			var x = ctx.canvas.width + count * COVID_INTERVAL;
			var y = Math.random() * (ctx.canvas.height - 0) + 0;
		}
		if(num > 7){
			var x = Math.random() * (ctx.canvas.width -0) + 0;
			var y = -50 - count * COVID_INTERVAL;
		}
		if(num > 8){
			var x = Math.random() * (ctx.canvas.width - 0) + 0;
			var y = ctx.canvas.height + count * COVID_INTERVAL;
		}

		//STILL NEED TO SET CITY IT IS ATTACKING
		if (COVID_MAX_AMMOUNT > 15) {
			if (Math.random() * (100 - COVID_MAX_AMMOUNT + COVID_MAX_AMMOUNT) < COVID_MAX_AMMOUNT){
				const covid = new Covid(x, y, true);
				covid.setDestination();
				covidArray.push(covid);
				count++;
			}
			else{
				const covid = new Covid(x, y, false);
				covid.setDestination();
				covidArray.push(covid);
				count++;
			}

		}
		else {
			const covid = new Covid(x, y, false);
			covid.setDestination();
			covidArray.push(covid);
			count++;
		}
	}
	max += COVID_INCREASE_AMMOUNT;
	COVID_MAX_AMMOUNT = COVID_MAX_AMMOUNT + 2;
	COVID_INTERVAL -= 5;
}

function drawCovid (){
	if(covidArray.length > 0) {
		for( var i = 0; i < covidArray.length; i++) {
			//covidArray[i].walk();
			ctx.drawImage(covidArray[i].img, covidArray[i].x, covidArray[i].y)
			if(covidArray[i].variant){
				ctx.drawImage(covidArray[i].flag.img, covidArray[i].x + covidArray[i].img.width/4 -10, covidArray[i].y + covidArray[i].img.height/2 -10)
			}
		}
	}
}

function getHealth () {

	const infectedCities = [];
	for (var i = 0; i < citiesArray.length; i++){
		if (citiesArray[i].infected){
			infectedCities.push(citiesArray[i].name);
		}
	}

	if(infectedCities.length > 0) {
		if(aotearoa.health > 0){
			aotearoa.health -= infectedCities.length / 100;
		}
	}
	else {
		if(aotearoa.health < AOTEAROA_HEALTH ){
			aotearoa.health +=1;
		}
	}
	
	if(aotearoa.health <= 0){
	    GAME_OVER = true;
	}
}

function drawMusicControls(){
	ctx.drawImage(musicController.img, musicController.x, musicController.y);
}

function drawUpdateBackground(){
	ctx.drawImage(update_background_image, 300, 0);
}

function startMessage(){
	//lert("arrow keys to move \n 'a' and 'd' keys to rotate \n space bar to shoot");
	createCovid(max);
	console.log("Wow so excited that someone is actually looking at my portflio. github.com/reecesucks Hire me. reece@reecesucks.com 022 531 0974");

}
//------------
//Key Handlers
//------------
function sendBoat(){
	if(boat.moving && boat.carryingVaccine && boat.x < aotearoa.x){
		boat.x += BOAT_SPEED;
	} else if (boat.carryingVaccine)
	{
	} else {
		if(boat.x >= 131){
			boat.x -= BOAT_SPEED;
	}
}
if(boat.x < 151 && !laserkiwi.carryingVaccine){
		boat.carryingVaccine = true;
}
}

function setVaccine(){
	if(checkCollion(laserkiwi, vaccine)){
		laserkiwi.carryingVaccine = true;
		boat.carryingVaccine = false;
	}

	if(!laserkiwi.carryingVaccine && boat.carryingVaccine){
		vaccine.setXY(boat.x + boat.img.width /2 -vaccine.img.width/2, boat.y + boat.img.height /2 -vaccine.img.height/2 - 8);
	}

	else if (laserkiwi.carryingVaccine && !boat.carryingVaccine) {
		vaccine.setXY(laserkiwi.x - vaccine.img.width/2 +30, laserkiwi.y - vaccine.img.height/2);
	}
	else {

	}
}

function gameOver(){
    if(!HIGH_SCORE_INPUT){
        
        //var txt;
        var NAME = prompt("Enter your name to record your high score");
        //if (NAME == null || NAME == "" || NAME.length > 7) {
        //txt = "User cancelled the prompt.";
        //} else {
        //txt = "Hello " + NAME + "! How are you today?";
        //}
        //document.getElementById("root").innerHTML = txt;
        if(NAME.length > 12){
            NAME = NAME.substring(0, NAME.length - (NAME.length - 12));
            console.log("short name");
        }
        HIGH_SCORE_INPUT = true;
        if(laserkiwi.score > highScoreScores[highScoreScores.length -1]){
            sendScoreToServer(NAME, laserkiwi.score);
        }
        window.setTimeout(function(){
        window.location.href = "https://reecesucks.com/laserkiwi/index.php";
    }, 3000);
    }
    console.log("gameover", NAME, laserkiwi.score);
   
}

function sendScoreToServer(name, score) {
    console.log("sending score to server", name, score);
    $.ajax({
        type: "POST",
        url: "SaveToDB.php",
        data: { "name": name, "score":score},
        dataType: 'json',
        success: function(response){
            console.log(response);
            $('#result').html('The score returned by the server is: '+response.scoreDoubled);    
        }
    });   
}


function keyMovement()
{
	if(up && (laserkiwi.y > 0 + laserkiwi.img.height/2 -7))
	{
		laserkiwi.up();
	}
	if (down && (laserkiwi.getCentreY() - 20 < ctx.canvas.height))
	{
		laserkiwi.down();
	}
	if (left && (laserkiwi.x > 299 +laserkiwi.img.height/2))
	{
		laserkiwi.left();
	}
	if (right && (laserkiwi.x < ctx.canvas.width - laserkiwi.img.height/2))
	{
		laserkiwi.right();
	}
	if (rotate_left){
		laserkiwi.rotate_left();
	}
	if (rotate_right){
		laserkiwi.rotate_right();
	}
}

function clickHander(event){
	var x = event.clientX;
	var y = event.clientY;
	if(y < musicController.img.height) {
		if(x > ctx.canvas.width - musicController.img.width && x < (ctx.canvas.width - 2 * (musicController.img.width / 3)) ){
			musicController.previous();
		}
		if(x > (ctx.canvas.width - 2 * (musicController.img.width / 3)) && x < (ctx.canvas.width - (musicController.img.width / 3)) ){
			musicController.playMusic();
		}
		if(x > ctx.canvas.width - (musicController.img.width / 3) && x < ctx.canvas.width){
			musicController.next();
		}
	}
}

function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	if (keyPressed == "&")
	{
		if(laserkiwi.y > 0)	{
			up = true;
		}
	}
	else if (keyPressed == "(")
	{
		if(laserkiwi.y < ctx.canvas.height - laserkiwi.img.height/2)	{
			down = true;
		}
	}
	else if (keyPressed == "%")
	{
		if(laserkiwi.x > 0 )
		{
			left = true;
		}
	}
	else if (keyPressed == "'")
	{
		if(laserkiwi.x < ctx.canvas.width - laserkiwi.img.width/2)
		{
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
	else if (keyPressed == "Y")
	{
		yes = true;
	}
}

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	//console.log(keyPressed);
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

var intro = false;
var seconds = new Date();
//startTimer = seconds.getTime() / 1000;


function update()
{
	//ctx.fillRect(0, 0, stage.width, stage.height);
	drawBackground();

	if(!intro && STARTING_MESSAGE) {
		//ctx.drawImage(update_background_image, 300, 0);

		var seconds = new Date();
		startTimer = seconds.getTime() / 1000;

		startMessage();
		//sound("../laserkiwi/audio/bg_music_TheBeths.mp3");
		//sound.play();
		intro = true;
	}
	//Clear Canvas
	//ctx.fillStyle = "grey";
	keyMovement();

	if(covidArray.length > 0) {
		for(var i = 0; i < covidArray.length; i++) {
			covidArray[i].walk();
		}
	}

	checkBulletCovid();
	checkCityCovid();

	seconds = new Date();
	time = seconds.getTime() / 1000;
	if(time - startTimer  > BOAT_WAIT_TIME){
		sendBoat();
		boat.moving = true
	}
	setVaccine();
	getHealth();

	if(covidArray.length == 1){
		createCovid(max);
	}
	
	if(GAME_OVER){
	    gameOver();
	}

	//console.log(STARTING_MESSAGE);
	//ctx.beginPath();
	//ctx.rect(laserkiwi.x - (Math.cos(laserkiwi.angle) * 23), laserkiwi.y - (Math.sin(laserkiwi.angle) * 23), 5, 5);
	//ctx.fillStyle = "black";
	//ctx.fill();
}
