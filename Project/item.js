/*var prima={}; // Primary slot.
var second={}; // Secondary slot.*/
var itemUse=[{use:1,type:1,effect:null,range:0},//various
             {use:1,type:0,effect:1,range:0},//knife
             {use:null,type:1,effect:1,range:1}]//gun
//var hand=0;

var itemImg = [new Image(), new Image()]
itemImg[0].src = "img/ui_img/Storage.png";
itemImg[1].src = "img/item_img/Item.png";

var storageUI = { img: itemImg[0], dir: 0, idle: true, state: 2, frameIdx: 0, draw: false };

var itemTiles = []; // An array that holds container tiles.
var itemTracking = []; // An array that holds a reference to the container tiles in a room of the level array.

var item = [ {img:null, x:null, y:null},		//00 Empty
			 {img:itemImg[1], x:32 , y:0  },	//01 2x4
             {img:itemImg[1], x:64 , y:0  },	//02 Knife
			 {img:itemImg[1], x:96 , y:0  },	//03 Gun
			 {img:itemImg[1], x:128, y:0  },	//04 ---
			 {img:itemImg[1], x:160, y:0  },	//05 ---
			 {img:itemImg[1], x:192, y:0  },	//06 ---
			 {img:itemImg[1], x:224, y:0  },	//07 ---
			 {img:itemImg[1], x:256, y:0  },	//08 ---
			 {img:itemImg[1], x:288, y:0  },	//09 ---
			 {img:itemImg[1], x:0  , y:32 },	//10 Red Card
			 {img:itemImg[1], x:32 , y:32 },	//11 Yellow Card
			 {img:itemImg[1], x:64 , y:32 },	//12 Blue Card
			 {img:itemImg[1], x:96 , y:32 },	//13 Green Card
			 {img:itemImg[1], x:128, y:32 },	//14 Orange Card
			 {img:itemImg[1], x:160, y:32 },	//15 Purple Card
			 {img:itemImg[1], x:192, y:32 },	//16 White Card
             {img:itemImg[1], x:224, y:32 },	//17 Note
			 {img:itemImg[1], x:256, y:32 },	//18 ---
			 {img:itemImg[1], x:288, y:32 },	//19 ---
			 {img:itemImg[1], x:0  , y:64 } ];	//20 ---

var Icursor = { img: itemImg[1], x: 0, y: 0, slot: 0 };

/*window.addEventListener("keydown", onKeyDown);

function onKeyDown(event)
{
	switch(event.keyCode)
	{
		case 65: 
			hand=1;
			break;
		case 83: 
			hand=2;
			break;
		case 68:
			if(hand==1)
			{
				if(prima!=null&&prima.use>1)
				{
					prima.use--;
				}
				else
				{
					unequipItem(slot);
					prima=null;
				}
			}
			else if(hand==2)
			{
				if(second!=null&&second.use>1)
				{
					second.use--;
				}
				else
				{
					unequipItem(slot);
					second=null;
				}
			}
			break;
	}
}

function Primary(weapon)
{
	if(prima==null)
	{
		prima=itemUse[weapon];
	}
}
function Secondary(weapon)
{
	if(second==null)
	{
		second=itemUse[weapon];
	}
}*/

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