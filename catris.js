var canvas;
var context;
var size = 30;
var speed = 400;
var ticker = null;
var gridcolor = '#eeeeee';

var shapes = {
	i: [[['0/i_01',0,0,0],['0/i_02',0,0,0],['0/i_03',0,0,0],['0/i_04',0,0,0]],
		[[0,0,0,0],['90/i_04','90/i_03','90/i_02','90/i_01'],[0,0,0,0],[0,0,0,0]],
		[[0,0,'180/i_04',0],[0,0,'180/i_03',0],[0,0,'180/i_02',0],[0,0,'180/i_01',0]],
		[[0,0,0,0],[0,0,0,0],['270/i_01','270/i_02','270/i_03','270/i_04'],[0,0,0,0]]],
	
	o: [[['0/o_01','0/o_02',0,0],['0/o_03','0/o_04',0,0],[0,0,0,0],[0,0,0,0]],
		[['90/o_03','90/o_01',0,0],['90/o_04','90/o_02',0,0],[0,0,0,0],[0,0,0,0]],
		[['180/o_04','180/o_03',0,0],['180/o_02','180/o_01',0,0],[0,0,0,0],[0,0,0,0]],
		[['270/o_02','270/o_04',0,0],['270/o_01','270/o_03',0,0],[0,0,0,0],[0,0,0,0]]],
	
	l: [[[0,0,'0/l_01',0],['0/l_02','0/l_03','0/l_04',0],[0,0,0,0],[0,0,0,0]],
		[[0,'90/l_02',0,0],[0,'90/l_03',0,0],[0,'90/l_04','90/l_01',0],[0,0,0,0]],
		[[0,0,0,0],['180/l_02','180/l_03','180/l_04',0],[0,0,'180/l_01',0],[0,0,0,0]],
		[['270/l_01','270/l_04',0,0],[0,'270/l_03',0,0],[0,'270/l_02',0,0],[0,0,0,0]]],
	
	j: [[['0/j_01',0,0,0],['0/j_02','0/j_03','0/j_04',0],[0,0,0,0],[0,0,0,0]],
		[[0,'90/j_02','90/j_01',0],[0,'90/j_03',0,0],[0,'90/j_04',0,0],[0,0,0,0]],
		[[0,0,0,0],['180/j_04','180/j_03','180/j_02',0],[0,0,'180/j_01',0],[0,0,0,0]],
		[[0,'270/j_04',0,0],[0,'270/j_03',0,0],['270/j_01','270/j_02',0,0],[0,0,0,0]]],
	
	t: [[[0,'0/t_01',0,0],[0,'0/t_02','0/t_03',0],[0,'0/t_04',0,0],[0,0,0,0]],
		[[0,0,0,0],['90/t_04','90/t_02','90/t_01',0],[0,'90/t_03',0,0],[0,0,0,0]],
		[[0,'180/t_04',0,0],['180/t_03','180/t_02',0,0],[0,'180/t_01',0,0],[0,0,0,0]],
		[[0,'270/t_03',0,0],['270/t_01','270/t_02','270/t_04',0],[0,0,0,0],[0,0,0,0]]],
	
	s: [[['0/s_01',0,0,0],['0/s_02','0/s_03',0,0],[0,'0/s_04',0,0],[0,0,0,0]],
		[[0,'90/s_02','90/s_01',0],['90/s_04','90/s_03',0,0],[0,0,0,0],[0,0,0,0]],
		[[0,'180/s_04',0,0],[0,'180/s_03','180/s_02',0],[0,0,'180/s_01',0],[0,0,0,0]],
		[[0,0,0,0],[0,'270/s_03','270/s_04',0],['270/s_01','270/s_02',0,0],[0,0,0,0]]],
	
	z: [[[0,0,'0/z_01',0],[0,'0/z_02','0/z_03',0],[0,'0/z_04',0,0],[0,0,0,0]],
		[[0,0,0,0],['90/z_04','90/z_02',0,0],[0,'90/z_03','90/z_01',0],[0,0,0,0]],
		[[0,0,'180/z_04',0],[0,'180/z_03','180/z_02',0],[0,'180/z_01',0,0],[0,0,0,0]],
		[[0,0,0,0],['270/z_01','270/z_03',0,0],[0,'270/z_02','270/z_04',0],[0,0,0,0]]],

};


current = {
	shape: null,
	x: 4,
	y: 0,
	r: 0,
	countdown: 3,
	next: null
};

