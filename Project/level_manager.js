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

var tileSet = ["img/level_img/tile0.png", "img/level_img/tile1.png", "img/level_img/door0.png", "img/level_img/door1.png", "img/level_img/door2.png"];

var tileImages = [{ tileImg: tileSet[0], x: 0  , y: 0  },  // 00 floor
				  { tileImg: tileSet[0], x: 64 , y: 0  },  // 01 black space
				  { tileImg: tileSet[0], x: 128, y: 0  },  // 02 ---
				  { tileImg: tileSet[0], x: 192, y: 0  },  // 03 ---
				  { tileImg: tileSet[0], x: 256, y: 0  },  // 04 top wall
				  { tileImg: tileSet[0], x: 320, y: 0  },  // 05 right wall
				  { tileImg: tileSet[0], x: 384, y: 0  },  // 06 bottom wall
				  { tileImg: tileSet[0], x: 448, y: 0  },  // 07 left wall
				  { tileImg: tileSet[0], x: 0  , y: 64 },  // 08 top right inner corner
				  { tileImg: tileSet[0], x: 64 , y: 64 },  // 09 top left inner corner
				  { tileImg: tileSet[0], x: 128, y: 64 },  // 10 bottom left inner corner
				  { tileImg: tileSet[0], x: 192, y: 64 },  // 11 bottom right inner corner
				  { tileImg: tileSet[0], x: 256, y: 64 },  // 12 top right outer corner
				  { tileImg: tileSet[0], x: 320, y: 64 },  // 13 top left outer corner
				  { tileImg: tileSet[0], x: 384, y: 64 },  // 14 top right outer corner
				  { tileImg: tileSet[0], x: 448, y: 64 },  // 15 top left outer corner				  
				  { tileImg: tileSet[0], x: 0  , y: 128},  // 16 locker against wall top (up)
				  { tileImg: tileSet[0], x: 64 , y: 128},  // 17 locker against wall bottom (up)
				  { tileImg: tileSet[0], x: 128, y: 128},  // 18 locker against wall top (left)
				  { tileImg: tileSet[0], x: 192, y: 128},  // 19 locker against wall bottom (left)
				  { tileImg: tileSet[0], x: 256, y: 128},  // 20 locker against wall top (right)
				  { tileImg: tileSet[0], x: 320, y: 128},  // 21 locker against wall bottom (right)
				  { tileImg: tileSet[0], x: 384, y: 128},  // 22 locker against wall top (down)
				  { tileImg: tileSet[0], x: 448, y: 128},  // 23 locker against wall bottom (down)
				  { tileImg: tileSet[0], x: 0  , y: 192},  // 24 file shelf against wall top (up)
				  { tileImg: tileSet[0], x: 64 , y: 192},  // 25 file shelf against wall bottom (up)
				  { tileImg: tileSet[0], x: 128, y: 192},  // 26 file shelf against wall top (left)
				  { tileImg: tileSet[0], x: 192, y: 192},  // 27 file shelf against wall bottom (left)
				  { tileImg: tileSet[0], x: 256, y: 192},  // 28 file shelf against wall top (right)
				  { tileImg: tileSet[0], x: 320, y: 192},  // 29 file shelf against wall bottom (right)
				  { tileImg: tileSet[0], x: 384, y: 192},  // 30 file shelf against wall top (down)
				  { tileImg: tileSet[0], x: 448, y: 192},  // 31 file shelf against wall bottom (down)				  
				  { tileImg: tileSet[0], x: 0  , y: 256},  // 32 server tower against wall top (up)
				  { tileImg: tileSet[0], x: 64 , y: 256},  // 33 server tower against wall bottom (up)
				  { tileImg: tileSet[0], x: 128, y: 256},  // 34 server tower against wall top (left)
				  { tileImg: tileSet[0], x: 192, y: 256},  // 35 server tower against wall bottom (left)
				  { tileImg: tileSet[0], x: 256, y: 256},  // 36 server tower against wall top (right)
				  { tileImg: tileSet[0], x: 320, y: 256},  // 37 server tower against wall bottom (right)
				  { tileImg: tileSet[0], x: 384, y: 256},  // 38 server tower against wall top (down)
				  { tileImg: tileSet[0], x: 448, y: 256},  // 39 server tower against wall bottom (down)
				  { tileImg: tileSet[0], x: 0  , y: 320},  // 40 tape storage against wall top (up)
				  { tileImg: tileSet[0], x: 64 , y: 320},  // 41 tape storage against wall bottom (up)
				  { tileImg: tileSet[0], x: 128, y: 320},  // 42 tape storage against wall top (left)
				  { tileImg: tileSet[0], x: 192, y: 320},  // 43 tape storage against wall bottom (left)
				  { tileImg: tileSet[0], x: 256, y: 320},  // 44 tape storage against wall top (right)
				  { tileImg: tileSet[0], x: 320, y: 320},  // 45 tape storage against wall bottom (right)
				  { tileImg: tileSet[0], x: 384, y: 320},  // 46 tape storage against wall top (down)
				  { tileImg: tileSet[0], x: 448, y: 320},  // 47 tape storage against wall botom (down)				  
				  { tileImg: tileSet[0], x: 0  , y: 384},  // 48 top left desk1 (up)
				  { tileImg: tileSet[0], x: 64 , y: 384},  // 49 top right desk1 (up)
				  { tileImg: tileSet[0], x: 128, y: 384},  // 50 bottom left desk1 (up)
				  { tileImg: tileSet[0], x: 192, y: 384},  // 51 bottom right desk1 (up)
				  { tileImg: tileSet[0], x: 256, y: 384},  // 52 desk with chairs (right)
				  { tileImg: tileSet[0], x: 320, y: 384},  // 53 desk with chairs (left)
				  { tileImg: tileSet[0], x: 384, y: 384},  // 54 trolley with boxes
				  { tileImg: tileSet[0], x: 448, y: 384},  // 55 desk with chairs (up)
				  { tileImg: tileSet[0], x: 0  , y: 448},  // 56 vending machines top (up)
				  { tileImg: tileSet[0], x: 64 , y: 448},  // 57 vending machines bottom (up)
				  { tileImg: tileSet[0], x: 128, y: 448},  // 58 tape storage
				  { tileImg: tileSet[0], x: 192, y: 448},  // 59 server tower
				  { tileImg: tileSet[0], x: 256, y: 448},  // 60 locker
				  { tileImg: tileSet[0], x: 320, y: 448},  // 61 power grid
				  { tileImg: tileSet[0], x: 384, y: 448},  // 62 sacks
				  { tileImg: tileSet[0], x: 448, y: 448},  // 63 trolley with files				  
				  { tileImg: tileSet[0], x: 0  , y: 512},  // 64 washing machine top (up)
				  { tileImg: tileSet[0], x: 64 , y: 512},  // 65 washing machine bottom (up)
				  { tileImg: tileSet[0], x: 128, y: 512},  // 66 dryer machine top (up)
				  { tileImg: tileSet[0], x: 192, y: 512},  // 67 dryer machine bottom (up)
				  { tileImg: tileSet[0], x: 256, y: 512},  // 68 laundry trolley
				  { tileImg: tileSet[0], x: 320, y: 512},  // 69 trolley with clean bedsheets
				  { tileImg: tileSet[0], x: 384, y: 512},  // 70 urinal top (up)
				  { tileImg: tileSet[0], x: 448, y: 512},  // 71 urinal bottom (up)
				  { tileImg: tileSet[0], x: 0  , y: 576},  // 72 bathroom stall open top (up)
				  { tileImg: tileSet[0], x: 64 , y: 576},  // 73 bathroom stall open bottom (up)
				  { tileImg: tileSet[0], x: 128, y: 576},  // 74 bathroom stall closed top (up)
				  { tileImg: tileSet[0], x: 192, y: 576},  // 75 bathroom stall closed bottom (up)
				  { tileImg: tileSet[0], x: 256, y: 576},  // 76 top left bathroom sinks (up)
				  { tileImg: tileSet[0], x: 320, y: 576},  // 77 top right bathroom sinks (up)
				  { tileImg: tileSet[0], x: 384, y: 576},  // 78 bottom left bathroom sinks (up)
				  { tileImg: tileSet[0], x: 448, y: 576},  // 79 bottom right bathroom sinks (up)				  
				  { tileImg: tileSet[0], x: 0  , y: 640},  // 80 ---
				  { tileImg: tileSet[0], x: 64 , y: 640},  // 81 ---
				  { tileImg: tileSet[0], x: 128, y: 640},  // 82 ---
				  { tileImg: tileSet[0], x: 192, y: 640},  // 83 ---
				  { tileImg: tileSet[0], x: 256, y: 640},  // 84 ---
				  { tileImg: tileSet[0], x: 320, y: 640},  // 85 ---
				  { tileImg: tileSet[0], x: 384, y: 640},  // 86 ---
				  { tileImg: tileSet[0], x: 448, y: 640},  // 87 ---
				  { tileImg: tileSet[0], x: 0  , y: 704},  // 88 ---
				  { tileImg: tileSet[0], x: 64 , y: 704},  // 89 ---
				  { tileImg: tileSet[0], x: 128, y: 704},  // 90 ---
				  { tileImg: tileSet[0], x: 192, y: 704},  // 91 ---
				  { tileImg: tileSet[0], x: 256, y: 704},  // 92 ---
				  { tileImg: tileSet[0], x: 320, y: 704},  // 93 ---
				  { tileImg: tileSet[0], x: 384, y: 704},  // 94 ---
				  { tileImg: tileSet[0], x: 448, y: 704},  // 95 ---
				  
				  { tileImg: tileSet[1], x: 0  , y: 0  },  // 96 top left cell (up)
				  { tileImg: tileSet[1], x: 64 , y: 0  },  // 97 top right cell (up)
				  { tileImg: tileSet[1], x: 128, y: 0  },  // 98 bottom left cell (up)
				  { tileImg: tileSet[1], x: 192, y: 0  },  // 99 bottom right cell (up)
				  { tileImg: tileSet[1], x: 0  , y: 64 },  // 100 top left cell (left)
				  { tileImg: tileSet[1], x: 64 , y: 64 },  // 101 top right cell (left)
				  { tileImg: tileSet[1], x: 128, y: 64 },  // 102 bottom left cell (left)
				  { tileImg: tileSet[1], x: 192, y: 64 },  // 103 bottom right cell (left)
				  { tileImg: tileSet[1], x: 0  , y: 128},  // 104 top left cell (right)
				  { tileImg: tileSet[1], x: 64 , y: 128},  // 105 top right cell (right)
				  { tileImg: tileSet[1], x: 128, y: 128},  // 106 bottom left cell (right)
				  { tileImg: tileSet[1], x: 192, y: 128},  // 107 bottom right cell (right)
				  { tileImg: tileSet[1], x: 0  , y: 192},  // 108 top left cell (down)
				  { tileImg: tileSet[1], x: 64 , y: 192},  // 109 top right cell (down)
				  { tileImg: tileSet[1], x: 128, y: 192},  // 110 bottom left cell (down)
				  { tileImg: tileSet[1], x: 192, y: 192},  // 111 bottom right cell (down)				  
				  { tileImg: tileSet[1], x: 0  , y: 256},  // 112 top left security desk (up)
				  { tileImg: tileSet[1], x: 64 , y: 256},  // 113 top center security desk (up)
				  { tileImg: tileSet[1], x: 128, y: 256},  // 114 top right security desk (up)
				  { tileImg: tileSet[1], x: 192, y: 256},  // 115 security alarm (up)
				  { tileImg: tileSet[1], x: 0  , y: 320},  // 116 bottom left security desk (up)
				  { tileImg: tileSet[1], x: 64 , y: 320},  // 117 bottom center security desk (up)
				  { tileImg: tileSet[1], x: 128, y: 320},  // 118 bottom right security desk (up)
				  { tileImg: tileSet[1], x: 192, y: 320},  // 119 ---
				  { tileImg: tileSet[1], x: 0  , y: 384},  // 120 ---
				  { tileImg: tileSet[1], x: 64 , y: 384},  // 121 ---
				  { tileImg: tileSet[1], x: 128, y: 384},  // 122 ---
				  { tileImg: tileSet[1], x: 192, y: 384},  // 123 ---
				  { tileImg: tileSet[1], x: 0  , y: 448},  // 124 ---
				  { tileImg: tileSet[1], x: 64 , y: 448},  // 125 ---
				  { tileImg: tileSet[1], x: 128, y: 448},  // 126 ---
				  { tileImg: tileSet[1], x: 192, y: 448}]; // 127 ---
				  
