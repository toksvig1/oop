let a = []
let foodarr = []
let followtrail = []


function setup() 
{
	createCanvas(1000, 700);
	console.log("n2e2w2")
	followtrail = [new xogy(105,105),new xogy(105,105)]
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
		//console.log(a[i].action)
	}
	for(let i = 0; i<foodarr.length;i++){
		foodarr[i].display()
	}
	if(foodarr[0].size <2){
		foodarr = []
		foodarr.push(new food(random(300,800),random(300,650),30))
		followtrail = [new xogy(105,105),new xogy(105,105)]
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
		this.fermone = [new xogy(105,105),new xogy(105,105)]
		this.returnord = 0
		this.fermonedis = dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y)
		this.randomwalk = random(400,2000)
		this.oldx = 500
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
			if(this.fermone.length > this.randomwalk){
				this.action = "justreturning"
			}
			for(let i = 0; i<foodarr.length;i++){
				if(dist(foodarr[i].x,foodarr[i].y,this.x,this.y) < (this.size/2)+(foodarr[i].size/2)){
					this.action = "getting food"
					//for(let i = 0; i<a.length;i++){
					//	a[i].action = "getting food"
					//	a[i].actionpar = "returning"
					//	a[i].fermone = this.fermone
					//}
					followtrail = this.fermone
					this.actionpar = "returning"
					console.log("a")
					//console.log("w")
					foodarr[i].size -= 1
				}
			}

		}
		if(this.action == "getting food"){
			if(this.actionpar == "returning"){
				if (this.returnord == 0){
					this.returnord = this.fermone.length-1
				}
				this.dir = atan2(this.y-this.fermone[this.returnord].y,this.x-this.fermone[this.returnord].x)+3
				let change = random(-0.5,0.5)
				this.dir += change
				this.x += this.speed*cos(this.dir)
				this.y += this.speed*sin(this.dir)
				
				if(this.fermonedis < dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y)){
					this.x -= this.speed*cos(this.dir)
					this.y -= this.speed*sin(this.dir)
				} else if (dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y) < 20){
					if (this.returnord > 10){
						this.returnord -= 10
					} else{
						this.returnord = 1
					}
				}
				if(10 > dist(100,100,this.x,this.y)){
					
					if (followtrail.length == 2){
						this.action = "searching"
						this.actionpar = "leaving"
						this.fermone = followtrail
					} else {
						this.actionpar = "getting more"
						this.fermone = followtrail
					}
					
					this.returnord = 10
				}
				
			} else if (this.actionpar == "getting more"){
				
				this.dir = atan2(this.y-this.fermone[this.returnord].y,this.x-this.fermone[this.returnord].x)+3
				let change = random(-0.5,0.5)
				this.dir += change
				this.x += this.speed*cos(this.dir)
				this.y += this.speed*sin(this.dir)
				if(this.fermonedis < dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y)){
					this.x -= this.speed*cos(this.dir)
					this.y -= this.speed*sin(this.dir)
				} else if (dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y) < 20){
					if (this.returnord < this.fermone.length-10){
						this.returnord += 10
					} else{
						this.returnord = this.fermone.length-1
					}

					
					if(dist(foodarr[0].x,foodarr[0].y,this.x,this.y) < 25){
						this.actionpar = "returning"
						foodarr[0].size -= 1
					}
					if(this.oldx != foodarr[0].x && this.returnord == this.fermone.length-1){
						console.log("oldx")
						this.actionpar = "returning"
						this.oldx = foodarr[0].x
					}

				}
			}
			


			
		}
		if(this.action == "justreturning"){
			//console.log("a")
			if (this.returnord == 0){
				this.returnord = this.fermone.length-1
				//console.log(this.fermone.length)
			}
			//for(let i = 0; i<this.fermone.length;i=i+10){
			//	circle(this.fermone[i].x,this.fermone[i].y,10)
			//}
			this.dir = atan2(this.y-this.fermone[this.returnord].y,this.x-this.fermone[this.returnord].x)+3
			//circle(this.fermone[this.returnord].x,this.fermone[this.returnord].y,20)
			//console.log(this.dir)
			let change = random(-0.5,0.5)
			this.dir += change
			this.x += this.speed*cos(this.dir)
			this.y += this.speed*sin(this.dir)
			
			if(this.fermonedis < dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y)){
				//console.log(this.fermonedis)
				//console.log(dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y))
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
			if(10 > dist(100,100,this.x,this.y)){
				
				if(followtrail.length == 2){
					//console.log("b")
					this.action = "searching"
					this.actionpar = "leaving"
					this.fermone = followtrail
				} else {
					//console.log("v")
					this.action = "getting food"
					this.actionpar = "getting more"
					this.returnord = 10
					this.fermone = followtrail
				}

				
			}
		}
		this.dis = dist(100,100,this.x,this.y)
		//console.log(this.fermone.length)
		//console.log(this.returnord)
		//console.log(this.action)
		if(this.action != "searching"){

		//console.log(this.returnord)
		//console.log(this.fermone.length)
		this.fermonedis = dist(this.fermone[this.returnord].x,this.fermone[this.returnord].y,this.x,this.y)
	}
	}
	show(){
		if(this.action == "getting food"){
			//fill('brown')
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