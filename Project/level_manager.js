//===========================================================================================
// Level Manager Script. Contains the various tools for proccessing and handling each level.
//===========================================================================================

/* An initial call to updatePlayerBounds that sets four individual bounding boxes. This is
   so we can have four separate collision on each side of player. It is important to do this
   so that if we have collision on one side, we can still move in other directions. And
   these collision boxes must be updated after each player movement. */
updatePlayerBounds();

const ROOM_UI_OFFSET = 64; // Offset for room drawing to leave space for HUD elements. 
const ROWS = 11;
const COLS = 16;

var levelToLoad = 0; // Tells the build rooms function what level to load. Zero is level 1.

var tileSet = ["img/level_img/tile.png", "img/level_img/door.png"];

var tileImages = [{ tileImg: tileSet[0], x: 0  , y: 0   },  // 0 floor
				  { tileImg: tileSet[0], x: 66 , y: 0   },  // 1 black space
				  { tileImg: tileSet[0], x: 132, y: 0   },  // 2 ---
				  { tileImg: tileSet[0], x: 198, y: 0   },  // 3 ---
				  { tileImg: tileSet[0], x: 0  , y: 66  },  // 4 top wall
				  { tileImg: tileSet[0], x: 66 , y: 66  },  // 5 right wall
				  { tileImg: tileSet[0], x: 132, y: 66  },  // 6 bottom wall
				  { tileImg: tileSet[0], x: 198, y: 66  },  // 7 left wall
				  { tileImg: tileSet[0], x: 0  , y: 132 },  // 8 top right inner corner
				  { tileImg: tileSet[0], x: 66 , y: 132 },  // 9 top left inner corner
				  { tileImg: tileSet[0], x: 132, y: 132 },  // 10 bottom left inner corner
				  { tileImg: tileSet[0], x: 198, y: 132 },  // 11 bottom left inner corner
				  { tileImg: tileSet[0], x: 0  , y: 198 },  // 12 top right outer corner
				  { tileImg: tileSet[0], x: 66 , y: 198 },  // 13 top left outer corner
				  { tileImg: tileSet[0], x: 132, y: 198 },  // 14 bottom right outer corner
				  { tileImg: tileSet[0], x: 198, y: 198 }]; // 15 bottom left outer corner
				  
var door = []; //for dir 0=up, 1=right, 2=left, 3=down.  for col: 0=red, 1=yellow, 2=blue, 3=green, 4=orange, 5=violet.
door[0] = {img: tileSet[1], dir:0, idle:true, state:2, x:448, y:64, frameIndexDoor:0, draw:false, lock:false, col:0 };
door[1] = {img: tileSet[1], dir:1, idle:true, state:2, x:960, y:384, frameIndexDoor:0, draw:false, lock:false, col:1 };
door[2] = {img: tileSet[1], dir:2, idle:true, state:2, x:0, y:384, frameIndexDoor:0, draw:false, lock:false, col:2 };
door[3] = {img: tileSet[1], dir:3, idle:true, state:2, x:448, y:704, frameIndexDoor:0, draw:false, lock:false, col:3 };
//door[4] = { tileImg: tileSet[1], dir:0, idle:true, state:2, x:384, y:64, frameIndexDoor:0, draw:true, lock:false, col:4 };
//door[5] = { tileImg: tileSet[1], dir:0, idle:true, state:2, x:448, y:64, frameIndexDoor:0, draw:true, lock:false, col:5 };

var card = [];  //for col 0=red, 1=yellow, 2=blue, 3=green, 4=orange, 5=violet.
card[0] = { img:images[4], have:false, col:0 };
card[1] = { img:images[4], have:false, col:1 };
card[2] = { img:images[4], have:false, col:2 };
card[3] = { img:images[4], have:false, col:3 };
card[4] = { img:images[4], have:false, col:4 };
card[5] = { img:images[4], have:false, col:5 };

//Room creation variables
var currRoom = []; // This is the currently rendered room.
var nextRoom = []; // The room we're going into. When the map scrolls, it also has to be rendered.
var colTiles = []; // And array holding the collision tiles. Only walls and doors currently.