var door = []; //for dir 0=up, 1=right, 2=left, 3=down.  for col: 0=red, 1=yellow, 2=blue, 3=green, 4=orange, 5=violet.
door[0] = { img: tileSet[2], dir:0, idle:true, state:2, frameIndexDoor:0, lock:false };
door[1] = { img: tileSet[2], dir:1, idle:true, state:2, frameIndexDoor:0, lock:false };
door[2] = { img: tileSet[2], dir:2, idle:true, state:2, frameIndexDoor:0, lock:false };
door[3] = { img: tileSet[2], dir:3, idle:true, state:2, frameIndexDoor:0, lock:false };

door[4] = { img: tileSet[2], dir:1, idle:true, state:2, frameIndexDoor:0, lock:true };
door[5] = { img: tileSet[2], dir:0, idle:true, state:2, frameIndexDoor:0, lock:true };
door[6] = { img: tileSet[2], dir:1, idle:true, state:2, frameIndexDoor:0, lock:true };
door[7] = { img: tileSet[2], dir:0, idle:true, state:2, frameIndexDoor:0, lock:true };

door[8] = { img: tileSet[3], dir:0, idle:true, state:2, frameIndexDoor:0, lock:false };
door[9] = { img: tileSet[3], dir:1, idle:true, state:2, frameIndexDoor:0, lock:false };
door[10] = { img: tileSet[3], dir:2, idle:true, state:2, frameIndexDoor:0, lock:false };
door[11] = { img: tileSet[3], dir:3, idle:true, state:2, frameIndexDoor:0, lock:false };

