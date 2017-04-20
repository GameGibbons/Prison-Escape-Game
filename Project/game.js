//============================================================================
// Game Script. Provides state machine functionality that the game is run on.
//============================================================================

/* states is an array of objects where each object is a state with an enter, update and exit function. These
   functions get called in the changeState function. */
var states = [{ enter: enterMenu, update: updateMenu, exit: exitMenu }, 	//00// Main menu state.
			  { enter: enterGame, update: updateGame, exit: exitGame }, 	//01// Game state.
			  { enter: enterPause, update: updatePause, exit: exitPause }, 	//02// Help state.
			  { enter: enterNote, update: updateNote, exit: exitNote }, 	//03// Notes screen.
			  { enter: enterEnd, update: updateEnd, exit: exitEnd }, 		//04// End Screen.
			  { enter: enterHelp, update: updateHelp, exit: exitHelp }, 	//05// Help Screen.
			  { enter: enterOver, update: updateOver, exit: exitOver }]; 	//06// Game Over Screen.
			  
var lastState = -1; // These two variables should be indices for the states array.
var currState = -1;
var screenState;

// The buttons array stores information about all buttons for my simple UI that just changes states.
var buttons = [{ img: "img/btn_img/btnStart.png", imgO: "img/btn_img/btnStartO.png", x: 448, y: 448, w: 128, h: 32, over: false, click: onStartClick }, 	//00// Start button
			   { img: "img/btn_img/btnHelp.png", imgO: "img/btn_img/btnHelpO.png", x: 448, y: 512, w: 128, h: 32, over: false, click: onHelpClick },		//01// Help button
			   { img: "img/btn_img/btnBack.png", imgO: "img/btn_img/btnBackO.png", x: 790, y: 700, w: 128, h: 32, over: false, click: onBackClick },		//02// Back button
			   { img: "img/btn_img/btnBack.png", imgO: "img/btn_img/btnBackO.png", x: 162, y: 700, w: 128, h: 32, over: false, click: onBackNoteClick },	//03// Back (to menu from notes) button
			   { img: "img/btn_img/btnNotes.png", imgO: "img/btn_img/btnNotesO.png", x: 448, y: 448, w: 128, h: 32, over: false, click: onNoteClick },		//04// Notes button
			   { img: "img/btn_img/btnMenu.png", imgO: "img/btn_img/btnMenuO.png", x: 576, y: 300, w: 128, h: 32, over: false, click: onMenuClick },		//05// Menu button
			   { img: "img/btn_img/btnRetry.png", imgO: "img/btn_img/btnRetryO.png", x: 320, y: 300, w: 128, h: 32, over: false, click: onRetryClick },		//06// Retry button
			   { img: "img/btn_img/btnExit.png", imgO: "img/btn_img/btnExitO.png", x: 448, y: 576, w: 128, h: 32, over: false, click: onExitClick },		//07// Exit button
			   { img: "img/btn_img/btnResume.png", imgO: "img/btn_img/btnResumeO.png", x: 448, y: 384, w: 128, h: 32, over: false, click: onResumeClick },	//08// Resume button
			   { img: "img/btn_img/btnExit.png", imgO: "img/btn_img/btnExitO.png", x: 448, y: 576, w: 128, h: 32, over: false, click: onExitClick },		//09// Exit (from the pause menu) button
			   { img: "img/btn_img/btnNote.png", imgO: "img/btn_img/btnNoteO.png", x: 160, y: 140, w: 128, h: 32, over: false, click: onNote1Click },		//10// Note1
			   { img: "img/btn_img/btnNote.png", imgO: "img/btn_img/btnNoteO.png", x: 160, y: 180, w: 128, h: 32, over: false, click: onNote2Click }];		//11// Note2

var Screen = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
Screen[0].src = "img/screens/Start.png";
Screen[1].src = "img/screens/Pause.png";
Screen[2].src = "img/screens/Help.png";
Screen[3].src = "img/screens/Notes.png";
Screen[4].src = "img/screens/GameOver.png";
//Screen[5].src = "img/screens/End.png";
Screen[6].src = "img/screens/Note1.png";
Screen[7].src = "img/screens/Note2.png";

var bkg = []; 
bkg[0] = {img:Screen[0]};
bkg[1] = {img:Screen[1]};
bkg[2] = {img:Screen[2]};
bkg[3] = {img:Screen[3]};
bkg[4] = {img:Screen[4]};
bkg[5] = {img:Screen[5]};
bkg[6] = {img:Screen[6]};
bkg[7] = {img:Screen[7]};

