//===============================================================
// Item Script. Contains item-related information and functions.
//===============================================================

const BULLET_SIZE = 6;
const BULLET_SPEED = 50;

var itemImg = [new Image(), new Image(), new Image(), new Image()];
itemImg[0].src = "img/ui_img/Storage.png";
itemImg[1].src = "img/item_img/Item.png";
itemImg[2].src = "img/item_img/attackAnims.png";
itemImg[3].src = "img/item_img/bullet.png";

var storageUI = { img: itemImg[0], dir: 0, idle: true, state: 2, frameIdx: 0, draw: false };

var itemTiles = []; // An array that holds container tiles.
var itemTracking = []; // An array that holds a reference to the container tiles in a room of the level array.
var bullets = []; // Holds both player & enemy projectiles.

var bulletImg = itemImg[3];

var itemAnim = [{img:itemImg[2], x:0, y:0},
				{img:itemImg[2], x:32,y:0},
				{img:itemImg[2], x:64,y:0},
				{img:itemImg[2], x:96,y:0},
				{img:itemImg[2], x:128,y:0},
				{img:itemImg[2], x:160,y:0}];


var item = [ {img:null, x:null, y:null, use:0, type:"", effect:"" },				//00 Empty
			 {img:itemImg[1], x:32 , y:0, use:1, type:"cqc", effect:"stun" },		//01 2x4
             {img:itemImg[1], x:64 , y:0, use:3, type:"cqc", effect:"kill" },		//02 Knife
			 {img:itemImg[1], x:96 , y:0, use:5, type:"projectile", effect:"kill" },//03 Gun
			 {img:itemImg[1], x:128, y:0, use:0, type:"", effect:"" },				//04 ---
			 {img:itemImg[1], x:160, y:0, use:0, type:"", effect:"" },				//05 ---
			 {img:itemImg[1], x:192, y:0, use:0, type:"", effect:"" },				//06 ---
			 {img:itemImg[1], x:224, y:0, use:0, type:"", effect:"" },				//07 ---
			 {img:itemImg[1], x:256, y:0, use:0, type:"", effect:"" },				//08 ---
			 {img:itemImg[1], x:288, y:0, use:0, type:"", effect:"" },				//09 ---
			 {img:itemImg[1], x:0  , y:32,use:0 },									//10 Red Card
			 {img:itemImg[1], x:32 , y:32,use:0 },									//11 Yellow Card
			 {img:itemImg[1], x:64 , y:32,use:0 },	//12 Blue Card
			 {img:itemImg[1], x:96 , y:32,use:0 },	//13 Green Card
			 {img:itemImg[1], x:128, y:32,use:0 },	//14 Orange Card
			 {img:itemImg[1], x:160, y:32,use:0 },	//15 Purple Card
			 {img:itemImg[1], x:192, y:32,use:0 },	//16 White Card
             {img:itemImg[1], x:224, y:32,use:0 },	//17 Note
			 {img:itemImg[1], x:256, y:32,use:0 },	//18 ---
			 {img:itemImg[1], x:288, y:32,use:0 },	//19 ---
			 {img:itemImg[1], x:0  , y:64,use:0 } ];	//20 ---

var Icursor = { img: itemImg[1], x: 0, y: 0, slot: 0 };

// Animates the storge UI element.
function animateStorageUI()
{
    if (storageUI.state === 1 && storageUI.idle === false)
    {
        storageUI.frameIdx++;
        if (storageUI.frameIdx === 2)
            storageUI.idle = true;
    }
    else if (storageUI.state === 2 && storageUI.idle === false)
    {
        storageUI.frameIdx--;
        if (storageUI.frameIdx === 0)
        {
            storageUI.idle = true;
            storageUI.draw = false;
        }
    }
}

function updateBullets()
{	
	bullets.forEach(function (el)
	{
		el.x += el.dx;
		el.y += el.dy;
	})

	bulletCollision();
}

function bulletCollision()
{
    bullets.forEach(function(el, index)
    {
        for(var i = 0; i < colTiles.length; i++)
        {
           if(!(el.x > colTiles[i].collider.x+colTiles[i].collider.w ||
                 el.x+BULLET_SIZE < colTiles[i].x ||
                 el.y > colTiles[i].collider.y+colTiles[i].collider.h ||
                 el.y+BULLET_SIZE < colTiles[i].y ))
            {
                //console.log("Hit something!");
                if (colTiles[i].isEnemy === true && el.isPlayers === true) {
                   // console.log("Hit myself!");
                    colTiles[i].isDead = true;
                    bullets.splice(index, 1);
                }
                else if(!colTiles[i].isEnemy)
                    bullets.splice(index, 1);
            }
        }

        if(!(el.x > player.x+player.w ||
             el.x+BULLET_SIZE < player.x ||
             el.y > player.y+player.h ||
             el.y+BULLET_SIZE < player.y ))
        {
            //console.log("Hit player!");
            if (el.isPlayers != true)
            {
                //console.log("Kill player!");
                player.isDead = true;
                bullets.splice(index, 1);
            }
        }
    })
}

function renderBullets()
{
	bullets.forEach(function(el)
	{
	    surface.drawImage(el.img, el.x, el.y);
	})
}

