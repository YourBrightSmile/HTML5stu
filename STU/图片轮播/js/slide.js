//获取到轮播图的外层ul和所有li

var viewList = document.getElementById("view-list");
var viewImg = viewList.getElementsByTagName("li");

//获取下标页码
var viewIndex = document.getElementById("index-list").getElementsByTagName("li");

//获取下一页和上一页的按钮
var prevPage = document.getElementById("prev-page");
var nextPage = document.getElementById("next-page");

//每张图的宽度
var imgWidth = viewImg[0].offsetWidth;

//轮播图定时器
var sliderTimer;

//判断轮播图是否在播放
var isMoving = false;
//记录当前图片是第几张
var count = 0

render();

//渲染HTML
function render() {
	//把轮播图中的li复制一份
	viewList.innerHTML += viewList.innerHTML;
	viewList.style.width = viewImg.length * imgWidth + "px";
	//setInterval的返回的数字可以作为clearInterval()的参数
	sliderTimer = setInterval(slide, 3000);
	clickIndex();
	clickNext();
	clickPrev();
}

function slide() {
	isMoving = true;
	count++;
	var targetleft = -count * imgWidth;
	startMove(viewList, {
		left: targetleft
	}, next);

	//控制下标页码显示颜色
	for(var i = 0; i < viewIndex.length; i++) {
		if(i == count) viewIndex[i].style.background = "dodgerblue";
		else viewIndex[i].style.background = "#FF88C2";
	}
	if(count == viewImg.length / 2) viewIndex[0].style.background = "dodgerblue";
}

//当每一张图播放完成的时候
function next() {
	isMoving = false;
	//如果播放到第4张图
	if(count >= viewImg.length / 2) {
		//当前记录图片是第几张的页码清零
		count = 0;
		//让最外层的ul移动到最开始的位置
		viewList.style.left = 0;
	}
}

//点击页码下标
function clickIndex() {
	for(var i = 0; i < viewIndex.length; i++) {
		//给每一个按钮设置一个属性，该属性为自己对应的i
		viewIndex[i].index = i;
		viewIndex[i].onclick = function() {
				count = this.index - 1;
				clearInterval(sliderTimer);
				slide();
				sliderTimer = setInterval(slide, 3000);
			}
			/*(function(index){
				viewIndex[i].onclick = function(){
					count = index -1 ;
					clearInterval(sliderTimer);
					slide();
					sliderTimer = setInterval(slide,3000);
				}
			})(i);*/
	}
}

//下一页
function clickNext() {
	nextPage.onclick = function() {
		if(isMoving == false) {
			clearInterval(sliderTimer);
			slide();
			sliderTimer = setInterval(slide, 3000);
		}
	}
}
//上一页

function clickPrev() {
	prevPage.onclick = function() {
		if(isMoving == false) {
			//如果是第一张图
			if(count == 0) {
				//把位置换到第4张图的位置
				viewList.style.left = viewImg.length / 2 * imgWidth * (-1) + "px";
				count = viewImg.length / 2 - 2;
			} else {
				count -= 2;
			}
			clearInterval(sliderTimer);
			slide();
			sliderTimer = setInterval(slide,3000);
			
		}
	}
}