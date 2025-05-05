let a = []
let foodarr = []
function setup() 
{
	createCanvas(1000, 700);


	for(let i = 0;i<100;i++){
		a.push(new createAnt(100,100,10,random(0,360),1,"searching","leaving"))
	}
	for(let i = 0; i<1;i++){
		foodarr.push(new food(500,650,30))
	}
}

function draw()
{
	background(220)
	fill("brown")
	circle(100,100,20)
	fill("white")
	for(let i = 0; i<a.length;i++){
		a[i].move()
		a[i].show()
	}
	for(let i = 0; i<foodarr.length;i++){
		foodarr[i].display()
	}
}


class createAnt{
	constructor(x,y,s,dir,speed,action,actionpar){
		this.x = x
		this.y = y
		this.size = s
		this.dir = dir
		this.speed = speed
		this.dis = dist(100,100,this.x,this.y)
		this.action = action
		this.actionpar = actionpar
		this.fermone = [new xogy(100,100),new xogy(100,100)]
		this.returnord = 0
		this.fermonedis = dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y)
	}
	move(){
		//console.log(this.action)
		if(this.action == "searching"){
			//console.log("sss")
			let change = random(-0.5,0.5)
			this.dir += change
			this.x += this.speed*cos(this.dir)
			this.y += this.speed*sin(this.dir)

			this.fermone.push(new xogy(this.x,this.y))
			if(this.actionpar == "leaving"){
				if(this.dis > dist(100,100,this.x,this.y)){
					//console.log(change)
					this.dir = -+ change
				}
			}
			if(this.y < 0+(this.size/2)){
				this.dir = -100
			}
			if(this.y > 700-(this.size/2)){
				this.dir = 0-random(5,10)
			}
			if(this.x < 0+(this.size/2)){
				this.dir = 0+random(-10,10)
			}
			if(this.x > 1000-(this.size/2)){
				this.dir = 180-random(-10,10)
				this.actionpar = "hasHit"
			}


			this.x += this.speed*cos(this.dir)
			this.y += this.speed*sin(this.dir)
			
			for(let i = 0; i<foodarr.length;i++){
				if(dist(foodarr[i].x,foodarr[i].y,this.x,this.y) < (this.size/2)+(foodarr[i].size/2)){
					this.action = "getting food"
					this.actionpar = "returning"
					console.log("w")
				}
			}

		}
		if(this.action == "getting food"){
			if(this.actionpar == "returning"){
				if (this.returnord == 0){
					this.returnord = this.fermone.length-1
					console.log(this.fermone.length)
				}
				for(let i = 0; i<this.fermone.length;i=i+10){
					circle(this.fermone[i].x,this.fermone[i].y,10)
				}
				let change = random(-0.5,0.5)
				this.dir += change
				this.x += this.speed*cos(this.dir)
				this.y += this.speed*sin(this.dir)
				
				if(this.fermonedis < dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y)){
					console.log(this.fermonedis)
					console.log(dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y))
					//console.log(change)
					this.x -= this.speed*cos(this.dir)
					this.y -= this.speed*sin(this.dir)
					//this.dir -= change
				} else if (dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y) < 20){
					if (this.returnord > 10){
						this.returnord -= 10
					} else{
						this.returnord = 1
					}
				}
				if(30 > dist(100,100,this.x,this.y)){
					this.actionpar = "getting more"
				}
			} else if (this.actionpar == "getting more"){

			}
			


			
		}
		this.dis = dist(100,100,this.x,this.y)
	}
	show(){
		if(this.action == "getting food"){
			fill('brown')
		}else {
			fill('white')
		}
		circle(this.x,this.y,this.size)
		line(this.x,this.y,this.x+(this.size*cos(this.dir)),this.y+(this.size*sin(this.dir)))
		
	}




}


class food{
	constructor(x,y,s) {
		this.x = x
		this.y = y
		this.size = s
	}
	display(){
		circle(this.x,this.y,this.size)
	}
}



class xogy{
	constructor(x,y){
		this.x = x
		this.y = y
	}
}