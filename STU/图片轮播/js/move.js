function getStyle(obj, attr) {
	//兼容IE8 以下
	if(obj.currentStyle) return obj.currentStyle[attr];
	else return window.getComputedStyle(obj, false)[attr];
}

//startMove(demo,(left:100),function(){})
function startMove(obj, cssStyle, fn) {
	
	clearInterval(obj.timer);
	//给对象设置一个定时器
	obj.timer = setInterval(function() {
		for(var attr in cssStyle) {
			var cssValue = cssStyle[attr];
			//将获取到对象的坐标转化为一个常量
			var curPos = parseInt(getStyle(obj, attr));
			//逐渐减少的速度
			var objSpeed = (cssValue - curPos) / 8;
			objSpeed>0?objSpeed=Math.ceil(objSpeed):objSpeed=Math.floor(objSpeed);
			//如果当前位置跟目标位置一致的时候
			if(curPos == cssValue){
				//清除定时器
				clearInterval(obj.timer);
				//如果有回调函数 则执行
				if(fn) fn();
			}else{
				obj.style[attr] = curPos + objSpeed + "px";
			}
		}
	}, 30);

}