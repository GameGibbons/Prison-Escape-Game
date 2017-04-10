//=================================================
// Enemy Script. Controls the enemies in the game.
//=================================================

// Constants.
const ENEMY_WIDTH = 30;
const ENEMY_HEIGHT = 38;
const ENEMY_DEFAULT_SPEED = 4;
const ENEMY_RANGE = 400;
const ENEMY_ALERT_TIME = 3; // In seconds.
const ENEMY_CQC_RANGE = 50;

var activeEnemies = [];
var activeWP = []; // A dynamic 2D array to store enemy waypoint arrays to pass to enemy objects.
var losTiles = []; // Holds the tiles that can break the enemy's line of sight.

var enemyImg = "img/enemy_img/Guard.png";
var segsImg = "img/enemy_img/seg.png";

window.addEventListener("load", loadEnemyAsset);

function loadEnemyAsset()
{
    enemyImg = loadSingleImg(enemyImg);
    segsImg = loadSingleImg(segsImg);
}

/* Updates the enemy/enemies and waypoints during scrolling. */
function updateEnemies(scrollDir, scrollSpeed)
{
    activeEnemies.forEach(function (el)
    {
        var i;
        switch(scrollDir)
        {
            case 0:
                el.y -= scrollSpeed;
                for(i = 0; i < el.waypoint.length; i++)
                    el.waypoint[i].y -= scrollSpeed;
                break;
            case 1:
                el.y += scrollSpeed;
                for(i = 0; i < el.waypoint.length; i++)
                    el.waypoint[i].y += scrollSpeed;
                break;
            case 2:
                el.x -= scrollSpeed;
                for (i = 0; i < el.waypoint.length; i++)
                    el.waypoint[i].x -= scrollSpeed;
                    console.log(el.waypoint);
                break;
            case 3:
                el.x += scrollSpeed;
                for (i = 0; i < el.waypoint.length; i++)
                    el.waypoint[i].x += scrollSpeed;
                break;
            default:
                console.log("Scroll direction not recognized.");
                break;
        }
    })
}

/* Reduces the distance between the enemy and the current waypoint each frame. */
function moveEnemies()
{
    activeEnemies.forEach(function(el)
    {
        // Move enemy.
        if(!el.spottedPlyr)
        {
            el.x += el.dx;
            el.y += el.dy;

            el.collider.x = el.x;
            el.collider.y = el.y;
        }

        /* Check what direction this enemy is moving in and set the enemy's direction and 
        target properties. Only update the target based on this enemy's direction if the 
        enemy hasn't spotted the player. Check if dx or dy aren't equal to zero and if 
        they're negative or positive. dir 0=down, 1=up, 2=right, 3=left*/
        if(el.dx !== 0 && el.spottedPlyr === false)
            (el.dx < 0) ? el.dir = 3 : el.dir = 2;
       
        if(el.dy !== 0 && el.spottedPlyr === false)
            (el.dy < 0) ? el.dir = 1 : el.dir = 0;

        // Snap enemy to current waypoint and set the next waypoint if this enemy is close.
        if(calcDistance(el.x, el.waypoint[el.currWP].x, el.y, el.waypoint[el.currWP].y) <= el.speed/2)
        {
            el.x = el.waypoint[el.currWP].x; 
            el.y = el.waypoint[el.currWP].y;
            el.currWP++; 
            if (el.currWP === el.waypoint.length) el.currWP = 0;
            calcDeltas(el);
        }

        // Check if the player is within sriking distance and set the plyrNear flag.
        if(calcDistance(player.x, el.x, player.y, el.y) <= ENEMY_CQC_RANGE)
            el.plyrNear = true;
        else
            el.plyrNear = false;

        checkSight(el);
    })
}

function renderEnemies()
{
    if (activeEnemies.length > 0) 
    {
        activeEnemies.forEach(function (el)
        {
            surface.drawImage(el.img,
                              el.frameIdx * 30, el.dir * 38, ENEMY_WIDTH, ENEMY_HEIGHT,
                              el.x, el.y, ENEMY_WIDTH, ENEMY_HEIGHT);
			
            // Draw enemy linecasts. [ Debugging only ]
            if(el.linecast !== null && el.linecast.length > 0)
            {
                for (var i = 0; i < el.linecast.length; i++)
                    surface.drawImage(segsImg, el.linecast[i].x, el.linecast[i].y);
            }
        })
    }
}

function animateEnemies()
{
    activeEnemies.forEach(function(el)
    {
        if(!el.spottedPlyr)
        {
            el.frameCtr++;

            if(el.frameCtr === el.maxFrames)
            {
                el.frameIdx++
                el.frameCtr = 0;

                if(el.frameIdx === 2)
                    el.frameIdx = 0;
            }
        }
        else
            el.frameIdx = 0;
    })
}

