/*
author:1485926851@qq.com
data:2018-11-16
 */
function Wipe(obj){
	this.conID=obj.id;
	this.cas = document.getElementById(this.conID);
	this.context= cas.getContext("2d");
	this._w = obj.width,
	this._h = obj.height;
	this.coverType=obj.coverType; //覆盖的是颜色还是图
	this.color=obj.color||"#666";  //覆盖的颜色
	this.imgUrl=obj.imgUrl; //覆盖图
	// this.backImgUrl=obj.backImgUrl; //背景图
	this.cas.style.background="url("+obj.backImgUrl+") center 0 no-repeat";
	this.radius = obj.radius; //涂抹的半径
	this.pox = 0;
	this.poY = 0;
	this.insMouseDown=false;
	this.att=0;
	this.device=(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera|mini/i.test(navigator.userAgent.toLowerCase()));
	console.log(this.device);
	this.clickEvtName=this.device ? "touchstart":"mousedown";
	this.moveEviName=this.device? "touchmove":"mousemove";
	this.endEvtName=this.device?"touchend":"mouseup";
	this.drawRect(); 
	this.Box();
	// this.juLi();
	this.callback=obj.callback;
}
// 画点和画线函数
// 参数:如果只有两个参数， 函数功能画圆x1,y1即圆的中心坐标
// 如果传递四个参数，函数功能画线，x1,y1为起始坐标，x2,y2为结束坐标
Wipe.prototype.drawT=function(x1,y1,x2,y2){
	if (arguments.length===2){
		this.context.save();
		this.context.beginPath();
		this.context.arc(x1,y1,this.radius,0,2*Math.PI);
		this.context.fillStyle = "red";
		this.context.fill();
		this.context.stroke();
		// 调用的是画点功能
		
	}else if(arguments.length===4){
		// 调用的是画线功能
		this.context.save();
		this.context.lineCap="round";
		this.context.beginPath();
		this.context.moveTo(x1,y1);
		this.context.lineTo(x2,y2);
		this.context.lineWidth=this.radius*2;
		this.context.stroke();
		this.context.restore();
	}else{
		return false;
	}
}
// 清除画布
Wipe.prototype.clearRect=function(){
	this.context.clearRect(0,0,this._w,this._h);
}
// 获取透明点占整个画布的百分比
Wipe.prototype.getTransparencyPercent=function(){
		var t=this.context.getImageData(0,0,this._w,this._h);
		for (var i = 0; i < t.data.length; i+=4) {
				var c=t.data[i+3];
				if (c===0) {
					this.att++;
				}
			}
		console.log("透明点的个数:"+this.att);
		this.percent=(this.att/(this._w*this._h))*100;
		// console.log(percent);
		console.log("占总面积"+Math.ceil(this.percent)+"%");
		return this.percent.toFixed(2); //截取小数点两位
}
Wipe.prototype.drawRect=function(){
	if(this.coverType=="color"){
	this.context.fillStyle=this.color;
	this.context.fillRect(0,0,this._w,this._h);
	this.context.globalCompositeOperation = "destination-out";
	}else if(this.coverType=="image"){
	// 将imgUrl指定的图片填充画布、
		var that = this;
		var imgs = new Image();
		imgs.src = this.imgUrl;	
		imgs.onload = drawImg;//图片加载完成再执行
		function drawImg(){
			that.context.drawImage(imgs,0,0,imgs.width,imgs.height,0,0,that._w,that._h);
			that.context.globalCompositeOperation="destination-out";
		}
	}
	
}
//device 保存设备类型，如果是移动端则为true，PC端为false
Wipe.prototype.Box=function(){
	var that=this;
	console.log(this);
		this.cas.addEventListener(this.clickEvtName,function(evt){
		var event = evt || window.event;
		that.insMouseDown=true;
		//获取鼠标在视口的坐标，传递参数到drawPoint
		 that.pox=that.device ? event.touches[0].clientX : event.clientX;
		that.poY =that.device ? event.touches[0].clientY : event.clientY;
		that.drawT(that.pox ,that.poY);	
	},false);
	this.cas.addEventListener(this.moveEviName,function(evt){
	if (that.insMouseDown===true){
		var event = evt || window.event;
		event.preventDefault();
		//获取手指在视口的坐标，传递参数到drawPoint
		that.moveX =that.device ? event.touches[0].clientX : event.clientX;
		that.moveY =that.device ?  event.touches[0].clientY : event.clientY;
		// drawPoint(context,pox ,poY);	
		that.drawT(that.pox,that.poY,that.moveX,that.moveY);
		that.pox=that.moveX;
		that.poY=that.moveY;
		}
	},false);
	this.cas.addEventListener(this.endEvtName,function(evt){
	// 还原insMouseDown为false
	that.insMouseDown=false;
	var percent =that.getTransparencyPercent();
	// 调用同名的全局函数
	that.callback.call(null,percent);
	if (percent>that.transpercent){
		// alert("超过了50%的面积");
		that.clearRect();
	}
	
	},false); 
}


