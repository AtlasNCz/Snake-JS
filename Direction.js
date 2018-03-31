class Direction{
	constructor(name,opposing){
		this.name = name;
		this.opposing = opposing;
	}
	is_opposing(direction){
		if(this.opposing == direction.name){
			return 1; 
		}
		return 0;
	}
}