var gameEngine = {
	//敌机刷新的定时器
	enemyTimer: null,

	//敌机对象组
	enemyList: {},

	//子弹对象组
	bulletList: {},

	//杀死敌机的积分
	pointCount: 0,

	//初始化游戏的方法
	init: function() {
		this.modeSelect("tou", "gra");

	},

	//模式选择：选择不同的模式执行不同的方法
	modeSelect: function() {
		var self = this;

		if(arguments) {
			for(var i = 0; i < arguments.length; i++) {
				$('#' + arguments[i]).click(function() {
					$("#mode-selector").remove();
					self.modeRun(this.innerText);
				});
			}
		}
	},

	//选择模式之后开始运行
	modeRun: function(modeType) {
		// 初始化玩家的飞机
		Player.init();
		switch(modeType) {
			case "Touch Mod":
				this.touchListening();
				break;
			case "Gravity Mod":
				this.gravityListening();
				break;
		}
		this.enemySpawn();
		this.collideListening();
	},

	//显示状态栏
	showStatus: function() {
		$("#hp").show();
		$("#point").show();
	},
	//监听触屏控制
	touchListening: function() {
		var startX, startY, endX, endY, moveX, moveY;
		$(".player").on("touchstart touchmove", function(event) {
			//防止默认事件执行
			event.preventDefault();

			var x = this.offsetLeft;
			var y = this.offsetTop;

			switch(event.type) {
				case "touchstart":
					startX = event.originalEvent.targetTouches[0].clientX;
					startY = event.originalEvent.targetTouches[0].clientY;
					break;
				case "touchmove":
					endX = event.originalEvent.targetTouches[0].clientX;
					endY = event.originalEvent.targetTouches[0].clientY;

					moveX = endX - startX;
					moveY = endY - startY

					if(x < 0) {
						$(this).css({
							"left": "0px"
						});
					}

					if(x > window.innerWidth - this.offsetWidth) {
						$(this).css({
							"left": window.innerWidth - this.offsetWidth + "px"
						});
					}
					$(this).css({
						"left": this.offsetLeft + moveX + "px",
						"top": this.offsetTop + moveY + "px"
					});

					if(y < 0) {
						$(this).css({
							"top": "0px"
						});
					}
					if(y > window.innerHeight - this.offsetHeight - 50) {
						$(this).css({
							"top": window.innerHeight - this.offsetHeight - 50 + "px"
						});
					}

					startX = endX;
					startY = endY;
					break;
			}

		});

	},
	
	//重力监听
	gravityListening:function(){
		
		window.addEventListener("deviceorientation",function(event){
			var playerLeft = Player..ele.offsetLeft;
			var playerTop = Player.ele.offsetTop;
			
			if((playerLeft + 0.3*event.gamma >0) && (playerLeft + 0.3*event.gamma < window.innerWidth-89)){
				playerLeft += 0.3*event.gamma;
			}
			
			if((playerTop + 0.5*event.beta >0) && (playerTop + 0.5*event.beta < window.innerHeight-89-50)){
				playerTop += 0.5*event.beta;
			}
			
			
			Player.ele.style.left = playerLeft;
			Player.ele.style.top = playerTop;
		})
		
	},
	
	
	//敌军出击 
	enemySpawn: function() {
		this.enemyTimer = setInterval(function() {

			buildEnemy(0.8, 106, Enemy.prototype.typeLarge);
			buildEnemy(0.6, 82, Enemy.prototype.typeMedium);
			buildEnemy(0.4, 59, Enemy.prototype.typeSmall);

		}, 800);
	},
	//碰撞监听
	collideListening: function() {
		var self = this;
		var timer = setInterval(function() {

			for(var eneIndex in gameEngine.enemyList) {
				for(var bulIndex in gameEngine.bulletList) {

					if(gameEngine.bulletList[bulIndex] == undefined) {
						continue;
					}
					//敌机和子弹碰撞
					if(isCollided(self.enemyList[eneIndex], self.bulletList[bulIndex])) {
						self.enemyList[eneIndex].beDamaged();
						self.bulletList[bulIndex].removeSelf();
						delete self.bulletList[bulIndex];
						self.pointCount++;
						if(self.enemyList[eneIndex].hp == 0) {
							$("#point").text(self.pointCount);
						}
					}
					//敌机和玩家碰撞
					if(isCollided(self.enemyList[eneIndex], Player)) {
						Player.hp--;
						self.enemyList[eneIndex].removeSelf();
						$(Player.hpImg[Player.hp]).remove();
						if(Player.hp == 0) {
							$(Player.ele).remove();
							clearTimer(Player.fireTimer,self.enemyTimer,timer);
							self.gameOver();
						}
					}
				}
			}

		}, 50);
	},
	
	gameOver:function(){
		
		var label = document.createElement('p');
		label.innerText = "Game Over";
		label.className = " label";
		document.body.appendChild(label);
		
		var btn = document.createElement('a');
		btn.innerText = "Restart Game";
		btn.className = "btn";
		document.body.appendChild(btn);
		
		$(btn).click(function(){
			//刷新浏览器
			window.location.reload();

		});
		
	}
};