//------------
//System Values
//------------
var STAGE_WIDTH = 600,
	STAGE_HEIGHT = 400,
	TIME_PER_FRAME = 33, //this equates to 30 fps
	GAME_FONTS = "bold 20px sans-serif";

var PATH_CHAR = "img/laserkiwi.png";
var PATH_AOTEAROA = "img/NZpixel.png"

var	AOTEAROA_HEALTH = 100,
 	AOTEAROA_X = 50,
	AOTEAROA_Y = 50,
	LASERKIWI_SPEED = 3,
	LASERKIWI_ROTATESPEED = .1;
	BULLET_SPEED = 6,
	COVID_SPEED = 1;
	SMALL_COVID_POINTS = 13,
	VARIANT_COVID_POINTS = 23
	VACCINATION_POINTS = 29,
	//COVID_MAX_AMMOUNT = 5,
	COVID_INCREASE_AMMOUNT = 2;
	COVID_INTERVAL = 100,
	BOAT_SPEED = 1;
	BOAT_WAIT_TIME = 10;
	CHAR_WIDTH = 72,
	CHAR_HEIGHT = 96,
	CHAR_START_X = 200,
	CHAR_START_Y = 200,
	CHAR_SPEED = 1,
	IMAGE_START_X = 0,
	IMAGE_START_NORTH_Y = 0,
	IMAGE_START_EAST_Y = 96,
	IMAGE_START_SOUTH_Y = 192,
	IMAGE_START_WEST_Y = 288,
	SPRITE_WIDTH = 216;

var TEXT_PRELOADING = "Loading ...",
	TEXT_PRELOADING_X = 200,
	TEXT_PRELOADING_Y = 200;

const RETRO_FONT = new FontFace('retro_gaming', 'url(/laserkiwi/assets/fonts/RetroGaming.ttf)');
RETRO_FONT.load().then(function(loadedFont) {
    document.fonts.add(loadedFont)
    text.style.fontFamily = '"retro_gaming"';
}).catch(function(error) {
    //console.log('Failed to load font: ' + error)
})
