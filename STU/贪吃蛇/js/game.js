//画笔
var ctx;
//每一个方格的大小
var blockSize = 7;
//行数
var rows = 21;
//列数
var cols = 42;
//用于储存蛇身的每个格子的左上角的坐标
var snakeBody = [];
//规定蛇头的初始方向向右
var direction = "right";
//游戏定时器
var gameTimer;

//食物
var food;

init();

function init() {
	ctx = document.getElementById("canvas").getContext("2d");
	initSnake();
	initFood();
	draw();
	gameTimer = setInterval(move, 200);
	document.onkeydown = function(event) {
		keyListening(event.keyCode);
	}
}
//初始化蛇身坐标
function initSnake() {
	for(var i = 0; i < 4; i++) {
		snakeBody[i] = {
			x: i * blockSize+1,
			y: 1
		}
	}
}

//初始化食物
function initFood() {
	food = {
		x: parseInt(Math.random() * cols) * blockSize+1,
		y: parseInt(Math.random() * rows) * blockSize+1
	};
	console.log(food.x,food.y);

}

function draw() {
	ctx.lineWidth = 2;
	ctx.clearRect(0, 0, cols * blockSize, rows * blockSize);
	//画行
	for(var i = 0; i <= rows; i++) {
		ctx.beginPath();
		//划线的起点
		ctx.moveTo(0, i * blockSize + 1);
		//线的终点
		ctx.lineTo(cols * blockSize, i * blockSize + 1)
			//设置镂空样式
		ctx.strokeStyle = "cornflowerblue";

		ctx.stroke();
		ctx.closePath();
	}
	//画列
	for(var i = 0; i <= cols; i++) {
		ctx.beginPath();
		ctx.moveTo(i * blockSize + 1, 0);
		ctx.lineTo(i * blockSize + 1, rows * blockSize + 2)
		ctx.strokeStyle = "cornflowerblue";
		ctx.stroke();

		ctx.closePath();
	}
	//画蛇
	for(var i = 0; i < snakeBody.length; i++) {
		ctx.beginPath();
		ctx.moveTo(snakeBody[i].x, snakeBody[i].y);
		ctx.lineTo(snakeBody[i].x + blockSize, snakeBody[i].y );
		ctx.lineTo(snakeBody[i].x + blockSize, snakeBody[i].y + blockSize );
		ctx.lineTo(snakeBody[i].x, snakeBody[i].y + blockSize );
		ctx.lineTo(snakeBody[i].x, snakeBody[i].y );
		
		if(i==snakeBody.length-1){
			ctx.fillStyle = "red";
			ctx.fill();
		}else{
			ctx.fillStyle = "silver";
			ctx.fill();
		}
		
		ctx.strokeStyle = "gold";
		ctx.stroke();
		ctx.closePath();
	}
	//画食物
	ctx.beginPath();
	ctx.moveTo(food.x,food.y);
	ctx.lineTo(food.x+blockSize,food.y);
	ctx.lineTo(food.x+blockSize,food.y+blockSize);
	ctx.lineTo(food.x,food.y+blockSize);
	ctx.lineTo(food.x,food.y);
	ctx.fillStyle = "hotpink";
	ctx.fill();
	ctx.strokeStyle = "lightgreen";
	ctx.stroke();
	ctx.closePath();
}

//蛇运动的方法
function move() {
	switch(direction) {
		case "right":
			var offsetX = (snakeBody[snakeBody.length - 1].x + blockSize) % (cols * blockSize);
			//从蛇数组的尾部把新的位置存入数组
			snakeBody.push({
				x: offsetX,
				y: snakeBody[snakeBody.length - 1].y
			});
			break;
		case "left":
			var offsetX = (snakeBody[snakeBody.length - 1].x - blockSize + cols * blockSize) % (cols * blockSize);
			snakeBody.push({
				x: offsetX,
				y: snakeBody[snakeBody.length - 1].y
			});
			break;
		case "bottom":
			var offsetY = (snakeBody[snakeBody.length - 1].y + blockSize) % (rows * blockSize);
			snakeBody.push({
				x: snakeBody[snakeBody.length - 1].x,
				y: offsetY
			});
			break;
		case "top":
			var offsetY = (snakeBody[snakeBody.length - 1].y - blockSize + rows * blockSize) % (rows * blockSize);
			snakeBody.push({
				x: snakeBody[snakeBody.length - 1].x,
				y: offsetY
			});
			break;
	}
	//从蛇数组的开头弹出旧的数据
	snakeBody.shift();
	
	eat();
	if(isOver()==true){
		clearInterval(gameTimer);
		alert("咬到自己了");
	}
	//再画蛇
	draw();
}

function keyListening(keycode) {
	switch(keycode) {
		//37 左方向键
		case 37:
			if(direction == "top" || direction == "bottom") direction = "left";
			break;
			//38 上方向键键
		case 38:
			if(direction == "left" || direction == "right") direction = "top";
			break;
			//39 右方向键
		case 39:
			if(direction == "top" || direction == "bottom") direction = "right";
			break;
			//40 下方向键
		case 40:
			if(direction == "left" || direction == "right") direction = "bottom";
			break;
	}
}

function eat(){
	if(snakeBody[snakeBody.length-1].x == food.x && snakeBody[snakeBody.length-1].y==food.y){
		//从数组的头部
		snakeBody.unshift({
			x:snakeBody[0].x ,
			y:snakeBody[0].y 
		});
		
		//刷新食物
		initFood();
	}
}

function isOver(){
	//遍历除了蛇头以外的所有部分
	for(var i=0;i<snakeBody.length-1;i++){
		if(snakeBody[snakeBody.length-1].x == snakeBody[i].x &&snakeBody[snakeBody.length-1].y == snakeBody[i].y){
			return true;
		}
	}
	return false;
}



