
function Enemy(eneType,dis){
	
	this.ele = document.createElement("div");
	this.hp=0;
	this.duration=0;
	this.id = parseInt(Math.random()*100000);
	
	this.init = function(){
	
		document.body.appendChild(this.ele);
		gameEngine.enemyList[this.id] = this;
		
		switch(eneType){
			case this.typeSmall:
				this.ele.className = "enemySmall";
				this.hp = this.hpSmall;
				this.duration = this.durationSmall;
				break;
			case this.typeMedium:
				this.ele.className = "enemyMedium";
				this.hp = this.hpMedium;
				this.duration = this.durationMedium;
				break;
			case this.typeLarge:
				this.ele.className = "enemyLarge";
				this.hp = this.hpLarge;
				this.duration = this.durationLarge;
				break;
		}
		$(this.ele).css({
			"left":dis+"px",
			"top":-this.offsetHeight+"px"
		});
		
		this.move();
	
	};
	this.move = function(){
		var self = this;
		$(this.ele).animate({
			"top":window.innerHeight-this.ele.offsetHeight-50+"px"
		},this.duration,"linear",function(){
			$(this).remove();
		});
	};
	
	//当敌机受到攻击
	this.beDamaged = function(){
		this.hp--;
		if(this.hp == 0){
			$(this.ele).remove();
		}
	};
	
	//
	this.removeSelf = function(){
		$(this.ele).remove();
	}
	
}

//敌机类型，血量，飞行时间
Enemy.prototype = {
	typeSmall:1,
	typeMedium:2,
	typeLarge:3,
	
	hpSmall:1,
	hpMedium:3,
	hpLarge:5,
	
	durationSmall:1500,
	durationMedium:2000,
	durationLarge:2500
	
}