door[12] = { img: tileSet[4], dir:0, idle:true, state:2, frameIndexDoor:0, lock:false };
door[13] = { img: tileSet[4], dir:1, idle:true, state:2, frameIndexDoor:0, lock:false };
door[14] = { img: tileSet[4], dir:2, idle:true, state:2, frameIndexDoor:0, lock:false };
door[15] = { img: tileSet[4], dir:3, idle:true, state:2, frameIndexDoor:0, lock:false };
door[16] = { img: tileSet[4], dir:0, idle:true, state:2, frameIndexDoor:0, lock:false };
door[17] = { img: tileSet[4], dir:3, idle:true, state:2, frameIndexDoor:0, lock:false };

var currItemTile; // Used to reference a storage tile that the player is near for item management and UI.

//Room creation variables
var currRoom = []; // This is the currently rendered room.
var nextRoom = []; // The room we're going into. When the map scrolls, it also has to be rendered.
var colTiles = []; // An array holding the collision tiles. Only walls and doors currently.

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
    activeEnemies = []; // Resetting the activeEnemies array for the new room.
    activeWP = []; // Resetting the activeWP array for the new room.
    losTiles = [];
    itemTracking = [];
    var itemTrackIdx = 0; // The index of the item tile in the item tracking array.

	for (var row = 0; row < ROWS; row++)
	{
		roomArr[row] = [];
		for (var col = 0; col < COLS; col++)
		{
			var tempTile = {};
			var tempIdx = rooms[roomIdx][row][col];
			tempTile.x = startLoc.x + col * 64; // Sets the tile position based on the starting location.
			tempTile.y = startLoc.y + row * 64 + ROOM_UI_OFFSET; 
			tempTile.w = tempTile.h = 64;
            tempTile.collider = {x:tempTile.x, y:tempTile.y, w:tempTile.w, h:tempTile.h}; // Customizable collider object for tile collisions.

			if (typeof tempIdx === 'object') 
            { // If the tile is a door object and not just an integer. 

			    switch (tempIdx.ID) 
                {
			        case "dr": // Door.
			            tempTile.img = tileImages[0];

			            if (typeof tempIdx.d !== "undefined") 
                        {
			                switch (tempIdx.d) 
                            {
			                    case 4:
			                        tempTile.doorImg = door[4];
			                        break;
			                    case 5:
			                        tempTile.doorImg = door[5];
			                        break;
			                    case 6:
			                        tempTile.doorImg = door[6];
			                        break;
			                    case 7:
			                        tempTile.doorImg = door[7];
			                        break;
			                    case 8:
			                        tempTile.doorImg = door[8];
			                        break;
			                    case 9:
			                        tempTile.doorImg = door[9];
			                        break;
			                    case 10:
			                        tempTile.doorImg = door[10];
			                        break;
			                    case 11:
			                        tempTile.doorImg = door[11];
			                        break;
			                    case 12:
			                        tempTile.doorImg = door[12];
			                        break;
			                    case 13:
			                        tempTile.doorImg = door[13];
			                        break;
			                    case 14:
			                        tempTile.doorImg = door[14];
			                        break;
			                    case 15:
			                        tempTile.doorImg = door[15];
									break;
								case 16:
			                        tempTile.doorImg = door[16];
									break;
								case 17:
			                        tempTile.doorImg = door[17];
									break;
                                default:
                                    console.log("Door type not recognized.");
                                    break;
			                }
			            }
			            else 
                        {
			                switch (tempIdx.dir) 
                            {
			                    case 0: // Down.
			                        tempTile.doorImg = door[3];
			                        break;
			                    case 1: // Up.
			                        tempTile.doorImg = door[0];
			                        break;
			                    case 2: // Right.
			                        tempTile.doorImg = door[1];
			                        break;
			                    case 3: // Left.
			                        tempTile.doorImg = door[2];
                                    break;
			                }
			            }

			            tempTile.isDoor = true;
			            tempTile.doorDest = tempIdx.dest;
			            tempTile.doorScroll = tempIdx.dir;
			            tempTile.doorPX = tempIdx.px;
			            tempTile.doorPY = tempIdx.py;
			            tempTile.doorCol = tempIdx.col;
			            colTiles.push(tempTile);
			            break;
			        case "enmy": // Enemy.
			            tempTile.img = tileImages[0];

			            var enemy = {
			                img: enemyImg, x: tempTile.x, y: tempTile.y, w: ENEMY_WIDTH, h: ENEMY_HEIGHT,
			                speed: ENEMY_DEFAULT_SPEED, dx: 0, dy: 0, currWP: tempIdx.currWP, range: ENEMY_RANGE, firing: false, fireCtr: 0,
			                frameCtr: 0, frameIdx: 0, maxFrames: 4, waypoint: tempIdx.wpIdx, dir: 0, spottedPlyr: false, lastSpotted: null,
                            isStunned: false, isDead: false, isEnemy: true, linecast: null, collider: {x:this.x, y:this.y, w:ENEMY_WIDTH, h:ENEMY_HEIGHT}
			            };

			            activeEnemies.push(enemy);
                        colTiles.push(enemy);
			            break;
			        case "wp": // Waypoint.
			            tempTile.img = tileImages[0];

			            var tempWP = { x: tempTile.x, y: tempTile.y, order: tempIdx.order };

			            if (tempIdx.wpIdx + 1 > activeWP.length) 
                        {
			                for (var i = 0; i <= tempIdx.wpIdx; i++) 
                            {
			                    if (typeof activeWP[i] !== 'object')
			                        activeWP[i] = [];
			                }
			                activeWP[tempIdx.wpIdx].push(tempWP);
			            }
			            else
			                activeWP[tempIdx.wpIdx].push(tempWP);
			            break;
					case "st": // Storage.
						setIntTiles(tempIdx.t, tempTile);
						tempTile.s1 = tempIdx.s1;
						tempTile.s2 = tempIdx.s2;
						tempTile.s3 = tempIdx.s3;

                        /* Create and initialize the use properties of the tile in the rooms array, if that hasn't been done already, to the corresponding item in the item array. 
                        Then set the current tile's use properties with that. */
                        if(typeof tempIdx.use1 === 'undefined' && typeof tempIdx.use2 === 'undefined' && typeof tempIdx.use3 === 'undefined')
                        {
                            tempTile.use1 = rooms[roomIdx][row][col].use1 = item[tempIdx.s1].use;
                            tempTile.use2 = rooms[roomIdx][row][col].use2 = item[tempIdx.s2].use;
                            tempTile.use3 = rooms[roomIdx][row][col].use3 = item[tempIdx.s3].use;
                        }
                        else
                        {
                            // Set this tile's use properties to the use properties of the tile in the rooms array.
                            tempTile.use1 = tempIdx.use1;
                            tempTile.use2 = tempIdx.use2;
                            tempTile.use3 = tempIdx.use3;
                        }

                        // Give the tile an index property and push the current tile in the rooms array to the item tracking array.
                        tempTile.trackIdx = itemTrackIdx;
                        itemTrackIdx++;
                        itemTracking.push(rooms[roomIdx][row][col]);

                        console.log("Tile item use: " + rooms[roomIdx][row][col].use1 + " " + rooms[roomIdx][row][col].use2 + " " + rooms[roomIdx][row][col].use3);
                        break;
			        default:
			            console.log("Rooms tile object is not recognized. Did you assign the correct ID?");
			            break;
			    }

			}
            else
            {
                setIntTiles(tempIdx, tempTile);
            }

			if (tempIdx !== 0 && tempIdx !== 1 && tempIdx !== 8 && tempIdx !== 9 && tempIdx !== 10 && tempIdx !== 11 && tempIdx.ID !== 'wp' && tempIdx.ID !== 'enmy')
            {
			    colTiles.push(tempTile);
                losTiles.push(tempTile);
			}
            
			roomArr[row][col] = tempTile;

            /***WARNING: These console logs are meant for debugging tile objects--the game will take a slight performance hit if they're uncommented.***/
			//console.log("Room tile row " + row + " col " + col + ":"); 
			//console.log(roomArr[row][col]);
		}
	}
	setEnemyWaypoints(); // Begin setting each enemy with the waypoints that were collected from the level1 function.
}