// The activeBtns array is set in each enter function for each state and holds the buttons currently on screen.
var activeBtns = [];
var numAssets = 6;
var assetsLoaded = 0;

var mouse = { x: 0, y: 0 }; // Stores mouse position in canvas.

const fps = 30; // or 60. The game's set frame rate all update functions will run at.
const fpsMS = 1/fps*1000; // The frames per second as a millisecond interval.
var updateIval;

window.addEventListener("load", loadAssets);
_canvas.addEventListener("mousemove", updateMouse);
_canvas.addEventListener("click", onMouseClick);

// Listen for key input.
window.addEventListener("keydown", function (e) {

    switch (e.key)
    {
        // Pause game.
        case "Escape":
            if (currState == 1)
                changeState(2);
            else if (currState == 2)
                changeState(1);
            break;
    }
})

// The loadAssets function currently only creates the Image objects for all the buttons.
function loadAssets(event)
{
	for (var i = 0; i < buttons.length; i++)
	{
		var tempBtn = new Image();
		tempBtn.src = buttons[i].img;
		tempBtn.addEventListener("load", onAssetLoad);
		buttons[i].img = tempBtn; // .img used to hold the path string, now it holds the actual image object.
		var tempBtnO = new Image();
		tempBtnO.src = buttons[i].imgO;
		tempBtnO.addEventListener("load", onAssetLoad);
		buttons[i].imgO = tempBtnO;
	}
}

function onAssetLoad(event)
{
	if (++assetsLoaded == numAssets)
		init();
}
			  
function init()
{
	// This function can be called to kick-off the game when all important main/menu assets are loaded.
	changeState(0); // Change to menu state.
}

function changeState(stateToRun)
{
	if (stateToRun >= 0 && stateToRun < states.length) // Just a check to see if the state to run is valid.
	{
		if (currState >= 0) // The only time this doesn't run is the very first state change.
		{
			clearInterval(updateIval); // Stops the current setInterval method, which is the update function for the current state.
			states[currState].exit(); // Will call the appropriate exit function of the current state.
		}
		lastState = currState;
		currState = stateToRun;
		states[currState].enter(); // Will call the appropriate enter function of the current state. For initialization, etc.
		updateIval = setInterval(states[currState].update, fpsMS);
	}
	else
		console.log("Invalid stateToRun!");
}

function enterMenu()
{
	surface.clearRect(0, 0, _canvas.width, _canvas.height);
	console.log("Entering menu state.");
	//_stage.style.backgroundColor = "white";
	//_stage.style.backgroundImage = ""; // Clear any existing background image.
	surface.drawImage(bkg[0].img,
					  0, 0, 1024, 768,
					  0, 0, 1024, 768);
	activeBtns = [ buttons[0], buttons[1], buttons[7] ];
	screenState = 0;
}

function updateMenu()
{
	console.log("In menu state.");
	checkButtons();
	render();
}

function exitMenu()
{
	console.log("Exiting menu state.");
}

function enterGame()
{
	surface.clearRect(0, 0, _canvas.width, _canvas.height);
	console.log("Entering game state.");
	//_stage.style.backgroundColor = "white";
	//_stage.style.backgroundImage = ""; // Clear any existing background image.
	document.getElementById("helpMessage0").innerHTML = "Press escape for help";
	//document.getElementById("helpMessage2").innerHTML = "Hold Shift To Alleviate Boredom";
	activeBtns = []; // Clear the active buttons array.
	screenState = 1;
}

// GAME UPDATE
function updateGame()
{
    updateLevel(); // Call Level manager update function.
}

function exitGame()
{
	console.log("Exiting game state.");
}

function enterPause()
{
	console.log("Entering pause state.");
	//_stage.style.backgroundColor = "white"; // Setup background colour.
	//_stage.style.backgroundImage = "url('img/screens/Pause.png')"; // Setup background image.
	surface.drawImage(bkg[1].img,
					  0, 0, 1024, 768,
					  0, 0, 1024, 768);
	activeBtns = [ buttons[1], buttons[4], buttons[8], buttons[9] ];
}

function updatePause()
{
	console.log("In pause state.");
	checkButtons();
	render();
}

function exitPause()
{
	console.log("Exiting pause state.");
}

function enterHelp()
{
	console.log("Entering help state.");
	//_stage.style.backgroundColor = "white"; // Setup background colour.
	//_stage.style.backgroundImage = "url('img/screens/Help.png')"; // Setup background image.
	surface.drawImage(bkg[2].img,
					  0, 0, 1024, 768,
					  0, 0, 1024, 768);
	activeBtns = [ buttons[2] ];
}

