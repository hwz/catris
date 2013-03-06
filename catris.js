var canvas;
var context;
var size = 200;

var tetris = {
	currentShape = tetris.shapes.i;
	//keep track of rotation (r)
	//current (x,y) and next (x0,y0) positions, where x,y is the top left corner of the 4x4 grid

	nextShape = tetris.shapes.i;
	key = { space: 32, left: 37, up: 38, right: 39, down: 40 },

	shapes: {
		i: [[[0,'0/i_01.png',0,0],[0,'0/i_02.png',0,0],[0,'0/i_03.png',0,0],[0,'0/i_04.png',0,0]],
			[[0,0,0,0],['90/i_04.png','90/i_03.png','90/i_02.png','90/i_01.png'],[0,0,0,0],[0,0,0,0]],
			[[0,0,'180/i_04.png',0],[0,0,'180/i_03.png',0],[0,0,'180/i_02.png',0],[0,0,'180/i_01.png',0]],
			[[0,0,0,0],[0,0,0,0],['270/i_01.png','270/i_02.png','270/i_03.png','270/i_04.png'],[0,0,0,0]]],
		
		o: [[['0/o_01.png','0/o_01.png',0,0],['0/o_03.png','0/o_04.png',0,0],[0,0,0,0],[0,0,0,0]],
			[['90/o_03.png','90/0_01.png',0,0],['90/o_04.png','90/o_02.png',0,0],[0,0,0,0],[0,0,0,0]],
			[['180/o_04.png','180/0_03.png',0,0],['180/o_02.png','180/o_01.png',0,0],[0,0,0,0],[0,0,0,0]],
			[['270/o_02.png','270/0_04.png',0,0],['270/o_01.png','270/o_03.png',0,0],[0,0,0,0],[0,0,0,0]]],
	},
	init: function() {
		tetris.score = 0;
		tetris.speed = 500; //ms per tick
		tetris.matrix = [[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1]];

		var x,y;

		for(x=0;x<=canvas.width;x+=size){
			context.beginPath();
			context.moveTo(x, 0);
			context.lineTo(x, canvas.height);
    		context.stroke();
		}
		for(y=0;y<=canvas.height;y+=size){
			context.beginPath();
			context.moveTo(0, y);
			context.lineTo(canvas.width, y);
    		context.stroke();
		}
	},
	start: function() {
		tetris.ticker = window.setInterval(tetris.tick, speed);
	},
	tick: function() {
		console.log('tick');
		move();
		tetris.draw();
	},
	drop: function() {
		//keypress: spacebar
		//drops a piece to end, if possible

	},
	blocked: function() {
		//detects collision
	},
	move: function() {
		//left or right keypress
		currentY++;
	},
	rotate: function() {

	},
	touchdown: function() {

	},
	clearLine: function() {
		//condition: bottom row is filled
		//todo: move all pieces down one row
		//		update score
	},
	nextShape: function() {
		//generates a new piece randomly
		var shapes = [i,j,l,o,s,t,z];
		var r = 1 + Math.random() * 7;
		return shapes[parseInt(r > 7 ? 7 : r, 10)];
	},
	update: function(x,y,r) {
		//updates positions of everything
		for (m = 0; n < m; ++i) {
			for (n = 0; n < 4; ++j) {
				//iterate through each block of the 4x4
				if (currentShape[r][n][m]) {	//if the 1x1 is nonzero
					
				}
			}
		}
	},
	refresh: function(){
		//update score and gameboard
		tetris.matrix
	},
	repaint: function(){
		//maps cats to the matrix on canvas
	}
}
var grid = {
	
}
$(document).ready(function(){
	canvas = $('#grid')[0];
	canvas.width = 10*size;
	canvas.height = 20*size;
	context = canvas.getContext('2d');
	tetris.init();
	$('#start').click(function(){
		
	});
	
});

