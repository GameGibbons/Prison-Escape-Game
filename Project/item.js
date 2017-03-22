var prima={}; // Primary slot.
var second={}; // Secondary slot.
var itemUse=[{use:1,type:1,effect:null,range:0},//various
             {use:1,type:0,effect:1,range:0},//knife
             {use:null,type:1,effect:1,range:1}]//gun
var hand=0;

var itemImg = [new Image(), new Image()]
itemImg[0].src = "img/ui_img/Storage.png";
itemImg[1].src = "img/item_img/Item.png";

var storage = [ { img: itemImg[0], dir: 0, idle: true, state: 2, frameIdx: 0, draw: false } ];

var itemTiles = []; // An array that holds container tiles.

var item = [ {img:itemImg[1], x:32, y:0, slot:0},
             {img:itemImg[1], x:64, y:0, slot:1},
             {img:itemImg[1], x:96, y:0, slot:2} ];

var Icursor = { img: itemImg[1], x: 0, y: 0, slot: 0 };

window.addEventListener("keydown", onKeyDown);

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
/*	else
	{
		Secondary(weapon);
	}*/
}
function Secondary(weapon)
{
	if(second==null)
	{
		second=itemUse[weapon];
	}
}

// Animates the storge UI element.
function animateStorage()
{
    storage.forEach(function(el)
    {
        if (el.state === 1 && el.idle === false)
        {
            el.frameIdx++;
            if (el.frameIdx === 2)
                el.idle = true;
        }
        else if (el.state === 2 && el.idle === false)
        {
            el.frameIdx--;
            if (el.frameIdx === 0)
            {
                el.idle = true;
                el.draw = false;
            }
        }
    })
}