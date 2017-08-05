//可以打印字符列表
//'\u0021'————'\u2C77'

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "black";
var ctx = canvas.getContext("2d");
var fontSize = 20;
var colNum = Math.floor(window.innerWidth/fontSize);
//存储位置信息
var pos=[];
//初始化位置数组
for(var i=0;i<colNum;i++){
	pos[i]=1;
}
//console.log(colNum)
function draw(){
		ctx.fillStyle="rgba(0,0,0,0.1)";
		ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
		ctx.beginPath();
		ctx.fillStyle="#0F0";
		ctx.font=fontSize+"px consolas";
		
		for(var i=0;i<colNum;i++){
			ctx.fillText(getStr(true),i*fontSize,pos[i]*fontSize);
			ctx.fill();
			pos[i]++;
			if(pos[i]*fontSize>window.innerHeight||Math.random()>0.9){
			pos[i]=0;
		}
		}
		
		ctx.closePath();
	}
	


function getStr(flag){
	var numbers = "01".split("");
	if(flag){
		return Math.floor(Math.random()*numbers.length);
	}else{
		ucode=Math.floor(Math.random()*11350)+33;
		//截取字符串
		strCode='%u'+('0000'+ucode.toString(16)).substr(-4);
		//解码
		str = unescape(strCode);
		return str;
	}
	
}
setInterval(draw,80);
//canvas.style.filter="blur(1px)";