var rooms; // A three-dimensional array of the room maps.
var startRoom = 0; // An index for the first room drawn.
var roomScroll = false; // A flag for the update so it knows if we're in the scroll 'animation'
var scrollDir = -1; // A value for the scrolling direction. 0=up, 1=down, 2=left, 3=right
var scrollSpeed; // A value for the scrolling speed, i.e. the number of pixels the map moves per frame.
var scrollCtr = 0; // The scrolling uses a frame counter where the scroll happens over a second.
var maxScrolls = 25; // Twice the frame rate.
   
// Asset creation variables. **NOTE: Remember to update when adding or removing assets.**
var numLevelAssets = 20;
var levelAssetsLoaded = 0;

window.addEventListener("load", loadLevelAssets);


function loadLevelAssets()
{
    // Load tile assets.
	for (var i = 0; i < tileImages.length; i++)
	{
		var tempTile = new Image();
		tempTile.src = tileImages[i].tileImg;
		tempTile.addEventListener("load", onLevelAssetLoad);
		tileImages[i].tileImg = tempTile;
	}

    // Load door assets.
	for(i = 0; i < door.length; i++)
	{
	    tempTile = new Image();
	    tempTile.src = door[i].img;
	    tempTile.addEventListener("load", onLevelAssetLoad);
	    door[i].img = tempTile;
	}
}

function onLevelAssetLoad(event)
{
	if (++levelAssetsLoaded == numLevelAssets)
	{
		buildRooms();
		initGame();
	}
}


function buildRooms() 
{
	switch(levelToLoad)
	{
		case 0:
			level1();
			break;
		case 1:
			level2();
			break;
		case 2:
			level3();
			break;
		case 3:
			level4();
			break;
		case 4:
			level5();
			break;
		default:
			break;
	}
}
		
function initGame()
{
	buildRoom(currRoom, startRoom, {x:0, y:0}); // Building the first room.
}

/* roomArr is either the currRoom at the start or the nextRoom after the initial build. roomIdx is
   the element from the rooms array that we are going to build. startLoc is the starting point 
   where the room is going to be drawn on the canvas. The nextRoom is always drawn outside the canvas
   in a location one complete map size up, down, left or right.*/  
function buildRoom(roomArr, roomIdx, startLoc)
{
    console.log("Build room.");
	colTiles = []; // Resetting the colTiles array for the new room we're going into.

	for (var row = 0; row < ROWS; row++)
	{
		roomArr[row] = [];
		for (var col = 0; col < COLS; col++)
		{
			var tempTile = {};
			var tempIdx = rooms[roomIdx][row][col];
			tempTile.x = startLoc.x + col * 64; // Sets the tile position based on the starting location.
			tempTile.y = startLoc.y+row*64+ROOM_UI_OFFSET; 
			tempTile.w = tempTile.h = 64; // Need these for collision. Width and height of a tile.
			if (typeof tempIdx == 'object')
			{ // If the tile is a door object and not just an integer. 
                
			    /* Here the floor image will be set as the standard tile image object to be drawn first in the renderLevel function. 
                Then the correct door image object will be assigned based on its direction as a new separate image property of the tile object.*/
                tempTile.img = tileImages[0];
				
			    switch(tempIdx.dir)
			    {
			        case 0: // down.
			            tempTile.doorImg = door[3]; 
			            break;
			        case 1: // up.
			            tempTile.doorImg = door[0];
			            break;
			        case 2: // right.
			            tempTile.doorImg = door[1];
			            break;
			        case 3: // left.
			            tempTile.doorImg = door[2];
			            break;
			        default:
			            break;
			    }
				
				tempTile.isDoor = true;
				tempTile.doorDest = tempIdx.dest; // Start to grab and store the object properties.
				tempTile.doorScroll = tempIdx.dir;
				tempTile.doorPX = tempIdx.px;
				tempTile.doorPY = tempIdx.py;
				colTiles.push(tempTile); // Push the tile to the collidable tiles array.
			}
			else
			    tempTile.img = tileImages[tempIdx];
			
			if (tempIdx == 4 || tempIdx == 5 || tempIdx == 6 || tempIdx == 7 || tempIdx == 8 || tempIdx == 9 || tempIdx == 10 ||
                tempIdx == 11 || tempIdx == 12 || tempIdx == 13 || tempIdx == 14 || tempIdx == 15) // If it's not a door but still a collidable tile.
				colTiles.push(tempTile);
				
			roomArr[row][col] = tempTile;

            /***WARNING: These console logs are meant for debugging tile objects--the game will take a slight performance hit if they're uncommented.***/
			//console.log("Room tile row " + row + " col " + col + ":"); 
			//console.log(roomArr[row][col]);
		}
	}
}

