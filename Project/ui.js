//==================================================================
// User Interface Script. Controls all HUD and in-game UI elements.
//==================================================================

// Constants.
const TEXT_OFFSET_Y = 19;
const KEYCARD_WIDTH = 30;
const KEYCARD_HEIGHT = 36;
const KEYCARD_TEXT_OFFSET_X = 430;
const KEYCARD_OFFSET_X = 320;
const KEYCARD_OFFSET_Y = 27;
const INVTRY_SLOT_WIDTH = 64;
const INVTRY_SLOT_HEIGHT = 36;
const INVTRY_TEXT_OFFSET_X = 625;
const INVTRY_OFFSET_X = 560;
const INVTRY_OFFSET_Y = 25;
const ALERT_OFFSET_X = 768;
const ALERT_OFFSET_Y = 42;
const ALERT_BAR_WIDTH = 20;
const ALERT_BAR_HEIGHT = 20; // Height of first alert bar.
const ALERT_BAR_GROWTH = 5;

// HUD information.
var alertLevel = 1;
var inventoryUI = [{item: 0, inUse: false}, 
				 {item: 0, inUse: false}	];

// HUD images.
var keycardImg = "img/ui_img/keycard_sheet.png";
var itemImg = "img/ui_img/items.png";

document.addEventListener("keydown", debugInput);
window.addEventListener("load", loadUIAssets);

function loadUIAssets()
{
	keycardImg = loadSingleImg(keycardImg);
	itemImg = loadSingleImg(itemImg);
}

function renderHUD()
{	
	// Temporary banner for HUD visibility.
	surface.fillStyle = "#cccccc"
	surface.fillRect(0, 0, _canvas.width, 64);
	
	drawKeycards();
	drawInventory();
	drawStorageUI();
}

function debugInput(e)
{
	switch(e.key)
	{
		case "1":
			activeKeycards[0] === false ? activeKeycards[0] = true : activeKeycards[0] = false;
			break;
		case "2":
			activeKeycards[1] === false ? activeKeycards[1] = true : activeKeycards[1] = false;
			break;
		case "3":
		    activeKeycards[2] === false ? activeKeycards[2] = true : activeKeycards[2] = false;
			break;
		case "4":
			activeKeycards[3] === false ? activeKeycards[3] = true : activeKeycards[3] = false;
			break;
		case "5":
			activeKeycards[4] === false ? activeKeycards[4] = true : activeKeycards[4] = false;
			break;
		case "6":
			activeKeycards[5] === false ? activeKeycards[5] = true : activeKeycards[5] = false;
			break;
	    case "7":
	        activeKeycards[6] === false ? activeKeycards[6] = true : activeKeycards[6] = false;
	        break;
		default:
			break;
	}
}

function drawKeycards()
{
	// Keycard text.
	surface.beginPath();
	surface.font = "25px Arial";
	surface.fillStyle = "black";
	surface.textAlign = "center";
	surface.fillText("Keycards", KEYCARD_TEXT_OFFSET_X, TEXT_OFFSET_Y);
	
	// Keycards
	for(var i = 0; i < activeKeycards.length; i++)
	{
		if(activeKeycards[i] === true)
		surface.drawImage(keycardImg, KEYCARD_WIDTH * i, 0,
						  KEYCARD_WIDTH, KEYCARD_HEIGHT, KEYCARD_OFFSET_X + (KEYCARD_WIDTH * i), KEYCARD_OFFSET_Y, KEYCARD_WIDTH, KEYCARD_HEIGHT);
	}
}