function updateLevel()
{
    //console.log("Update Level!");
    if (roomScroll == true) {
        doRoomScroll(); // Do a step of the scrolling animation.
        updateEnemies(scrollDir, scrollSpeed); // Update enemy and waypoint positions.
    }
    else { // We're not scrolling so game on...
        handleInput();
        movePlayer();
        updatePlayerBounds();
        moveEnemies();
        animate();
        checkCollision();
        playerAtDoor();
    }
	renderLevel(); // Same render for both cases.
    renderHUD();
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
                    currRoom[row][col].collider.y -= scrollSpeed;
                    nextRoom[row][col].collider.y -= scrollSpeed;
					break;
				case 1:
					currRoom[row][col].y += scrollSpeed;
					nextRoom[row][col].y += scrollSpeed;
                    currRoom[row][col].collider.y += scrollSpeed;
                    nextRoom[row][col].collider.y += scrollSpeed;
					break;
				case 2:
					currRoom[row][col].x -= scrollSpeed;
					nextRoom[row][col].x -= scrollSpeed;
                    currRoom[row][col].collider.x -= scrollSpeed;
                    nextRoom[row][col].collider.x -= scrollSpeed;
					break;
				case 3:
					currRoom[row][col].x += scrollSpeed;
					nextRoom[row][col].x += scrollSpeed;
                    currRoom[row][col].collider.x += scrollSpeed;
                    nextRoom[row][col].collider.x += scrollSpeed;
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
		if (!(player.left.l > colTiles[i].collider.x+colTiles[i].collider.w ||
			  player.left.r < colTiles[i].collider.x ||
			  player.left.t > colTiles[i].collider.y+colTiles[i].collider.h || 
			  player.left.b < colTiles[i].collider.y))
		{
			player.x = colTiles[i].collider.x + colTiles[i].collider.w; // This first line will bounce the player back to just touching the wall.
			player.colL = true; // Sets the respective collision flag to true.
			if (colTiles[i].isDoor == true && colTiles[i].doorImg.lock === false)
			{ // If we're colliding with a door.
				doorCol = true;
				door = colTiles[i];
				break; // I've hit a door so the break will immediately exit the for loop and prevent other unneeded checks.
			}
		}
		if (!(player.right.l > colTiles[i].collider.x+colTiles[i].collider.w ||
			  player.right.r < colTiles[i].collider.x ||
			  player.right.t > colTiles[i].collider.y+colTiles[i].collider.h || 
			  player.right.b < colTiles[i].collider.y))
		{
			player.x = colTiles[i].collider.x - player.w;
			player.colR = true;
			if (colTiles[i].isDoor == true && colTiles[i].doorImg.lock === false)
			{
				doorCol = true;
				door = colTiles[i];
				break;
			}
		}
		if (!(player.top.l > colTiles[i].collider.x+colTiles[i].collider.w ||
			  player.top.r < colTiles[i].collider.x ||
			  player.top.t > colTiles[i].collider.y+colTiles[i].collider.h || 
			  player.top.b < colTiles[i].collider.y))
		{
			player.y = colTiles[i].collider.y + colTiles[i].collider.h;
			player.colT = true;
			if (colTiles[i].isDoor == true && colTiles[i].doorImg.lock === false)
			{
				doorCol = true;
				door = colTiles[i];
				break;
			}
		}
		if (!(player.bottom.l > colTiles[i].collider.x+colTiles[i].collider.w ||
			  player.bottom.r < colTiles[i].collider.x ||
			  player.bottom.t > colTiles[i].collider.y+colTiles[i].collider.h || 
			  player.bottom.b < colTiles[i].collider.y))
		{
			player.y = colTiles[i].collider.y - player.h;
			player.colB = true;
			if (colTiles[i].isDoor == true && colTiles[i].doorImg.lock === false)
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

	    renderEnemies();
	}

	doorRender(doorsToRender);
}

