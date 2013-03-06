var canvas;
var context;

$(document).ready(function(){
	canvas = $('#game');
	if(canvas.getContext) {
		context = canvas.getContext('2d');
	}
});