var tetris = {
	unpressed: true,
	//keep track of rotation (r)
	//current (x,y) and next (x0,y0) positions, where x,y is the top left corner of the 4x4 grid

	init: function() {
		context.strokeStyle = gridcolor;
		context.lineWidth = 1;
		tetris.score = 0;
		tetris.speed = 500; //ms per tick
		tetris.matrix = [[1,0,0,0,0,0,0,0,0,0,0,1],	//this is what happens when you're too lazy to check for bounds
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
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1]];
		var x,y;
		for(x=.5;x<=canvas.width+.5;x+=size){
			context.beginPath();
			context.moveTo(x, 0);
			context.lineTo(x, canvas.height);
    		context.stroke();
		}
		for(y=.5;y<=canvas.height+.5;y+=size){
			context.beginPath();
			context.moveTo(0, y);
			context.lineTo(canvas.width, y);
    		context.stroke();
		}
		tetris.nextShape();
		tetris.nextShape();

		//init handlers
		var key = { space: 32, left: 37, up: 38, right: 39, down: 40 };

		$(document).keydown(function(e){
			if(tetris.unpressed && ticker){
			    switch(e.keyCode){
			    	case 37: //left
			    		tetris.move('left');
			    		break;
			    	case 39: //right
			    		tetris.move('right');
			    		break;
			    	case 40: //down
			    		tetris.down();
			    		break;
			    	case 38: //up
			    		tetris.rotate();
			    		break;
			    	case 37: //space
			    		tetris.down();
			    		break;
			    }
			    tetris.unpressed = true;
			}

		});
	},
	start: function() {
		ticker = window.setInterval(tetris.tick, speed);
		console.log('start game');
	},
	tick: function() {
		console.log('tick');
		tetris.down();
	},
	drop: function() {
		//keypress: spacebar
		//drops a piece to end, if possible

	},
	removeSelf: function() {
		//erases from old position
		for (m = 0; m < 4; m++) {	//row first (y=m)
			for (n = 0; n < 4; n++) {	//then column (x=n)
				//iterate through each cell of the 4x4
				if (current.shape[current.r][m][n]) {	//if the cell is nonzero for the shape
					tetris.matrix[current.y+m][current.x+n+1] = 0; 
					tetris.repaint(current.x+n,current.y+m);
				}
			}
		}
	},
	move: function(dir) {
		//moves the block if there's no collision
		tetris.removeSelf();
		var y0 = current.y;
		var x0 = current.x + ((dir == "left") ? -1 : 1);
		if(tetris.canMove(current.r,x0,y0)){
			current.x = x0;
			current.y = y0;
		}
		tetris.update(current.r,current.x,current.y);
	},
	down: function() {
		//moves the block if there's no collision
		tetris.removeSelf();
		var x0 = current.x;
		var y0 = current.y + 1;
		if(tetris.canMove(current.r,x0,y0)){
			current.x = x0;
			current.y = y0;
		}
		else{
			if(--current.countdown == 0){
				tetris.update(current.r,current.x,current.y);
				tetris.nextShape();

			}
		}
		tetris.update(current.r,current.x,current.y);
	},
	canMove: function(r0,x0,y0) {
		//is someone in my way?
		console.log('can i move?');
		var m,n;
		for (m = 0; m < 4; m++) {
			for (n = 0; n < 4; n++) {
				if( current.shape[r0][m][n] && tetris.matrix[y0 + m][x0 + n+1]){
					console.log('i cant move');
					return false;

				}
			}
		}
		return true;
	},
	rotate: function() {
		tetris.removeSelf();
		var r0 = (current.r + 1) % 4;
		if(tetris.canMove(r0,current.x,current.y)){
			console.log('cant rotate nooo');
			current.r = r0;
		}
		tetris.update(current.r,current.x,current.y);
	},
	touchdown: function() {

	},
	clearLine: function() {
		//condition: bottom row is filled
		//todo: move all pieces down one row
		//		update score
	},
	nextShape: function() {
		//reset current shape
		current.shape = current.next;
		current.x = 4;
		current.y = 0;
		current.r = 0;
		current.countdown = 3;
		
		//generates a new next shape
		var l = Object.keys(shapes).length;
		var r = Math.floor( Math.random() * l);
		var s = Object.keys(shapes)[r];
		current.next = shapes[s];
	},
	update: function(r,x,y) {
		//updates position of current block
		var m,n;
		for (m = 0; m < 4; m++) {	//row first (y=m)
			for (n = 0; n < 4; n++) {	//then column (x=n)
				//iterate through each cell of the 4x4
				if (current.shape[r][m][n]) {	//if the cell is nonzero for the shape
					tetris.matrix[y+m][x+n+1] = current.shape[r][m][n]; 
					console.log('('+current.x+','+current.y+')');
					tetris.repaint(x+n,y+m,current.shape[r][m][n]);
				}
			}
		}
	},
	refresh: function(){
		//update score and gameboard
	},
	repaint: function(x,y,img_path){
		//maps cats to the matrix on canvas

		context.strokeStyle = gridcolor;
		context.lineWidth = 1;

		if(img_path){
			var img = new Image();
			img.src = 'img/'+img_path+'.png';
			img.onload = function () {
				context.drawImage(img, x*size, y*size, size, size);
			};
		}
		else{
			context.clearRect(x*size+.5,y*size+.5,size,size);
			context.strokeRect(x*size+.5,y*size+.5,size,size);
		}
	},
}
$(document).ready(function(){
	canvas = $('#grid')[0];
	canvas.width = 10*size;
	canvas.height = 20*size;
	context = canvas.getContext('2d');
	tetris.init();
	$('#pause')[0].disabled = true;
	$('#start').click(function(){
		tetris.start();
		$('#start')[0].disabled = true;
		$('#pause')[0].disabled = false;
	});
	$('#pause').click(function(){
		window.clearInterval(ticker);
		ticker = null;
		$('#start')[0].disabled = false;
		$('#pause')[0].disabled = true;
	})
});