function updateLevel()
{
    console.log("Update Level!");
	if (roomScroll == true)
		doRoomScroll(); // Do a step of the scrolling animation.
	else 
	{ // We're not scrolling so game on...
        handleInput();
        movePlayer();
        updatePlayerBounds();
        animate();
		checkCollision();
		//playerAtDoor();
	}
	renderLevel(); // Same render for both cases.
}

function doRoomScroll()
{
	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
			switch (scrollDir)
			{ // Scrolling the rooms in the appropriate direction.
				case 0:
					currRoom[row][col].y -= scrollSpeed;
					nextRoom[row][col].y -= scrollSpeed;
					break;
				case 1:
					currRoom[row][col].y += scrollSpeed;
					nextRoom[row][col].y += scrollSpeed;
					break;
				case 2:
					currRoom[row][col].x -= scrollSpeed;
					nextRoom[row][col].x -= scrollSpeed;
					break;
				case 3:
					currRoom[row][col].x += scrollSpeed;
					nextRoom[row][col].x += scrollSpeed;
					break;
			}
		}
	}
	scrollCtr++;
	if (scrollCtr == maxScrolls) // If the scroll cycle is complete. Stop!
	{
		roomScroll = false;
		currRoom = nextRoom; // Now set the new room to be the current room.
	}
}


function updatePlayerBounds()
{
	// Creating the 4 individual bounding boxes for the player...
	player.left = {l:player.x, r:player.x+6, t:player.y+8, b:player.y+player.h-8 };
	player.right = {l:player.x+player.w-6, r:player.x+player.w, t:player.y+8, b:player.y+player.h-8 };
	player.top = {l:player.x+8, r:player.x+player.w-8, t:player.y, b:player.y+6};
	player.bottom = {l:player.x+8, r:player.x+player.w-8, t:player.y+player.h-6, b:player.y+player.h };
}

