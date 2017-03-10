//-----------------------------------------------------------------------------
// Asset manager script. Provides functions to load assets in different cases.
//-----------------------------------------------------------------------------


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