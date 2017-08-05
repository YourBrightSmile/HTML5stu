//创建敌机类型
function buildEnemy(prob, eneWidth, eneType) {

	//判断是否该创建敌机
	var probability = Math.random() > prob ? true : false;
	//屏幕的随机宽度
	var randomWidth = window.innerWidth * Math.random();
	if(probability) {
		if(randomWidth <= window.innerWidth - eneWidth) {
			var enemy = new Enemy(eneType, randomWidth);
			enemy.init();
		}
	}
}

//碰撞
//第一个参数为敌机，第二个参数则是玩家或子弹
function isCollided(ene, obj) {

	var eneLeft = ene.ele.offsetLeft,
		objLeft = obj.ele.offsetLeft,
		eneTop = ene.ele.offsetTop,
		objTop = obj.ele.offsetTop,

		eneWidth = ene.ele.offsetWidth,
		objWidth = obj.ele.offsetWidth,

		eneHeight = ene.ele.offsetHeight,
		objHeight = obj.ele.offsetHeight;

	if(objLeft + objWidth > eneLeft && objLeft < eneLeft + eneWidth) {
		if(objTop + objHeight > eneTop && objTop < eneTop + eneHeight) {
			return true;
		}

	}
	return false;

}


//
function clearTimer(){
	if(arguments){
		$(arguments).each(function(){
			clearInterval(this);
		})
	}
}
