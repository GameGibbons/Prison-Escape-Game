//============================================================
// Player Script. Proccesses and handles player-related data.
//============================================================

var CharSkin = 0;
var shiftPressed = false;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var CPressed = false;
var images = [new Image(), new Image()];
images[0].src = "img/player_img/Prisoner.png";
images[1].src = "img/player_img/Guard.png";

var player = {img:null, x:496, y:352, w:30, h:38, dir:0, speed:4, idle:true, // for dir 0=down, 1=up, 2=right, 3=left
left:null, right:null, top:null, bottom:null, 
colL:false, colR:false, colT:false, colB:false}; 

var frameIndex = 0; 	// Index of the sprite to display via drawImage.
var currentFrame = 0; 	// Counter for the frames.
var maxFrames = 4; 		// The number of frames a single sprite is drawn.

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

function onKeyDown(event)
{
	switch(event.keyCode)
	{
		case 16: //Shift
			if (shiftPressed == false)
				shiftPressed = true;
			break;
		case 38: // Up //87
			if (upPressed == false)
				upPressed = true;
			break;
		case 40: // Down //83
			if (downPressed == false)
				downPressed = true;
			break;
		case 37: // Left //65
			if (leftPressed == false)
				leftPressed = true;
			break;
		case 39: // Right //68
			if (rightPressed == false)
				rightPressed = true;
			break;
		case 67: // C
			if (CPressed == false)
				CPressed = true;
			break;
	}
}

function onKeyUp(event)
{
	switch(event.keyCode)
	{
		case 16:
			shiftPressed = false;
			break;
		case 38:
			upPressed = false; 
			break;
		case 40:
			downPressed = false; 
			break;
		case 37:
			leftPressed = false; 
			break;
		case 39:
			rightPressed = false; 
			break;
		case 67:
			CPressed = false; 
			break;
	}
}

function handleInput()
{
	if (CharSkin == 1)
		player.img = images[1];
	else
		player.img = images[0]; 
	
	if (shiftPressed == true)
		player.speed = 10;
	else if (shiftPressed == false)
		player.speed = 4;

	if (downPressed == true)
	{
		player.dir = 0;
		player.idle = false;
	}
	else if (upPressed == true)
	{
		player.dir = 1;
		player.idle = false;
	}
	else if (rightPressed == true)
	{
		player.dir = 2;
		player.idle = false;
	}
	else if (leftPressed == true)
	{
		player.dir = 3;
		player.idle = false;
	}
	else if (CPressed == true)
	{		
		if (CharSkin == 0)
			CharSkin = 1;
		else if (CharSkin == 1)
			CharSkin = 0;
		
		CPressed = false;
	}
	else
	{
		player.idle = true;
	}
}

/* In move player, we use the collision flags to know if we can move in a certain direction
   or if movements has been stopped by a wall segment. */
function movePlayer()
{
    if (leftPressed == true && player.colL == false) // Here is where we use the collision flags.
		player.x -= player.speed; 
	if ( rightPressed == true && player.colR == false)
		player.x += player.speed;
	if ( upPressed == true && player.colT == false)
		player.y -= player.speed;
	if ( downPressed == true && player.colB == false)
		player.y += player.speed;
}

function animatePlayer()
{
	currentFrame++; 
	if (currentFrame == maxFrames)
	{
		frameIndex++;
		currentFrame = 0;
		if (frameIndex == 2)
			frameIndex = 0;
	}
}