function drawInventory()
{
	// Inventory text.
	surface.beginPath();
	surface.font = "25px Arial";
	surface.fillStyle = "black";
	surface.textAlign = "center";
	surface.fillText("Inventory", INVTRY_TEXT_OFFSET_X, TEXT_OFFSET_Y);
	
	// Inventory slot 1.
	surface.beginPath();
	surface.strokeStyle = "black";
	surface.lineWidth = "5px";
	surface.strokeRect(INVTRY_OFFSET_X, INVTRY_OFFSET_Y, INVTRY_SLOT_WIDTH, INVTRY_SLOT_HEIGHT);
	
	// Inventory slot 2.
	surface.beginPath();
	surface.strokeRect(INVTRY_OFFSET_X + INVTRY_SLOT_WIDTH + 5, INVTRY_OFFSET_Y, INVTRY_SLOT_WIDTH, INVTRY_SLOT_HEIGHT);
	
    // Primary item use text.
	surface.beginPath();
	surface.font = "10px Arial";
	surface.fillStyle = "#ff0000";
	surface.fillText(player.itemUse[0], INVTRY_OFFSET_X + INVTRY_SLOT_WIDTH - 5, INVTRY_OFFSET_Y + INVTRY_SLOT_HEIGHT - 5);

    // Secondary item use text.
	surface.beginPath();
	surface.fillText(player.itemUse[1], (INVTRY_OFFSET_X + INVTRY_SLOT_WIDTH + 5) + INVTRY_SLOT_WIDTH - 5, INVTRY_OFFSET_Y + INVTRY_SLOT_HEIGHT - 5);

	// Inventory images.
	if(inventoryUI[0].inUse && inventoryUI[0].item.img !== null)
		surface.drawImage(inventoryUI[0].item.img, inventoryUI[0].item.x, inventoryUI[0].item.y, 32, 32,
						  INVTRY_OFFSET_X, INVTRY_OFFSET_Y, INVTRY_SLOT_WIDTH, INVTRY_SLOT_HEIGHT); 
						  
	if(inventoryUI[1].inUse && inventoryUI[1].item.img !== null)
		surface.drawImage(inventoryUI[1].item.img, inventoryUI[1].item.x, inventoryUI[1].item.y, 32, 32,
						  INVTRY_OFFSET_X + INVTRY_SLOT_WIDTH + 5, INVTRY_OFFSET_Y, INVTRY_SLOT_WIDTH, INVTRY_SLOT_HEIGHT); 
}

// This function takes an index of the item enummeration and sees if there is a slot available for it.
function equipItemP(itemToEquip)
{
	inventoryUI[0].item = item[itemToEquip];
	inventoryUI[0].inUse = true;
}

function equipItemS(itemToEquip)
{
	inventoryUI[1].item = item[itemToEquip];
	inventoryUI[1].inUse = true;
}

// This function takes an inventoryUI slot and resets it.
function unequipItem(slot)
{
	if(!inventoryUI[slot].inUse)
		return;
	else
	{
		inventoryUI[slot].item = null;
		inventoryUI[slot].inUse = false;
	}
}

