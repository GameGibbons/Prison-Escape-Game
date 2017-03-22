//=================================================
// Enemy Script. Controls the enemies in the game.
//=================================================

// Constants.
const ENEMY_WIDTH = 30;
const ENEMY_HEIGHT = 38;
const ENEMY_DEFAULT_SPEED = 4;
const ENEMY_RANGE = 10;

var activeEnemies = [];
var activeWP = []; // A dynamic 2D array to store enemy waypoint arrays to pass to enemy objects.

var enemyImg = "img/player_img/Guard.png";

window.addEventListener("load", loadEnemyAsset);

function loadEnemyAsset()
{
    enemyImg = loadSingleImg(enemyImg);
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
        el.x += el.dx;
        el.y += el.dy;

        /* Check what direction this enemy is moving in and set the enemy's direction property. 
        Check if dx or dy aren't equal to zero and if they're negative or positive. */
        if(el.dx !== 0)
            (el.dx < 0) ? el.dir = 3 : el.dir = 2;
        if(el.dy !== 0)
            (el.dy < 0) ? el.dir = 1 : el.dir = 0;

        if(calcDistance(el.x, el.waypoint[el.currWP].x, el.y, el.waypoint[el.currWP].y) <= el.speed/2)
        {
            el.x = el.waypoint[el.currWP].x; // Snap the enemy to the current waypoint.
            el.y = el.waypoint[el.currWP].y;
            el.currWP++; // Increment to next waypoint.
            if (el.currWP === el.waypoint.length) el.currWP = 0;
            calcDeltas(el);
        }
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
        })
    }
}

function animateEnemies()
{
    activeEnemies.forEach(function(el)
    {
        el.frameCtr++;

        if(el.frameCtr === el.maxFrames)
        {
            el.frameIdx++
            el.frameCtr = 0;

            if(el.frameIdx === 2)
                el.frameIdx = 0;
        }
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