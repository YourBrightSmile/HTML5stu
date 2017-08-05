//保存第一个数字
var num1 = '';
//保存第二个数字
var num2 = '';

//保存运算符
var operation = '';

//显示结果的栏
var res = document.getElementById("result");
//所有的按钮
var btns = document.getElementsByTagName("a");
//遍历所有的按钮
for (var i=0;i<btns.length;i++){
	//给每一个按钮添加点击事件
	btns[i].onclick=function (){
		//点击了谁 this就指谁
		var txt = this.innerText;
		switch(txt){
			case "AC":
				num1='';
				num2='';
				operation='';
				res.innerText = 0;
				break;
			case "+":
				operation = "+";
				break;
			case "-":
				operation = "-";
				break;
			case "*":
				operation = "*";
				break;
			case "/":
				operation = "/" ;
				break;
			case "=":
				var n1 = parseFloat(num1);
				var n2 = parseFloat(num2);
				switch(operation){
					case "+":
						res.innerText = n1 + n2;
						break;
					case "-":
						res.innerText = n1 - n2;
						break;
					case "*":
						res.innerText = n1 * n2;
						break;
					case "/":
						res.innerText = n1 / n2;
						break;
				}
				break;
			default:
				if(operation == ''){
					num1 += txt;
					res.innerText = num1;
				}else{
					num2 += txt;
					res.innerText = num2;
				}
				break;				

		}
	}
}















