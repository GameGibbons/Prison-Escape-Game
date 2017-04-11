//===============================================================
// Item Script. Contains item-related information and functions.
//===============================================================

var itemImg = [new Image(), new Image()]
itemImg[0].src = "img/ui_img/Storage.png";
itemImg[1].src = "img/item_img/Item.png";

var storageUI = { img: itemImg[0], dir: 0, idle: true, state: 2, frameIdx: 0, draw: false };

var itemTiles = []; // An array that holds container tiles.
var itemTracking = []; // An array that holds a reference to the container tiles in a room of the level array.

var item = [ {img:null, x:null, y:null, use:0, type:"", effect:"" },		//00 Empty
			 {img:itemImg[1], x:32 , y:0, use:1, type:"cqc", effect:"stun" },	//01 2x4
             {img:itemImg[1], x:64 , y:0, use:3, type:"cqc", effect:"kill" },	//02 Knife
			 {img:itemImg[1], x:96 , y:0, use:5, type:"projectile", effect:"kill" },	//03 Gun
			 {img:itemImg[1], x:128, y:0, use:0, type:"", effect:"" },	//04 ---
			 {img:itemImg[1], x:160, y:0, use:0, type:"", effect:"" },	//05 ---
			 {img:itemImg[1], x:192, y:0, use:0, type:"", effect:"" },	//06 ---
			 {img:itemImg[1], x:224, y:0, use:0, type:"", effect:"" },	//07 ---
			 {img:itemImg[1], x:256, y:0, use:0, type:"", effect:"" },	//08 ---
			 {img:itemImg[1], x:288, y:0, use:0, type:"", effect:"" },	//09 ---
			 {img:itemImg[1], x:0  , y:32,use:0 },	//10 Red Card
			 {img:itemImg[1], x:32 , y:32,use:0 },	//11 Yellow Card
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