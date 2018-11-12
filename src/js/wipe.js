var cas = document.getElementById('cas');
var context= cas.getContext("2d");
var _w = cas.width,_h = cas.height;
var pox = 0;
var poY = 0;
var radius = 20;
var insMouseDown=false;
var att=0;
// 表示鼠标的状态，是否按下，默认为未按下false，按下true生成画布上的遮罩，默认为颜色#666
//画矩形
function drawRect(context){
	context.fillStyle="#666";
	context.fillRect(0,0,_w,_h);
	context.globalCompositeOperation = "destination-out";
}
//画圆
function drawPoint(context,pox,poY){
	context.save();
	context.beginPath();
	context.arc(pox,poY,30,0,2*Math.PI);
	context.fillStyle = "red";
	context.fill();
	context.stroke();
}
function drawLine(context,x1,y1,x2,y2){
	context.save();
	context.lineCap="round";
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.lineWidth=radius*2;
	context.stroke();
	context.restore();
}
//在canvas画布上监听自定义事件"mousedown"，调用drawPoint函数
cas.addEventListener("mousedown",function(evt){
	var event = evt || window.event;
	insMouseDown=true;
	//获取鼠标在视口的坐标，传递参数到drawPoint
	 pox = event.clientX;
	poY = event.clientY;
	drawPoint(context,pox,poY);

},false);
cas.addEventListener("mousemove",fn1,false);
function fn1(evt){
	if (insMouseDown==true){
		var event = evt || window.event;
		//获取鼠标在视口的坐标，传递参数到drawPoint
		var moveX = event.clientX;
		var moveY = event.clientY;
		// drawPoint(context,pox ,poY);
		drawLine(context,pox,poY,moveX,moveY);
		pox=moveX;
		poY=moveY;
	};
	
}
cas.addEventListener("mouseup",function(evt){
	// 还原insMouseDown为false
	insMouseDown=false;
	if (getTransparencyPercent(context)>50) {
		alert("超过了50%的面积");
		clearRect(context);
	};
	
},false);
function clearRect(context){
	context.clearRect(0,0,_w,_h);
}
function getTransparencyPercent(context){
	var t=context.getImageData(0,0,_w,_h);
	for (var i = 0; i < t.data.length; i+=4) {
			var c=t.data[i+3];
			if (c==0) {
				att++;
			};
		};
		console.log("透明点的个数:"+att);
		var percent=(att/(_w*_h))*100;
		// console.log(percent);
		console.log("占总面积"+Math.ceil(percent)+"%");
		return Math.round(percent);
}
window.onload = function(){									
	drawRect(context);
	// drawPoint(context);
};