function checkCollision()
{
	// Checking collision for ALL the four individual boxes against ALL created walls.
	player.colL = player.colR = player.colT = player.colB = false; // Flipping the collision flags to false.
	var doorCol = false;
	var door;
	for (var i = 0; i < colTiles.length; i++)
	{
		if (!(player.left.l > colTiles[i].x+colTiles[i].w ||
			  player.left.r < colTiles[i].x ||
			  player.left.t > colTiles[i].y+colTiles[i].h || 
			  player.left.b < colTiles[i].y))
		{
			player.x = colTiles[i].x+colTiles[i].w; // This first line will bounce the player back to just touching the wall.
			player.colL = true; // Sets the respective collision flag to true.
			if (colTiles[i].isDoor == true)
			{ // If we're colliding with a door.
				doorCol = true;
				door = colTiles[i];
				break; // I've hit a door so the break will immediately exit the for loop and prevent other unneeded checks.
			}
		}
		if (!(player.right.l > colTiles[i].x+colTiles[i].w ||
			  player.right.r < colTiles[i].x ||
			  player.right.t > colTiles[i].y+colTiles[i].h || 
			  player.right.b < colTiles[i].y))
		{
			player.x = colTiles[i].x-player.w;
			player.colR = true;
			if (colTiles[i].isDoor == true)
			{
				doorCol = true;
				door = colTiles[i];
				break;
			}
		}
		if (!(player.top.l > colTiles[i].x+colTiles[i].w ||
			  player.top.r < colTiles[i].x ||
			  player.top.t > colTiles[i].y+colTiles[i].h || 
			  player.top.b < colTiles[i].y))
		{
			player.y = colTiles[i].y+colTiles[i].h;
			player.colT = true;
			if (colTiles[i].isDoor == true)
			{
				doorCol = true;
				door = colTiles[i];
				break;
			}
		}
		if (!(player.bottom.l > colTiles[i].x+colTiles[i].w ||
			  player.bottom.r < colTiles[i].x ||
			  player.bottom.t > colTiles[i].y+colTiles[i].h || 
			  player.bottom.b < colTiles[i].y))
		{
			player.y = colTiles[i].y-player.h;
			player.colB = true;
			if (colTiles[i].isDoor == true)
			{
				doorCol = true;
				door = colTiles[i];
				break;
			}
		}
	}
	if (doorCol == true)
	{ // This initiates the room scrolling.
		scrollDir = door.doorScroll; // Sets the scroll direction global from data stored on the door tile.
		if (scrollDir < 2) // Set the appropriate scroll increment based on direction.
			scrollSpeed = 704/maxScrolls; // Account for HUD size.
		else
			scrollSpeed = 1024/maxScrolls;
		nextRoom = [];
		buildRoom(nextRoom, door.doorDest, getStartLoc(door.doorScroll));
		player.x = door.doorPX; // Sets the player's new position but the player is not rendered while scrolling.
		player.y = door.doorPY;
		scrollCtr = 0; // Initialize the scroll counter for a new scroll cycle. Important!
		roomScroll = true; // Set the flag and away we go!
	}
}

// Utility function that sets the starting loc of the new room to be created.
function getStartLoc(dir)
{ 
	var retObj = {};
	switch(dir)
	{
		case 0: retObj = {x:0, y:704}; break;
		case 1: retObj = {x:0, y:-704}; break;
		case 2: retObj = {x:1024, y:0}; break;
		case 3: retObj = {x:-1024, y:0}; break;
	}
	return retObj;
}

function renderLevel()
{
    /* This 2D array holds tile objects that are doors to be drawn after the player. 
    Doors in the current room go in row 0 while doors for the next room go in row 1. */
    var doorsToRender = [];
    doorsToRender[0] = [];
    doorsToRender[1] = [];

	for (var row = 0; row < ROWS; row++)
	{
		for (var col = 0; col < COLS; col++)
		{
		    surface.drawImage(currRoom[row][col].img.tileImg,
                              currRoom[row][col].img.x, currRoom[row][col].img.y, 64, 64,
                              currRoom[row][col].x, currRoom[row][col].y, 64, 64);

			if (roomScroll == true) // Draw the next room too if we're scrolling.
				surface.drawImage(nextRoom[row][col].img.tileImg,
								  nextRoom[row][col].img.x, nextRoom[row][col].img.y, 64, 64,
								  nextRoom[row][col].x, nextRoom[row][col].y, 64, 64);

		    /* Push the door tiles to the doorsToRender array in their respective row(current or next room), 
            and only push the next room door(s) if the rooms are scrolling. */
			if (currRoom[row][col].isDoor === true)
			    doorsToRender[0].push(currRoom[row][col]);
			if (roomScroll === true && nextRoom[row][col].isDoor === true)
			    doorsToRender[1].push(nextRoom[row][col]);
		}
	}
	if (!roomScroll) // Only draw the player if the rooms aren't scrolling.
	{
	    if(player.idle == true)
	    {
	        surface.drawImage(player.img,
                              0, player.dir * 38, 30, 38,
                              player.x, player.y, 30, 38);
	    }
	    else
	    {
	        surface.drawImage(player.img,
                              frameIndex * 30, player.dir * 38, 30, 38,
                              player.x, player.y, 30, 38);
	    }
	}

	doorRender(doorsToRender);
}

function animate()
{
	currentFrame++;
	animatePlayer();
	//animateDoor();
}