function animate()
{
	currentFrame++;
	animatePlayer();
	animateDoor();
	animateEnemies();
	animateStorageUI();
}

function animateDoor()
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
				if (doorsToRender[0][col].doorImg.lock == true)
				{
					surface.drawImage(doorsToRender[0][col].doorImg.img,
									  doorsToRender[0][col].doorImg.dir * 64, 256, 64, 64,
									  doorsToRender[0][col].x, doorsToRender[0][col].y, 64, 64);
		
					if (doorsToRender[0][col].doorImg.lock == true && doorsToRender[0][col].doorImg.dir == 0){
						surface.drawImage(doorsToRender[0][col].doorImg.img,
										  doorsToRender[0][col].doorCol * 16 + 258 , 258, 16, 16,
										  doorsToRender[0][col].x + 24, doorsToRender[0][col].y + 40, 16, 16)
					}
					else if (doorsToRender[0][col].doorImg.lock == true && doorsToRender[0][col].doorImg.dir == 1){
						surface.drawImage(doorsToRender[0][col].doorImg.img,
										  doorsToRender[0][col].doorCol * 16 + 258 , 258, 16, 16,
										  doorsToRender[0][col].x + 8, doorsToRender[0][col].y + 24, 16, 16)
					}
					else if (doorsToRender[0][col].doorImg.lock == true && doorsToRender[0][col].doorImg.dir == 2){
						surface.drawImage(doorsToRender[0][col].doorImg.img,
										  doorsToRender[0][col].doorCol * 16 + 258 , 258, 16, 16,
										  doorsToRender[0][col].x + 40, doorsToRender[0][col].y + 24, 16, 16)
					}
					else if (doorsToRender[0][col].doorImg.lock == true && doorsToRender[0][col].doorImg.dir == 3){
						surface.drawImage(doorsToRender[0][col].doorImg.img,
										  doorsToRender[0][col].doorCol * 16 + 258 , 258, 16, 16,
										  doorsToRender[0][col].x + 24, doorsToRender[0][col].y + 8, 16, 16)
					}
				}
				else
				{
					surface.drawImage(doorsToRender[0][col].doorImg.img,
									  doorsToRender[0][col].doorImg.frameIndexDoor * 64, 64 * doorsToRender[0][col].doorImg.dir, 64, 64,
									  doorsToRender[0][col].x, doorsToRender[0][col].y, 64, 64);
				}
			}

        // If the room is scrolling, draw the next room door(s).
        if (roomScroll === true)
        {
            for (col = 0; col < doorsToRender[1].length; col++)
            {
				if (doorsToRender[1][col].doorImg.lock == true)
				{
					surface.drawImage(doorsToRender[1][col].doorImg.img,
									  doorsToRender[1][col].doorImg.dir * 64, 256, 64, 64,
									  doorsToRender[1][col].x, doorsToRender[1][col].y, 64, 64);
		
					if (doorsToRender[1][col].doorImg.lock == true && doorsToRender[1][col].doorImg.dir == 0){
						surface.drawImage(doorsToRender[1][col].doorImg.img,
										  doorsToRender[1][col].doorCol * 16 + 258 , 258, 16, 16,
										  doorsToRender[1][col].x + 24, doorsToRender[1][col].y + 40, 16, 16)
					}
					else if (doorsToRender[1][col].doorImg.lock == true && doorsToRender[1][col].doorImg.dir == 1){
						surface.drawImage(doorsToRender[1][col].doorImg.img,
										  doorsToRender[1][col].doorCol * 16 + 258 , 258, 16, 16,
										  doorsToRender[1][col].x + 8, doorsToRender[1][col].y + 24, 16, 16)
					}
					else if (doorsToRender[1][col].doorImg.lock == true && doorsToRender[1][col].doorImg.dir == 2){
						surface.drawImage(doorsToRender[1][col].doorImg.img,
										  doorsToRender[1][col].doorCol * 16 + 258 , 258, 16, 16,
										  doorsToRender[1][col].x + 40, doorsToRender[1][col].y + 24, 16, 16)
					}
					else if (doorsToRender[1][col].doorImg.lock == true && doorsToRender[1][col].doorImg.dir == 3){
						surface.drawImage(doorsToRender[1][col].doorImg.img,
										  doorsToRender[1][col].doorCol * 16 + 258 , 258, 16, 16,
										  doorsToRender[1][col].x + 24, doorsToRender[1][col].y + 8, 16, 16)
					}
				}
				else{
                surface.drawImage(doorsToRender[1][col].doorImg.img,
                                  doorsToRender[1][col].doorImg.frameIndexDoor * 64, 64 * doorsToRender[1][col].doorImg.dir, 64, 64,
                                  doorsToRender[1][col].x, doorsToRender[1][col].y, 64, 64);
				}
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
            if (((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 96) && colTiles[i].doorImg.dir == 0) ||
                ((player.x + player.w > colTiles[i].x - 32) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 64) && colTiles[i].doorImg.dir == 1) ||
                ((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 96) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 64) && colTiles[i].doorImg.dir == 2) ||
                ((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 32) && (player.y < colTiles[i].y + 64) && colTiles[i].doorImg.dir == 3)) 
            {
                if (activeKeycards[0] == true && colTiles[i].doorImg.lock == true && colTiles[i].doorCol == 0) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (activeKeycards[1] == true && colTiles[i].doorImg.lock == true && colTiles[i].doorCol == 1) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (activeKeycards[2] == true && colTiles[i].doorImg.lock == true && colTiles[i].doorCol == 2) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (activeKeycards[3] == true && colTiles[i].doorImg.lock == true && colTiles[i].doorCol == 3) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (activeKeycards[4] == true && colTiles[i].doorImg.lock == true && colTiles[i].doorCol == 4) {
                    colTiles[i].doorImg.lock = false;
                }
                else if (activeKeycards[5] == true && colTiles[i].doorImg.lock == true && colTiles[i].doorCol == 5) {
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
                if (((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 96) && colTiles[i].doorImg.dir == 0) ||
                ((player.x + player.w > colTiles[i].x - 64) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 64) && colTiles[i].doorImg.dir == 1) ||
                ((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 96) && (player.y + player.h > colTiles[i].y - 0) && (player.y < colTiles[i].y + 64) && colTiles[i].doorImg.dir == 2) ||
                ((player.x + player.w > colTiles[i].x - 0) && (player.x < colTiles[i].x + 64) && (player.y + player.h > colTiles[i].y - 64) && (player.y < colTiles[i].y + 64) && colTiles[i].doorImg.dir == 3))
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

/* This sets the integer tile's custom colliders if any are needed. Parameter 1: tempIdx. Parameter 2: tempTile.*/
function setIntTiles(tileIdx, tile)
{
    switch(tileIdx)
    {
        case 60: // Regular locker.
            tile.img = tileImages[60];
            tile.playerAt = false;
            tile.search = true;
            itemTiles.push(tile);
            break;
		case 17: //locker against wall bottom (up)
			tile.img = tileImages[17];
			tile.collider.h = 32;
			tile.playerAt = false;
            tile.search = true;
            itemTiles.push(tile);
			break;
		case 19: //locker against wall bottom (left)
			tile.img = tileImages[19];
			tile.collider.w = 32;
			tile.playerAt = false;
            tile.search = true;
            itemTiles.push(tile);
			break;
		case 21: // locker against wall bottom (right)
            tile.img = tileImages[21];
            tile.collider.x += 32;
            tile.collider.w = 32;
			tile.playerAt = false;
            tile.search = true;
            itemTiles.push(tile);
            break;
		case 22: // locker against wall top (down)
            tile.img = tileImages[22];
            tile.collider.y += 32;
            tile.collider.h = 32;
			tile.playerAt = false;
            tile.search = true;
            itemTiles.push(tile);
            break;
        case 25: // File shelf bottom (up).
            tile.img = tileImages[25];
            tile.collider.h = 32;
            break;
        case 27: // File shelf bottom (left).
            tile.img = tileImages[27];
            tile.collider.w = 32;
            break;
        case 29: // File shelf bottom (right).
            tile.img = tileImages[29];
            tile.collider.x += 32;
            tile.collider.w = 32;
            break;
        case 31: // File shelf bottom (down).
            tile.img = tileImages[31];
            tile.collider.y += 32;
            tile.collider.h = 32;
            break;
        case 33: // Server tower bottom (up).
            tile.img = tileImages[33];
            tile.collider.h = 32;
            break;
        case 35: // Server tower bottom (left).
            tile.img = tileImages[35];
            tile.collider.w = 32;
            break;
        case 37: // Server tower bottom (right).
            tile.img = tileImages[37];
            tile.collider.x += 32;
            tile.collider.w = 32;
            break;
        case 39: // Server tower bottom (down).
            tile.img = tileImages[39];
            tile.collider.y += 32;
            tile.collider.h = 32;
            break;
        case 41: // Tape storage bottom (up).
            tile.img = tileImages[41];
            tile.collider.h = 32;
            break;
        case 43: // Tape storage bottom (left).
            tile.img = tileImages[43];
            tile.collider.w = 32;
            break;
        case 45: // Tape storage bottom (right).
            tile.img = tileImages[45];
            tile.collider.x += 32;
            tile.collider.w = 32;
            break;
        case 47: // Tape storage bottom (down).
            tile.img = tileImages[47];
            tile.collider.y += 32;
            tile.collider.h = 32;
            break;
        case 50: // Desk 1 left bottom (up).
            tile.img = tileImages[50];
            tile.collider.h = 32;
            break;
        case 51: // Desk 1 right bottom (up).
            tile.img = tileImages[51];
            tile.collider.h = 32;
            break;
        case 57: // Vending machines bottom (up).
            tile.img = tileImages[57];
            tile.collider.h = 32;
            break;
        case 65: // Washing machine bottom (up).
            tile.img = tileImages[65];
            tile.collider.h = 32;
            break;
        case 67: // Dryer bottom (up).
            tile.img = tileImages[67];
            tile.collider.h = 32;
            break;
        case 71: // Urinal bottom (up).
            tile.img = tileImages[71];
            tile.collider.h = 32;
            break;
        case 78: // Bottom left bathroom sinks (up).
            tile.img = tileImages[78];
            tile.collider.h = 32;
            break;
        case 79: // Bottom right bathroom sinks (up).
            tile.img = tileImages[79];
            tile.collider.h = 32;
            break;
        default:
            tile.img = tileImages[tileIdx];
            break;
    }
}