function updateHelp()
{
	console.log("In help state.");
	checkButtons();
	render();
}

function exitHelp()
{
	console.log("Exiting help state.");
}

function enterNote()
{
	//surface.clearRect(0, 0, _canvas.width, _canvas.height);
	console.log("Entering Notes state.");
	//_stage.style.backgroundColor = "white"; // Setup background colour.
	//_stage.style.backgroundImage = "url('img/screens/Notes.png')"; // Setup background image.
	surface.drawImage(bkg[3].img,
					  0, 0, 1024, 768,
					  0, 0, 1024, 768);
	activeBtns = [ buttons[3], buttons[10], buttons[11] ];
}

function updateNote()
{
	console.log("In Notes state.");
	checkButtons();
	render();
}

function exitNote()
{
	console.log("Exiting Notes state.");
}

function enterEnd()
{
	console.log("Entering End state.");
	//_stage.style.backgroundColor = "white"; // Setup background colour.
	activeBtns = [ buttons[6] ];
}

function updateEnd()
{
	console.log("In End state.");
	checkButtons();
	render();
}

function exitEnd()
{
	console.log("Exiting End state.");
}

function enterOver()
{
	console.log("Entering Game Over state.");
	//_stage.style.backgroundColor = "white"; // Setup background colour.
	surface.drawImage(bkg[4].img,
					  0, 0, 1024, 768,
					  0, 0, 1024, 768);
	activeBtns = [ buttons[5], buttons[6] ];
}

function updateOver()
{
	console.log("In Game Over state.");
	checkButtons();
	render();
}

function exitOver()
{
	console.log("Exiting Game Over state.");
}

// This checkButtons function is basically a box-collision-based test with the mouse location and each active button.
function checkButtons()
{
	for (var i = 0; i < activeBtns.length; i++)
	{
		activeBtns[i].over = false;
		if(!(mouse.x < activeBtns[i].x ||
			 mouse.x > activeBtns[i].x+activeBtns[i].w ||
			 mouse.y < activeBtns[i].y ||
			 mouse.y > activeBtns[i].y+activeBtns[i].h))
		{
			activeBtns[i].over = true; // If our mouse is inside the button box, flip the over flag to true.
		}
	}
}
/* If we click the mouse and one of the buttons happens to have their over flag set to true, run its click function.
   I need to do this because my buttons are drawn as part of the canvas and can't have events on them. */
function onMouseClick()
{
	for (var i = 0; i < activeBtns.length; i++)
	{
		if (activeBtns[i].over == true)
		{	
			activeBtns[i].click();
			break;
		}		
	}
}

// Basically being used just for each button. Draws the button image based on its over property.
function render()
{
    //surface.clearRect(0, 0, _canvas.width, _canvas.height);

	document.body.style.cursor = "default";
	for (var i = 0; i < activeBtns.length; i++)
	{
		if (activeBtns[i].over == true)
		{
			surface.drawImage(activeBtns[i].imgO, activeBtns[i].x, activeBtns[i].y);
			document.body.style.cursor = "pointer";
		}
		else
			surface.drawImage(activeBtns[i].img, activeBtns[i].x, activeBtns[i].y);
	}


}

function onStartClick()
{
	changeState(1);
}

function onHelpClick()
{
	changeState(5);
}

function onBackClick()
{
	if (screenState == 0)
		changeState(0);
	else if (screenState == 1){
		updateLevel();
		changeState(2);
	}
}

function onBackNoteClick()
{
	updateLevel();
	changeState(2);
}

function onNoteClick()
{
	changeState(3);
}

function onMenuClick()
{
	location.reload();
}

function onRetryClick()
{
	location.reload();
	updateLevel();
}

function onExitClick()
{
	
	if (screenState == 0)
		changeState(0);
	else if (screenState == 1)
		changeState(0);
}

function onResumeClick()
{
	changeState(1);
}

function onNote1Click()
{
    playPaperClip();
	changeState(3);
	surface.drawImage(bkg[6].img,
					  0, 0, 531, 750,
					  442, 8, 531, 750);
}

function onNote2Click()
{
    playPaperClip();
	changeState(3);
	surface.drawImage(bkg[7].img,
					  0, 0, 531, 750,
					  442, 8, 531, 750);
}

// This function sets the mouse x and y position as it is on the canvas where 0,0 is top-left of canvas.
function updateMouse(event)
{
	var rect = _canvas.getBoundingClientRect();
	mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
}	