/* Sets each enemy's waypoint property to a waypoint array in activeWP. */
function setEnemyWaypoints()
{
    // First, sort the waypoint arrays in the order intended in the level script.
    activeWP.forEach(function (el)
    {
        el.sort(function (a, b) { return a.order - b.order });
    })

    /* Loop through the active enemies array and assign the appropriate waypoint array 
    in the 2D activeWP array. */
    if(activeEnemies.length > 0)
    {
        activeEnemies.forEach(function (el)
        { 
            // Set the enemy's waypoint and calculate its deltas.
            el.waypoint = activeWP[el.waypoint];
            calcDeltas(el);
        })
    }
}

/* Calculates the enemy's delta position to the current waypoint. Requires an enemy object passed to it. */
function calcDeltas(enemy)
{
    // Create a vector to the next waypoint.
    var tempDX = enemy.waypoint[enemy.currWP].x - enemy.x; // Change in x points.
    var tempDY = enemy.waypoint[enemy.currWP].y - enemy.y; // Change in y points.
    var mag = Math.sqrt(tempDX*tempDX + tempDY*tempDY); // Magnitude of vector, aka the distance in pixels.
    enemy.dx = tempDX / mag * enemy.speed; // Setting the new enemy delta x.
    enemy.dy = tempDY / mag * enemy.speed; // Setting the new enemy delta y.
}

// Returns the magnitude or distance between two points. Will always be positive.
function calcDistance(x1, x2, y1, y2)
{
    return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
}

function checkSight(enemy)
{
    var dx = (player.x + player.w/2) - (enemy.x + enemy.w/2);
    var dy = (player.y + player.h/2) - (enemy.y + enemy.h/2);
    var segs = 8; // Segments of the distance between the enemy and target.
    var j;
    enemy.linecast = [];

    // Set the enemy's direction to look at the player when alerted.
    if(enemy.spottedPlyr)
    {
        if(dx < 0)
            enemy.dir = 3;
        else
            enemy.dir = 2;

        if(dy < -100)
            enemy.dir = 1;
        else if(dy > 100)
            enemy.dir = 0;
    }
	
    if(calcDistance(player.x, enemy.x, player.y, enemy.y) <= enemy.range)
	{
        /* Check the linecast against the losTiles and assume that no hits means that this enemy has regained line
        of sight with the player. */
        for (var i = 0; i < losTiles.length; i++)
        {
            enemy.linecast = [];
            for (j = 1; j <= segs; j++)
            {
                enemy.linecast.push( { x:(enemy.x+enemy.w/2)+(dx*(j/segs)), y:(enemy.y+enemy.h/2)+(dy*(j/segs)) } );

                if( !(((enemy.x+enemy.w/2)-8)+(dx*(j/segs)) > losTiles[i].x+losTiles[i].w ||
                      ((enemy.x+enemy.w/2)+8)+(dx*(j/segs)) < losTiles[i].x ||
                      ((enemy.y+enemy.h/2)-8)+(dy*(j/segs)) > losTiles[i].y+losTiles[i].h ||
                      ((enemy.y+enemy.h/2)+8)+(dy*(j/segs)) < losTiles[i].y ))
                {
                    i = losTiles.length;

                    if(enemy.spottedPlyr)
                    {
                        var currTime = new Date(); // Get the current time.

                        if((currTime.getSeconds() - enemy.lastSpotted.getSeconds()) >= ENEMY_ALERT_TIME)
                            enemy.spottedPlyr = false;
                    }

                    break;
                }
            }
        }
		
        if (j === segs + 1)
        {
            /* Only spot the player if they are in front of the enemy. */
            switch(enemy.dir)
            {
             case 1:
                if(player.y+player.h/2 < enemy.y)
                {
                    //console.log("Player found! 1");
                    enemy.spottedPlyr = true;
                    enemy.lastSpotted = new Date();
                }
                break;

             case 0:
                if(player.y > enemy.y+enemy.h/2)
                {
                    //console.log("Player found! 0");
                    enemy.spottedPlyr = true;
                    enemy.lastSpotted = new Date();
                }
                break;

             case 3:
                if(player.x+player.w/2 < enemy.x)
                {
                    //console.log("Player found! 3");
                    enemy.spottedPlyr = true;
                    enemy.lastSpotted = new Date();
                }
                break; 

             case 2:
                if(player.x > enemy.x+enemy.w/2)
                {
                    //console.log("Player found! 2");
			        enemy.spottedPlyr = true;
			        enemy.lastSpotted = new Date();
                } 
                break;
            }
              
            

            // Add firing here.

        }
    }
    else
    {
        if(enemy.spottedPlyr)
        {
            //console.log("Checking time.");

            var currTime = new Date();

            if((currTime.getSeconds() - enemy.lastSpotted.getSeconds()) >= ENEMY_ALERT_TIME)
                enemy.spottedPlyr = false;
        }
    }
}

/* */
function attackEnemy(weapon)
{
    /*
    If weapon is not a gun.
    {
        Check each enemy's plyrNear flag.
        {
        
        }
    }
    */
}