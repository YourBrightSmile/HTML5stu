
var Player = {
	
	//飞机的Dom节点
	ele:null,
	
	//开火定时器
	fireTimer:null,
	
	hp:4,
	hpImg:null,
	init:function(){
		
		this.ele = document.createElement("div");
		this.hpImg = document.getElementsByClassName("hp");
		
		
		this.ele.className = "player";
		//把飞机放进body中
		document.body.appendChild(this.ele);
		$(this.ele).css({
			"top":window.innerHeight+"px",
			"left":"40%"
		});
		this.intoGame();
	},
	
	//玩家进入游戏的动画
	intoGame: function(){
		var self = this;
		$(this.ele).animate({"top":"70%"},900,"linear",function(){
			gameEngine.showStatus();
			self.autoFire()
		});
	},
	//自动开火
	autoFire:function(){
		this.fireTimer =setInterval(function(){
			
			var bullet = new Bullet();
			bullet.init();
			
		},200);
		
	}
	
};
