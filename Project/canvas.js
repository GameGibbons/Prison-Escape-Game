//=========================================================================
// Canvas script. Sets up the canvas and provides basic drawing functions.
//=========================================================================

var _stage = document.getElementById("stage");
var _canvas = document.querySelector("canvas");
_canvas.width = 1024;
_canvas.height = 768;
var surface = _canvas.getContext("2d");