function innit(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	resize_canvas();
	config();
	start();
}
function start(){
	snake = new Snake(parseInt(Math.random()*grid_size-1),parseInt(Math.random()*grid_size-1));
	food = []; 
	loop();
}
function config(){
	interval = 300;
	solid_walls = false;
	grid_size = 32;
	snake_color = "red";
	food_color = "yellow";
	sqr_size = canvas.width/grid_size;
	west = new Direction("west","east");
	east = new Direction("east","west");
	north = new Direction("north","south");
	south = new Direction("south","north");
}
function resize_canvas(){
	if(window.innerHeight >= window.innerWidth){
		canvas.width = window.innerWidth;
		canvas.height =window.innerWidth;
	}else{
		canvas.width = window.innerHeight;
		canvas.height =window.innerHeight;
	}
	grid_size = 32;
	sqr_size = canvas.width/grid_size;
}
function draw_sqr(x,y,color,length){
	var length = length ? length:sqr_size;
	var offset = (sqr_size-length)/2;
	ctx.fillStyle = color;
	ctx.fillRect(x*sqr_size + offset,y*sqr_size + offset,length,length);
}
window.addEventListener("resize",resize_canvas);
window.addEventListener("keydown",keydown);
function loop(){
	if(snake.dead){
		start();
		return;
	}
	ctx.clearRect(0,0,canvas.width,canvas.height);
	snake.walk();
	snake.eat(food);
	if(!food.length){
		food.push(new Entity(parseInt(Math.random()*grid_size-1),parseInt(Math.random()*grid_size-1)));
	}
	for(var i=0;i<food.length;i++){
		draw_sqr(food[i].x,food[i].y,"yellow",sqr_size/2,sqr_size/2);
	}
	snake.draw();
	setTimeout(loop,interval);
}
function keydown(e){
	switch(e.key){
		case "a":
			snake.facing = west;
			break;
		case "w":
			snake.facing = north;
			break;
		case "d":
			snake.facing = east;
			break;
		case "s":
			snake.facing = south;
			break;
	}
}