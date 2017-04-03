//=================================================
// Enemy Script. Controls the enemies in the game.
//=================================================

// Constants.
const ENEMY_WIDTH = 30;
const ENEMY_HEIGHT = 38;
const ENEMY_DEFAULT_SPEED = 4;
const ENEMY_RANGE = 150;
const ENEMY_ALERT_TIME = 3; // In seconds.

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
        }

        // Update target based on alert state.
        if (!el.spottedPlyr)
        {
            el.target.x = el.x + el.w/2; 
            el.target.y = el.y + el.h/2;
        }
        else
        {
            el.target.x = player.x + player.w/2;
            el.target.y = player.y + player.h/2;
        }

        /* Check what direction this enemy is moving in and set the enemy's direction and 
        target properties. Only update the target based on this enemy's direction if the 
        enemy hasn't spotted the player. Check if dx or dy aren't equal to zero and if 
        they're negative or positive. */
        if(el.dx !== 0 && el.spottedPlyr === false)
        {
            if(el.dx < 0)
            {
                el.target.x -= el.range;
                el.dir = 3;
            }
            else
            {
                el.target.x += el.range;
                el.dir = 2
            }
        }
        if(el.dy !== 0 && el.spottedPlyr === false)
        {
            if(el.dy < 0)
            {
                el.target.y -= el.range;
                el.dir = 1;
            }
            else
            {
                el.target.y += el.range;
                el.dir = 0;
            }
        }

        // Snap enemy to current waypoint and set the next waypoint if this enemy is close.
        if(calcDistance(el.x, el.waypoint[el.currWP].x, el.y, el.waypoint[el.currWP].y) <= el.speed/2)
        {
            el.x = el.waypoint[el.currWP].x; 
            el.y = el.waypoint[el.currWP].y;
            el.currWP++; 
            if (el.currWP === el.waypoint.length) el.currWP = 0;
            calcDeltas(el);
        }


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
    var dx = enemy.target.x - (enemy.x + enemy.w/2);
    var dy = enemy.target.y - (enemy.y + enemy.h/2);
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

    /* Here is where two different linecast checks are being done. The first check is when the enemy is in its patrolling state.
    It first checks the linecast against the losTiles to see if it is hitting any of those tiles. It then checks the remaining 
    linecast against the player and sets the enemy to its alert state if there is a hit. The second check is when the enemy is 
    in its alert state. It checks the linecast against the losTiles like before; however, it counts the seconds that the linecast 
    hits an losTile before setting the enemy back to the patrol state. */
    if (!enemy.spottedPlyr)
    {
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
                    break;
                }
            }
        }

        // Check the remaining segments to see if the player is in sight. 
        for (var i = 1; i < j; i++)
        {
            if ( !(((enemy.x+enemy.w/2)-8)+(dx*(i/segs)) > player.x+player.w ||
                   ((enemy.x+enemy.w/2)+8)+(dx*(i/segs)) < player.x ||   
                   ((enemy.y+enemy.h/2)-8)+(dy*(i/segs)) > player.y+player.h ||
                   ((enemy.y+enemy.h/2)+8)+(dy*(i/segs)) < player.y ))
            {
                enemy.spottedPlyr = true;
                enemy.lastSpotted = new Date(); // Get the time when the player was spotted.
                break;
            }
        }
    }
    else
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

                    var currTime = new Date(); // Get the current time.

                    // Check if the time since the player was last spotted is equal to the alert time.
                    if( (currTime.getSeconds() - enemy.lastSpotted.getSeconds()) >= ENEMY_ALERT_TIME)
                        enemy.spottedPlyr = false;

                    break;
                }
            }
        }

        if (j === segs + 1 && enemy.spottedPlyr === true)
        {
            enemy.lastSpotted = new Date();

            // Add firing here.

        }
    }
}