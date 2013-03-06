var canvas;
var context;
var size = 10;
var speed = 500;
var ticker = null;

var shapes = {
		i: [[[0,'0/i_01.png',0,0],[0,'0/i_02.png',0,0],[0,'0/i_03.png',0,0],[0,'0/i_04.png',0,0]],
			[[0,0,0,0],['90/i_04.png','90/i_03.png','90/i_02.png','90/i_01.png'],[0,0,0,0],[0,0,0,0]],
			[[0,0,'180/i_04.png',0],[0,0,'180/i_03.png',0],[0,0,'180/i_02.png',0],[0,0,'180/i_01.png',0]],
			[[0,0,0,0],[0,0,0,0],['270/i_01.png','270/i_02.png','270/i_03.png','270/i_04.png'],[0,0,0,0]]],
		
		o: [[['0/o_01.png','0/o_01.png',0,0],['0/o_03.png','0/o_04.png',0,0],[0,0,0,0],[0,0,0,0]],
			[['90/o_03.png','90/0_01.png',0,0],['90/o_04.png','90/o_02.png',0,0],[0,0,0,0],[0,0,0,0]],
			[['180/o_04.png','180/0_03.png',0,0],['180/o_02.png','180/o_01.png',0,0],[0,0,0,0],[0,0,0,0]],
			[['270/o_02.png','270/0_04.png',0,0],['270/o_01.png','270/o_03.png',0,0],[0,0,0,0],[0,0,0,0]]],
	};
var keyMap = { space: 32, left: 37, up: 38, right: 39, down: 40 };

current = {
		shape: shapes.i,
		x: 4,
		y: 0,
		r: 0,
		x0: 4,	//next pos
		y0: 0, 	//next pos
	};

var tetris = {

	timer: null,
	//keep track of rotation (r)
	//current (x,y) and next (x0,y0) positions, where x,y is the top left corner of the 4x4 grid

	init: function() {
		tetris.score = 0;
		tetris.speed = 500; //ms per tick
		tetris.matrix = [[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
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
		ticker = window.setInterval(tetris.tick, speed);
		console.log('start game');
	},
	tick: function() {
		console.log('tick');
		tetris.move();
		tetris.update(current.r,current.x,current.y,current.x0,current.y0);
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
		current.y0 = current.y + 1;
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
	update: function(r,x,y,x0,y0) {
		//updates positions of current block
		//(x0,y0) is new position 4x4
		//(x,y) is old position 4x4
		//r is its rotated state

		//erases from old position
		for (m = 3; m >= 0; m--) {	//row first (y=m)
			for (n = 3; n >= 0; n--) {	//then column (x=n)
				//iterate through each cell of the 4x4
				if (current.shape[r][n][m]) {	//if the cell is nonzero for the shape
					tetris.matrix[y+m][x+n] = 0; 
				}
			}
		}
		//puts in new position
		for (m = 3; m >= 0; m--) {	//row first (y=m)
			for (n = 3; n >= 0; n--) {	//then column (x=n)
				//iterate through each cell of the 4x4
				if (current.shape[r][n][m]) {	//if the cell is nonzero for the shape
					tetris.matrix[y0+m][x0+n] = current.shape[r][n][m]; 
					console.log('from ('+x+','+y+') to ('+x0+ ',' +y0+')');
				}
			}
		}
		current.y = current.y0;
		current.x = current.x0;
	},
	refresh: function(){
		//update score and gameboard
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
		tetris.start();
	});
	$('#pause').click(function(){
		window.clearInterval(ticker);
		ticker = null;
	})
});

