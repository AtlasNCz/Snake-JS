class Snake{
	constructor(x,y){
		this.parts = [];
		this.parts.push(new Entity(x,y));
		this.direction = null;
		this.running_direction = null;
		this.dead = false;
	}
	draw(){
		for(var i=0; i<this.length; i++){
			draw_sqr(this.parts[i].x,this.parts[i].y,snake_color);
		}
	}
	walk(){
		for (var i = this.length - 1; i > 0; i--) {
			this.parts[i].x = this.parts[i-1].x;
			this.parts[i].y = this.parts[i-1].y;
		};
		switch(this.direction){
			case west:
				this.running_direction = west;
				this.x--;
				break;
			case north:
				this.running_direction = north;
				this.y--;
				break;
			case east:
				this.running_direction = east;
				this.x++;
				break;
			case south:
				this.running_direction = south;
				this.y++;
				break;
		}
		if(this.x < 0){
			if(solid_walls) this.dead = true;
			else this.x = grid_size-1;
		}else if(this.x > grid_size-1){
			if(solid_walls) this.dead = true;
			else this.x = 0;
		}
		if(this.y < 0){
			if(solid_walls) this.dead = true;
			else this.y = grid_size-1;
		}else if(this.y > grid_size-1){
			if(solid_walls) this.dead = true;
			else this.y = 0;
		}
	}
	eat(food){
		for(var i=0;i<food.length;i++){
			if(food[i].x == this.x && this.y == food[i].y){
				food.pop();
				this.grow();
			}
		}
		for(var i=1;i<this.length;i++){
			if(this.parts[i].x == this.x && this.y == this.parts[i].y && this.length >2){
				log("ate myself, im dead");
				this.dead = true;
			}
		}
	}
	get length(){
		return this.parts.length;
	}
	set facing(direction){
		if(this.direction && this.running_direction && this.running_direction.is_opposing(direction) && this.length>1){
			return;
		}
		this.direction = direction;
	}
	grow(){
		this.parts.push(new Entity(this.parts[this.length-1].x,this.parts[this.length-1].y));
	}
	get x(){
		return this.parts[0].x;
	}
	get y(){
		return this.parts[0].y;
	}
	set x(x){
		this.parts[0].x = x;
	}
	set y(y){
		this.parts[0].y = y;	
	}
}