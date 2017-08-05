//所有选择区的小图片
var imgSmall = document.getElementsByClassName("img-list")[0].getElementsByTagName("img");

//所有展示区的图片
var imgDisplay = document.getElementsByClassName("img-display")[0].getElementsByTagName("img")[0];

//获取放大区外层div
var divZoom = document.getElementsByClassName("img-zoom")[0];
//获取放大区的图片
var imgZoom = divZoom.getElementsByTagName("img")[0];

//选择所需放大的区域
var block = document.getElementById("block");

//选择蒙层
var imgLayer = document.getElementById("layer");



for(var i=0;i<imgSmall.length;i++){
	//添加一个事件监听器
	imgSmall[i].addEventListener("click",function(){
		imgDisplay.src = this.src;
		imgZoom.src = this.src;
	});
}
//鼠标进入事件
imgLayer.onmouseenter=function(){
	block.style.display="block";
	divZoom.style.display="block";
}
//鼠标离开事件
imgLayer.onmouseleave=function(){
	block.style.display="none";
	divZoom.style.display="none";
}
//鼠标移动事件
imgLayer.onmousemove = function(event){
	block.style.left=event.offsetX-block.offsetWidth/2+"px"
	block.style.top= event.offsetY-block.offsetHeight/2+"px";
	
	var x = -block.offsetLeft *imgZoom.width/imgDisplay.offsetWidth;
	var y = -block.offsetTop *imgZoom.height/imgDisplay.offsetHeight;
	if(x > 0){
		imgZoom.style.left = x+"px";
	}else if(x-imgZoom.width/2){
		imgZoom.style.left = x+"px"
	}else{
		imgZoom.style.left = x+"px";
	}
	
	imgZoom.style.top = y+"px";
	
}

