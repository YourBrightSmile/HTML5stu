
function Bullet(){
	
	this.ele = document.createElement("div");
	
	//给每个子弹一个不同的id
	this.id = parseInt(Math.random()*1000000);
	
	this.init = function(){
		
		this.ele.className = "bullet";
		document.body.appendChild(this.ele);
		
		//
		gameEngine.bulletList[this.id] = this;
		
		$(this.ele).css({
			"top": Player.ele.offsetTop-5+"px",
			"left": Player.ele.offsetLeft + Player.ele.offsetWidth/2-this.ele.offsetWidth/2+"px"
		});
		this.move();
	}
	//子弹移动
	this.move = function(){
		var self = this;
		$(this.ele).animate({
			"top":"0px"
		},this.ele.offsetTop,"linear",function(){
			self.removeSelf();
		});
	}
	//子弹消除
	this.removeSelf = function(){
		
		$(this.ele).remove();
	}
}
