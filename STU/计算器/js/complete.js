var num1 = '';
var num2 = '';
var operation = '';

//显示栏是否需要清空
var needClear = false;
//初始状态
var initStatus = true;

var btns = document.getElementsByTagName("a");
var res = document.getElementById("result");

init();

function init() {

	//把a元素看做数组的原型进行遍历
	Array.prototype.forEach.call(btns, function(btn) {
		btn.onclick = function() {
			doCal(btn.innerText);

		}
	});

}

//计算前的方法
function doCal(btnValue) {

	switch(btnValue) {
		case "AC":
			num1 = '';
			operation = '';
			num2 = '';
			initStatus = true;
			res.innerText = 0;
			break;
		case '+':
		case '-':
		case '*':
		case '/':
			if(num2.length=''){
				res.innerText = cal(parseFloat(num1), parseFloat(num2), operation);
			}
			if(num1.length > 0 && num2=='') {
				num2 = res.innerText;
				res.innerText = cal(parseFloat(num1), parseFloat(res.innerText), operation);
			}
			//把计算之前显示在屏幕上的数字保存在num1中
			num1 = res.innerText;
			operation = btnValue;
			//需要清除运算之前的屏幕上的数字
			needClear = true;
			break;
		case '=':
			if(num2 !=''){
				res.innerText = cal(parseFloat(num1), parseFloat(num2), operation);
			}
			if(num1.length > 0 && num2=='') {
				num2 = res.innerText;
				res.innerText = cal(parseFloat(num1), parseFloat(res.innerText), operation);
			}
			//把计算之前显示在屏幕上的数字保存在num1中
			num1 = res.innerText;
			needClear = true;
			break;

		default:
			if(!needClear) {
				//如果判断初始状态为true，则清空显示栏中的内容，并把初始状态关闭
				if(initStatus) {
					res.innerText = '';
					initStatus = false;
				}
				res.innerText += btnValue;
			} else {
				res.innerText = btnValue;
				needClear = false;
			}
			break;
	}
}

//接受三个参数
function cal(n1, n2, op) {
	switch(op) {
		case '+':
			return n1 + n2;
			break;
		case '-':
			return n1 - n2;
			break;
		case '*':
			return n1 * n2;
			break;
		case '/':
			return n1 / n2;
			break;
		default:
			return n2;
			break;
	}

}