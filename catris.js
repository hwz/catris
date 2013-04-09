var bgCanvas;
var context;
var nextCanvas;
var nextContext;
var size = 30;
var speed = 500;
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
		[[0,0,0,0],['180/l_04','180/l_03','180/l_02',0],['180/l_01',0,0,0],[0,0,0,0]],
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

var imgCache = {};

current = {
	shape: null,
	x: 4,
	y: 0,
	r: 0,
	countdown: 2,
	next: null
};

var tetris = {
	unpressed: true,
	score: 0,
	lines: 0,
	speed: 500, //ms per tick


	init: function() {

		tetris.score = 0;
		tetris.lines = 0;
		tetris.speed = 500;

		current = {
			shape: null,
			x: 4,
			y: 0,
			r: 0,
			countdown: 2,
			next: null
		};
		
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
		
		tetris.nextShape();	//twice to set next as well as current shape
		tetris.nextShape();

		tetris.drawGrid(bgCanvas);
		tetris.drawGrid(nextCanvas);

		//init handlers
		var key = { space: 32, left: 37, up: 38, right: 39, down: 40 };

		$(document).keydown(function(e){
			switch(e.keyCode){ //start and pause
				case 80: //p or P
				case 112: {
					tetris.pause();
					break;
				}
				case 83: //s or S
				case 115: {
					tetris.start();
					break;
				}
			}
			if(tetris.unpressed && ticker){
			    switch(e.keyCode){
			    	case 37: {//left
			    		//tetris.removeSelf();
			    		tetris.move('left');
			    		break;
			    	}
			    	case 39: {//right
			    		//tetris.removeSelf();
			    		tetris.move('right');
			    		
			    		break;
			    	}
			    	case 40: {//down
			    		//tetris.removeSelf();
			    		tetris.down();
			    		break;
			    	}
			    	case 38: {//up
			    		//tetris.removeSelf();
			    		tetris.rotate();
			    		break;
			    	}
			    	case 32: {//space
			    		//tetris.removeSelf();
			    		tetris.drop();
			    		break;
			    	}
			    }
			    tetris.unpressed = true;
			}

		});
	},
	cacheMeUp: function(){
		//cache me up, before you go-go		
		var rotations = ['0','90','180','270'];
		for(var r = 0; r <= 3; r++){
			for (var key in shapes) {
				var obj = shapes[key];
				for (var i = 1; i <= 4; i++){
					var img = new Image();
					img.src = 'img/'+rotations[r]+'/'+key+'_0'+i+'.png';
					imgCache[rotations[r]+'/'+key+'_0'+i] = img;
				}
			}
		}
	},
	draw: function() {
		fgContext = fgCanvas.getContext('2d');
		fgContext.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
		for (m = 0; m < 4; m++) {	//row first (y=m)
			for (n = 0; n < 4; n++) {	//then column (x=n)
				//iterate through each cell of the 4x4
				if (current.shape[current.r][m][n]) {	//if the cell is nonzero for the shape\\
					fgContext.drawImage(imgCache[current.shape[current.r][m][n]], (current.x+n)*size, (current.y+m)*size, size, size);
				}
			}
		}
	},
	drawGrid: function(c) {
		//ctx.fillStyle="#FFFFFF";
		//ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx = c.getContext('2d');
		ctx.strokeStyle = gridcolor;
		ctx.lineWidth = 1;
		var n;
		ctx.beginPath();
		for(n=.5;n<=bgCanvas.width+.5;n+=size){
			ctx.moveTo(n, 0);
			ctx.lineTo(n, bgCanvas.height);		}
		for(n=.5;n<=bgCanvas.height+.5;n+=size){
			ctx.moveTo(0, n);
			ctx.lineTo(bgCanvas.width, n);
		}
		ctx.stroke();
	},
	drawNext: function() {
		nextContext = nextCanvas.getContext('2d');
		nextContext.clearRect(0,0,nextCanvas.width, nextCanvas.height);
		tetris.drawGrid(nextCanvas);
		for (m = 0; m < 4; m++) {	//row first (y=m)
			for (n = 0; n < 4; n++) {	//then column (x=n)
				//iterate through each cell of the 4x4
				if (current.next[0][m][n]) {	//if the cell is nonzero for the shape
					nextContext.drawImage(imgCache[current.next[0][m][n]], n*size, m*size, size, size);
				}
			}
		}
	},
	tick: function() {
		console.log('tick');
		tetris.down();
	},
	drop: function() {
		//keypress: spacebar
		//drops a piece to end, if possible
		console.log("drop");
		var x0 = current.x;
		var y0 = current.y;
		while(tetris.canMove(current.r,x0,y0+1)){
			var y0 = y0 + 1;	//how low can you go?
			console.log(y0);
		}
		current.y = y0;	//this low
		tetris.draw(current.r,current.x, current.y);
		current.countdown--;
		 
	},
	removeSelf: function(r,x,y) {
		//erases from old position
		for (m = 0; m < 4; m++) {	//row first (y=m)
			for (n = 0; n < 4; n++) {	//then column (x=n)
				//iterate through each cell of the 4x4
				if (current.shape[r][m][n]) {	//if the cell is nonzero for the shape
					tetris.matrix[y+m][x+n+1] = 0; 
					tetris.repaint(x+n,y+m);
				}
			}
		}
	},
	move: function(dir) {
		//moves the block if there's no collision
		//tetris.removeSelf(current.r,current.x,current.y);
		console.log("move "+dir);
		var y0 = current.y;
		var x0 = current.x + ((dir == "left") ? -1 : 1);
		if(tetris.canMove(current.r,x0,y0)){
			current.x = x0;
			current.y = y0;
		}
		tetris.draw(current.r,current.x, current.y);
	},
	down: function() {
		//moves the block if there's no collision
		//tetris.removeSelf(current.r,current.x,current.y);
		console.log("down");
		var x0 = current.x;
		var y0 = current.y + 1;
		if(tetris.canMove(current.r,x0,y0)){
			current.x = x0;
			current.y = y0;
		}
		else{
			if(--current.countdown <= 0){
				tetris.touchdown(tetris.refresh);
			}
		}
		tetris.draw(current.r,current.x, current.y);
	},
	canMove: function(r0,x0,y0) {
		//is someone in my way?
		var m,n;
		for (m = 0; m < 4; m++) {
			for (n = 0; n < 4; n++) {
				if( current.shape[r0][m][n] && tetris.matrix[y0+m][x0+n+1]){
					return false;
				}
			}
		}
		return true;
	},
	rotate: function() {
		console.log('rotate');
		var r0 = (current.r + 1) % 4;
		
		if(tetris.canMove(r0,current.x,current.y)){
			current.r = r0;
		}
		tetris.draw(current.r,current.x, current.y);
		 
	},
	touchdown: function(rf) {
		console.log("touch down");
		tetris.update(current.r,current.x, current.y, tetris.clearLines);
    	tetris.nextShape();
    	tetris.drawNext();
    	tetris.updateGame();
    	rf();
	},
	clearLines: function() {
		var y = 19;
		while(y>0){
			if($.inArray(0,tetris.matrix[y]) == -1){
				//line is full
				tetris.matrix.splice(y, 1);
				tetris.matrix.unshift([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
				tetris.lines++;
			}	
			else{
				y--;
			}
		}
	},
	updateGame: function() {
		speed = speed*(1+tetris.lines/10);
		$('#numLines').html(tetris.lines);
	},
	nextShape: function() {
		if(!current.shape || tetris.canMove(0,4,0)){
			//update the current shape
			current.shape = current.next;
			current.x = 4;
			current.y = 0;
			current.r = 0;
			current.countdown = 2;

			//generates a new next shape
			var l = Object.keys(shapes).length;
			var r = Math.floor( Math.random() * l);
			var s = Object.keys(shapes)[r];
			current.next = shapes[s];
		}
		else{
			tetris.pause();
			alert("game over!");
			tetris.init();
		}
	},
	update: function(r,x,y, cl) {
		//updates position of current block
		console.log("update");
		var m,n;
		for (m = 0; m < 4; m++) {	//row first (y=m)
			for (n = 0; n < 4; n++) {	//then column (x=n)
				//iterate through each cell of the 4x4
				if (current.shape[r][m][n]) {	//if the cell is nonzero for the shape
					tetris.matrix[y+m][x+n+1] = current.shape[r][m][n]; 
					console.log((y+m)+ ', '+(x+n)+' is ' + tetris.matrix[y+m][x+n+1]);
					tetris.repaint(x+n,y+m);
					//console.log('('+current.x+','+current.y+')');
				}
			}
		}
		cl();
	},
	repaint: function(x,y){
		//maps cats to the matrix on canvas
		context.strokeStyle = gridcolor;
		context.lineWidth = 1;
		if(!tetris.matrix[y][x+1] || tetris.matrix[y][x+1]==1){
			context.clearRect(x*size,y*size,size,size);
			context.strokeRect(x*size,y*size,size,size);
		}
		else{
			context.clearRect(x*size,y*size,size,size);
			if(imgCache[tetris.matrix[y][x+1]]){
				//console.log('painted '+x+', '+y+ ' with '+tetris.matrix[y][x+1]);
				context.drawImage(imgCache[tetris.matrix[y][x+1]], x*size, y*size, size, size);
			}
			else{
				var img = new Image();
				img.src = 'img/'+tetris.matrix[y][x+1]+'.png';
				img.onload = function () {
					context.drawImage(img, x*size, y*size, size, size);
				};	
			}
		} 	
	},
	refresh: function(){
		var m,n;
		var count = 0;
		for (m = 0; m < tetris.matrix.length; m++) {	//row first (y=m)
			for (n = 0; n < tetris.matrix[0].length; n++) {	//then column (x=n)
				tetris.repaint(n,m);
				count++;
			}
		}
	},
	start: function() {
		ticker = window.setInterval(tetris.tick, speed);
		console.log('start game');
		$('#start')[0].disabled = true;
		$('#pause')[0].disabled = false;
		tetris.drawNext();
	},
	pause: function(){
		window.clearInterval(ticker);
		ticker = null;
		$('#start')[0].disabled = false;
		$('#pause')[0].disabled = true;
	}
}
$(document).ready(function(){
	tetris.cacheMeUp();

	bgCanvas = $('#bg')[0];
	bgCanvas.width = 10*size;
	bgCanvas.height = 20*size;
	context = bgCanvas.getContext('2d');

	fgCanvas = $('#fg')[0];
	fgCanvas.width = 10*size;
	fgCanvas.height = 20*size;
	fgContext = fgCanvas.getContext('2d');

	nextCanvas = $('#next')[0];
	nextCanvas.width = nextCanvas.height = 4*size;
	nextContext = nextCanvas.getContext('2d');

	tetris.init();
	$('#pause')[0].disabled = true;
	$('#start').click(function(){
		tetris.start();
	});
	$('#pause').click(function(){
		tetris.pause();
	});
});

