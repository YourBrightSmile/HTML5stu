//开始触碰屏幕的Y轴坐标，手指在屏幕上滑动的Y轴坐标，手指在Y轴上滑动了多少距离
var startY,endY,moveY;


//页码
var index = 1;
var isTouched = false;

//翻页动画
$(".page").on("touchstart touchmove touchend",function(event){
	switch(event.type){
		case "touchstart":
			startY = event.originalEvent.targetTouches[0].clientY;
			break;
		case "touchmove":
			endY = event.originalEvent.targetTouches[0].clientY;
			isTouched = true;
			break;
		case "touchend":
			if(!isTouched)return;
			isTouched = false;
			moveY = endY - startY;
			
			if(moveY < 0 ){
				if(index == $(".page").size())return;
				index++;
				$(this).addClass("curTop").next().removeClass("hidden").addClass("nextTop");
				$(this).on("animationend",function(){
					$(this).removeClass("curTop").addClass("hidden").next().removeClass("nextTop");
					$(this).off("animationend");
				});
			}
			if(moveY > 0 ){
				if(index == 1)return;
				index--;
				$(this).addClass("curBot").prev().removeClass("hidden").addClass("prevBot");
				$(this).on("animationend",function(){
					$(this).removeClass("curBot").addClass("hidden").prev().removeClass("prevBot");
					$(this).off("animationend");
				});
			}
			
			break;
	}
});


//控制点灯
$(".page-4 .on").click(function(){
	$(".page-4 .bg").addClass("fadeOut");
	$(".page-4 .guide").addClass("fadeOut");
	$(".page-4 .title").addClass("fadeOut");
	$(".page-4 .off").addClass("fadeOut");
	
	$(".page-4 .on").addClass("fadeIn");
	$(".page-4 .bg-2").addClass("fadeIn");
	$(".page-4 .know").addClass("fadeIn");
	$(".page-4 .flowers").addClass("fadeIn");
	
});

//控制音乐
$(".music").click(function(){
	var bgm = document.getElementById("bgm");
	if(bgm.paused){
		bgm.play();
		this.src = "img/otherimg/musicBtn.png";
	}else{
		bgm.pause();
		this.src = "img/otherimg/musicBtnOff.png"
	}
});