function drawAlert()
{
	var drawPosX = ALERT_OFFSET_X;
	var drawPosY = ALERT_OFFSET_Y;
	var currentHeight = ALERT_BAR_HEIGHT;
	
	// Alert level text.
	surface.beginPath();
	surface.font = "25px Arial";
	surface.fillStyle = "black";
	surface.textAlign = "center";
	surface.fillText("Alert Level", 832, 19);
	
	// Alert bar 1.
	surface.beginPath();
	surface.fillStyle = "#00ff00";
	surface.fillRect(drawPosX, drawPosY, ALERT_BAR_WIDTH, currentHeight);
	
	// Alert bar 1 text.
	surface.beginPath();
	surface.font = "15px Arial";
	surface.fillStyle = "black";
	surface.fillText("1", drawPosX + ALERT_BAR_WIDTH/2, drawPosY + currentHeight - 5);
	
	drawPosX += ALERT_BAR_WIDTH + 5;	//
	drawPosY -= ALERT_BAR_GROWTH;		//--Alert bar growth.
	currentHeight += ALERT_BAR_GROWTH;	//
	
	// Alert bar 2.
	if(alertLevel >= 2)
	{
		surface.beginPath();
		surface.fillStyle = "#b6ff00";
		surface.fillRect(drawPosX, drawPosY, ALERT_BAR_WIDTH, currentHeight);
	}
	else
	{
	    surface.beginPath();
		surface.strokeStyle = "#b6ff00";
		surface.strokeRect(drawPosX, drawPosY, ALERT_BAR_WIDTH, currentHeight);
	}
	
	// Alert bar 2 text.
	surface.beginPath();
	surface.fillStyle = "black";
	surface.fillText("2", drawPosX + ALERT_BAR_WIDTH/2, drawPosY + currentHeight - 5);
	
	drawPosX += ALERT_BAR_WIDTH + 5;
	drawPosY -= ALERT_BAR_GROWTH;
	currentHeight += ALERT_BAR_GROWTH;
	
	// Alert bar 3.
	if(alertLevel >= 3)
	{
		surface.beginPath();
		surface.fillStyle = "#ffff00";
		surface.fillRect(drawPosX, drawPosY, ALERT_BAR_WIDTH, currentHeight);
	}
	else
	{
		surface.beginPath();
		surface.strokeStyle = "#ffff00";
		surface.strokeRect(drawPosX, drawPosY, ALERT_BAR_WIDTH, currentHeight);
	}
	
	// Alert bar 3 text.
	surface.beginPath();
	surface.fillStyle = "black";
	surface.fillText("3", drawPosX + ALERT_BAR_WIDTH/2, drawPosY + currentHeight - 5);
	
	drawPosX += ALERT_BAR_WIDTH + 5;
	drawPosY -= ALERT_BAR_GROWTH;
	currentHeight += ALERT_BAR_GROWTH;
	
	// Alert bar 4.
	if(alertLevel >= 4)
	{
		surface.beginPath();
		surface.fillStyle = "#ff8000"
		surface.fillRect(drawPosX, drawPosY, ALERT_BAR_WIDTH, currentHeight);
	}
	else
	{
		surface.beginPath();
		surface.strokeStyle = "#ff8000";
		surface.strokeRect(drawPosX, drawPosY, ALERT_BAR_WIDTH, currentHeight);
	}
	
	// Alert bar 4 text.
	surface.beginPath();
	surface.fillStyle = "black";
	surface.fillText("4", drawPosX + ALERT_BAR_WIDTH/2, drawPosY + currentHeight - 5);
	
	drawPosX += ALERT_BAR_WIDTH + 5;
	drawPosY -= ALERT_BAR_GROWTH;
	currentHeight += ALERT_BAR_GROWTH;
	
	// Alert bar 5.
	if(alertLevel === 5)
	{
		surface.beginPath();
		surface.fillStyle = "#ff0000";
		surface.fillRect(drawPosX, drawPosY, ALERT_BAR_WIDTH, currentHeight);
	}
	else
	{
		surface.beginPath();
		surface.strokeStyle = "#ff0000";
		surface.strokeRect(drawPosX, drawPosY, ALERT_BAR_WIDTH, currentHeight);
	}
	
	// Alert bar 5 text.
	surface.beginPath();
	surface.fillStyle = "black";
	surface.fillText("5", drawPosX + ALERT_BAR_WIDTH/2, drawPosY + currentHeight - 5);
}

function increaseAlert() { if(alertLevel < 5) {alertLevel += 1;} }

function decreaseAlert() { if(alertLevel > 1) {alertLevel -= 1;} }

function drawStorageUI()
{
	var i;
    if(storageUI.draw === true)
    {
	
        // Draw slot UI.
        surface.drawImage(storageUI.img,
                          storageUI.frameIdx * 48, 124 * storageUI.dir, 48, 124,
                          player.x + 45, player.y, 48, 124)

        // Draw each item per slot.
        for (i = 1; i < item.length; i++)
		{	
			if (i === currItemTile.s1)
				surface.drawImage(item[i].img,
								  item[i].x, item[i].y, 32, 32,
								  player.x + 53, player.y + 9, 32, 32);
			if (i === currItemTile.s2)
				surface.drawImage(item[i].img,
								  item[i].x, item[i].y, 32, 32,
								  player.x + 53, player.y + 46, 32, 32);
			if (i === currItemTile.s3)
				surface.drawImage(item[i].img,
								  item[i].x, item[i].y, 32, 32,
								  player.x + 53, player.y + 83, 32, 32);
		}

        // Draw selection cursor.
        if (Icursor.slot === 0)
            surface.drawImage(Icursor.img,
                              Icursor.x, Icursor.y, 32, 32,
                              player.x + 53, player.y + 9, 32, 32);
        if (Icursor.slot === 1)
            surface.drawImage(Icursor.img,
                              Icursor.x, Icursor.y, 32, 32,
                              player.x + 53, player.y + 46, 32, 32);
        if (Icursor.slot === 2)
            surface.drawImage(Icursor.img,
                              Icursor.x, Icursor.y, 32, 32,
                              player.x + 53, player.y + 83, 32, 32);
    }
}