function animateDoor(doorToAnim)
{
    for (var i = 0; i < colTiles.length; i++)
    {
        if (colTiles[i].isDoor)
        {
            if (colTiles[i].doorImg.state === 1 && colTiles[i].doorImg.idle === false)
            {
                colTiles[i].doorImg.frameIndexDoor++;
                if (colTiles[i].doorImg.frameIndexDoor == 5)
                {
                    colTiles[i].doorImg.idle = true;
                }
            }
            else if (colTiles[i].doorImg.state === 2 && colTiles[i].doorImg.idle === false)
            {
                colTiles[i].doorImg.frameIndexDoor--;
                if (colTiles[i].doorImg.frameIndexDoor === 0)
                {
                    colTiles[i].doorImg.idle = true;
                }
            }
        }
    }
}

function doorRender(doorsToRender)
{	
    // Draw current room door(s).
    if (typeof doorsToRender !== "undefined")
    {
        for (var col = 0; col < doorsToRender[0].length; col++)
        {
            surface.drawImage(doorsToRender[0][col].doorImg.img,
                              doorsToRender[0][col].doorImg.frameIndexDoor * 64, 64 * doorsToRender[0][col].doorImg.dir, 64, 64,
                              doorsToRender[0][col].x, doorsToRender[0][col].y, 64, 64);
        }

        // If the room is scrolling, draw the next room door(s).
        if (roomScroll === true)
        {
            for (col = 0; col < doorsToRender[1].length; col++)
            {
                surface.drawImage(doorsToRender[1][col].doorImg.img,
                                  doorsToRender[1][col].doorImg.frameIndexDoor * 64, 64 * doorsToRender[1][col].doorImg.dir, 64, 64,
                                  doorsToRender[1][col].x, doorsToRender[1][col].y, 64, 64);
            }
        }
    }
}

/* This function uses the colTiles array to check the door tiles in relation to the player and modify the appropriate properties. It will make sure to
check if the colTiles element it is working with in the loop is a door before doing any door-related checks.*/
function playerAtDoor()
{
    for (var i = 0; i < colTiles.length; i++)
    {
        if (colTiles[i].isDoor) 
        {
            if (((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 96) && colTiles[i].dir == 0) ||
                ((player.x + player.w > colTiles[i].x - 32) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 64) && colTiles[i].dir == 1) ||
                ((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 96) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 64) && colTiles[i].dir == 2) ||
                ((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 32) && (player.y < colTiles[i].y + 64) && colTiles[i].dir == 3)) 
            {
                if (card[0].have == true && colTiles[i].doorImg.lock == true && colTiles[i].doorImg.col == 0) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (card[1].have == true && colTiles[i].doorImg.lock == true && colTiles[i].doorImg.col == 1) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (card[2].have == true && colTiles[i].doorImg.lock == true && colTiles[i].doorImg.col == 2) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (card[3].have == true && colTiles[i].doorImg.lock == true && colTiles[i].doorImg.col == 3) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (card[4].have == true && colTiles[i].doorImg.lock == true && colTiles[i].doorImg.col == 4) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (card[5].have == true && colTiles[i].doorImg.lock == true && colTiles[i].doorImg.col == 5) {
                    colTiles[i].doorImg.lock = false;
                }
            }
        }
	}
	
    for (i = 0; i < colTiles.length; i++)
    {
        if (colTiles[i].isDoor)
        {
            if (colTiles[i].doorImg.lock == false)
            {
                if (((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 96) && colTiles[i].dir == 0) ||
                ((player.x + player.w > colTiles[i].x - 64) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 64) && colTiles[i].dir == 1) ||
                ((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 96) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 64) && colTiles[i].dir == 2) ||
                ((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 64) && (player.y < colTiles[i].y + 64) && colTiles[i].dir == 3))
                {
                    if (colTiles[i].doorImg.state === 2)
                    {
                        colTiles[i].doorImg.idle = false;
                        colTiles[i].doorImg.state = 1;
                    }
                }
                else
                {
                    if (colTiles[i].doorImg.state === 1)
                    {
                        colTiles[i].doorImg.idle = false;
                        colTiles[i].doorImg.state = 2;
                    }
                }
            }
        }
    }

}