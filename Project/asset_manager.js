//=====================================================================
// Asset manager script. Provides functions to load and handle assets.
//=====================================================================

var soundEffects = ["audio/gameover.wav", "audio/gunfire.wav", "audio/melee.wav", "audio/select.wav",
                    "audio/laundry.mp3", "audio/locker_close.mp3", "audio/locker_open.mp3", "audio/paper.mp3"];

window.addEventListener("load", loadAudioAssets);

function loadAudioAssets()
{
    for(var i = 0; i < soundEffects.length; i++)
    {
        var tempClip = document.createElement("AUDIO");
        tempClip.src = soundEffects[i];
        soundEffects[i] = tempClip;
    }
}

function playGameOverClip()
{
    soundEffects[0].play();
}

function playGunfireClip()
{
    soundEffects[1].play();
}

function playMeleeClip()
{
    soundEffects[2].play();
}

function playSelectClip()
{
    soundEffects[3].play();
}

function playLaundryClip()
{
    soundEffects[4].play();
}

function playLockerCloseClip()
{
    soundEffects[5].volume = 0.5;
    soundEffects[5].play();
}

function playLockerOpenClip()
{
    soundEffects[6].play();
}

function playPaperClip()
{
    soundEffects[7].play();
}

/* Loads a single image. Variable passed must be a image source string. */
function loadSingleImg(imgToLoad, onLoadFunction)
{
	try {
		if(typeof imgToLoad === "string")
		{
			var temp = new Image();
			temp.src = imgToLoad;
			
			// Call optional function with addEventListener.
			if(typeof onLoadFunction === "function")
			{
				temp.addEventListener("load", onLoadFunction);
			}
			
			return temp;
		}
		else
			throw new Error("Argument is not a string: could not load image.");
	}	
	catch(err) { console.log(err); }
}

/* Loads an array of images from an array of image source strings. Must pass an array of image source strings. 
Optional argument 'onLoadFunction': calls an onLoad function after every image loaded using an addEventListener 
attached to the image.*/
function loadImgArray(imgsToLoad, onLoadFunction)
{
	for(var i = 0; i < imgsToLoad.length; i++)
	{
		if(typeof imgsToLoad[i] === "string")
		{
			var temp = new Image();
			temp.src = imgsToLoad[i];
			
			// Call optional function with addEventListener.
			if(typeof onLoadFunction === "function") {
				temp.addEventListener("load", onLoadFunction);
			}
			
			imgsToLoad[i] = temp;
		}
	}
	
	return imgsToLoad;
}