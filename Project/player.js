//============================================================
// Player Script. Proccesses and handles player-related data.
//============================================================

var CharSkin = 0;
var ItemWindow = 0;
var shiftPressed = false;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var CPressed = false;
var EPressed = false;
var FPressed = false;
var GPressed = false
var images = [new Image(), new Image()];
images[0].src = "img/player_img/Prisoner.png";
images[1].src = "img/player_img/Guard.png";

var player = {img:null, x:496, y:384, w:30, h:38, dir:0, speed:4, idle:true, // for dir 0=down, 1=up, 2=right, 3=left
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
		case 69: // E
			if (EPressed == false)
				EPressed = true;
			break;
		case 70: // F
			if (FPressed == false)
				FPressed = true;
			break
		case 71: // G
			if (GPressed == false)
				GPressed = true;
			break
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
		case 69:
			EPressed = false;
			break;
		case 70:
			FPressed = false;
			break;
		case 71:
			GPressed = false;
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
		player.speed = 8;
	else if (shiftPressed == false)
		player.speed = 4;

	itemTiles.forEach(function(el){
		if (EPressed == true && el.search == true && el.playerAt == true)
		{
			if (ItemWindow == 0)
				ItemWindow = 1;
			else if (ItemWindow == 1)
				ItemWindow = 0;
		
			EPressed = false;
		}
	})
	storage.forEach(function(el){
		if (ItemWindow == 1) {
			if (el.state === 2) {
				el.idle = false;
				el.state = 1;
				el.draw = true;
			}
		}
		else{
			if (el.state === 1) {
				el.idle = false;
				el.state = 2;
			}
		}
	})
	if (ItemWindow == 0){
		if (downPressed == true){
			player.dir = 0;
			player.idle = false;
		}
		else if (upPressed == true){
			player.dir = 1;
			player.idle = false;
		}
		else if (rightPressed == true){
			player.dir = 2;
			player.idle = false;
		}
		else if (leftPressed == true){
			player.dir = 3;
			player.idle = false;
		}
		else if (FPressed == true){
			console.log("pew");
			FPressed = false;
		}
		else if (GPressed == true){
			console.log("stab");
			GPressed = false;
		}
		else{
			player.idle = true;
		}
	}
	else if (ItemWindow == 1){
		if (downPressed == true){
			if (Icursor.slot == 0)
				Icursor.slot = 1;
			else if (Icursor.slot == 1)
				Icursor.slot = 2;
			downPressed = false;
		}
		else if (upPressed == true){
			if (Icursor.slot == 2)
				Icursor.slot = 1;
			else if (Icursor.slot == 1)
				Icursor.slot = 0;
			upPressed = false;
		}
		else if (FPressed == true){
			console.log("Equipped Primary")
			if (Icursor.slot == 0)
				equipItemP(itemEnum.indexOf("nailboard"));
			else if (Icursor.slot == 1)
				equipItemP(itemEnum.indexOf("knife"));
			else if (Icursor.slot == 2)
				equipItemP(itemEnum.indexOf("gun"));
			FPressed = false;
		}
		else if (GPressed == true){
			console.log("Equipped Secondary")
			if (Icursor.slot == 0)
				equipItemS(itemEnum.indexOf("nailboard"));
			else if (Icursor.slot == 1)
				equipItemS(itemEnum.indexOf("knife"));
			else if (Icursor.slot == 2)
				equipItemS(itemEnum.indexOf("gun"));
			GPressed = false;
		}
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
    if(ItemWindow==0)
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

	itemTiles.forEach(function(el)
    {
        el.playerAt = false; // Reset playerAt property.

		if (!(player.x > el.x + el.w || player.x + player.w < el.x || player.y > el.y + el.h || player.y + player.h < el.y))
		    el.playerAt = true;
	})
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