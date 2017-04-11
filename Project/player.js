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

var activeKeycards = [false, false, false, false, false, false, false];

var player = {img:null, x:496, y:384, w:30, h:38, dir:0, speed:4, idle:true, // for dir 0=down, 1=up, 2=right, 3=left
left:null, right:null, top:null, bottom:null, 
colL:false, colR:false, colT:false, colB:false, inventory:[0, 0], itemUse:[0, 0]}; 

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
		if (EPressed == true && el.playerAt == true)
		{
			if (ItemWindow == 0)
				ItemWindow = 1;
			else if (ItemWindow == 1)
				ItemWindow = 0;
		
			EPressed = false;
		}
	})

    if (ItemWindow == 1) {
		if (storageUI.state === 2) {
			storageUI.idle = false;
			storageUI.state = 1;
			storageUI.draw = true;
		}
	}
	else{
		if (storageUI.state === 1) {
			storageUI.idle = false;
			storageUI.state = 2;
		}
	}

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
		else if (FPressed == true){ // Primary weapon used.
            // Only decrement if the itemUse is greater than zero.
            if(player.itemUse[0] > 0){player.itemUse[0]--;}

            // Set the primary inventory to zero once itemUse is depleted.
            if(player.itemUse[0] === 0) {player.inventory[0] = 0;}

			console.log("Primary use: " + player.itemUse[0]);

			FPressed = false;
		}
		else if (GPressed == true){ // Secondary weapon used.
            // Only decrement if the itemUse is greater than zero.
			if(player.itemUse[1] > 0) {player.itemUse[1]--;}

            // Set the secondary inventory to zero once itemUse is depleted. 
            if(player.itemUse[1] === 0) {player.inventory[1] = 0;}

            console.log("Secondary use: " + player.itemUse[1]);

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
            equipPrimary();
			FPressed = false;
		}
		else if (GPressed == true){
            equipSecondary();
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

		if (!(player.x > el.x + el.w || player.x + player.w < el.x || player.y > el.y + el.h || player.y + player.h < el.y)){
		    el.playerAt = true;
			currItemTile = el;
			//console.log("e is "+el.n);
		}
	})

    // Update inventory UI element.
    equipItemP(player.inventory[0]);
    equipItemS(player.inventory[1]);
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

function equipPrimary()
{
    var currPrimary = player.inventory[0];
    var currUse = player.itemUse[0];

    switch(Icursor.slot)
    {
        case 0:
            // If there isn't a keycard in the slot.
            if(currItemTile.s1 < 10 || currItemTile.s1 > 16)
            {
                // Swap item.
                player.inventory[0] = currItemTile.s1;
                currItemTile.s1 = currPrimary;

                // Swap item's use.
                player.itemUse[0] = currItemTile.use1;
                currItemTile.use1 = currUse;
            }
            // Set the keycard to true in activeKeycards and set the slot to zero.
            else
            {
                activeKeycards[currItemTile.s1 - 10] = true;
                currItemTile.s1 = 0;
            }
            break;
        case 1:
            if(currItemTile.s2 < 10 || currItemTile.s2 > 16)
            {
                player.inventory[0] = currItemTile.s2;
                currItemTile.s2 = currPrimary;

                player.itemUse[0] = currItemTile.use2;
                currItemTile.use2 = currUse;
            }
            else
            {
                activeKeycards[currItemTile.s2 - 10] = true;
                currItemTile.s2 = 0;
            }
            break;
        case 2:
            if(currItemTile.s3 < 10 || currItemTile.s3 > 16)
            {
                player.inventory[0] = currItemTile.s3;
                currItemTile.s3 = currPrimary;

                player.itemUse[0] = currItemTile.use3;
                currItemTile.use3 = currUse;
            }
            else
            {
                activeKeycards[currItemTile.s3 - 10] = true;
                currItemTile.s3 = 0;
            }
            break;
    }
    // Set the storage object in the item tracking array to the current storage objects slot & use values.
    itemTracking[currItemTile.trackIdx].s1 = currItemTile.s1;
    itemTracking[currItemTile.trackIdx].s2 = currItemTile.s2;
    itemTracking[currItemTile.trackIdx].s3 = currItemTile.s3;
    itemTracking[currItemTile.trackIdx].use1 = currItemTile.use1;
    itemTracking[currItemTile.trackIdx].use2 = currItemTile.use2;
    itemTracking[currItemTile.trackIdx].use3 = currItemTile.use3;

    console.log("Current item tile use: " + currItemTile.use1 + " " + currItemTile.use2 + " " + currItemTile.use3);
}

function equipSecondary(itemToEquip)
{
    var currSecondary = player.inventory[1];
    var currUse = player.itemUse[1];

    switch(Icursor.slot)
    {
        case 0:
            // If there isn't a keycard in the slot.
            if(currItemTile.s1 < 10 || currItemTile.s1 > 16)
            {
                // Swap item.
                player.inventory[1] = currItemTile.s1;
                currItemTile.s1 = currSecondary;

                // Swap item use.
                player.itemUse[1] = currItemTile.use1;
                currItemTile.use1 = currUse;
            }
            // Set the keycard to true in activeKeycards and set the slot to zero.
            else 
            {
                activeKeycards[currItemTile.s1 - 10] = true;
                currItemTile.s1 = 0;
            }
            break;
        case 1:
            if(currItemTile.s2 < 10 || currItemTile.s2 > 16)
            {
                player.inventory[1] = currItemTile.s2;
                currItemTile.s2 = currSecondary;

                player.itemUse[1] = currItemTile.use2;
                currItemTile.use2 = currUse;
            }
            else
            {
                activeKeycards[currItemTile.s2 - 10] = true;
                currItemTile.s2 = 0;
            }
            break;
        case 2:
            if(currItemTile.s3 < 10 || currItemTile.s3 > 16)
            {
                player.inventory[1] = currItemTile.s3;
                currItemTile.s3 = currSecondary;

                player.itemUse[1] = currItemTile.use3;
                currItemTile.use3 = currUse;
            }
            else
            {
                activeKeycards[currItemTile.s3 - 10] = true;
                currItemTile.s3 = 0;
            }
            break;
    }
    // Set the storage object in the item tracking array to the current storage objects slot & use values.
    itemTracking[currItemTile.trackIdx].s1 = currItemTile.s1;
    itemTracking[currItemTile.trackIdx].s2 = currItemTile.s2;
    itemTracking[currItemTile.trackIdx].s3 = currItemTile.s3;
    itemTracking[currItemTile.trackIdx].use1 = currItemTile.use1;
    itemTracking[currItemTile.trackIdx].use2 = currItemTile.use2;
    itemTracking[currItemTile.trackIdx].use3 = currItemTile.use3;

    console.log("Current item tile use: " + currItemTile.use1 + " " + currItemTile.use2 + " " + currItemTile.use3);
}

