﻿## ver 0.0.1 ##
pc端实现涂抹擦除著效果,超过50%的涂抹面积可以查看全部。
涂抹颜色和背景图片需要手动指定。2018-11-12
## var 1.0.0 ##
1.实现了对移动端的支持

2.函数优化
## var 2.0.0 ##
实现了面向对象方式，
增加了参数配置
## var3.0.0 ##
1.浏览器在滚动距离下bug修复
2.canvas画布在有偏移和绝对定位下bug修复
3.增加了回调函数。让用户可以自己完成继功能

使用步骤说明：
1、在HTML中添加指定idcanvas标签
例如：<canvas id="cas" width="454" height="667"></canvas>
编辑文件：
|属性名|取值类型|备注|
|id|字符串|canvas标签的id|
|coverType|字符串|取值“color"或”image"|
|color|字符串|十六进制颜色码，或rgba()|
|imgUrl|字符串|前面的覆盖图片|
|backImg|字符串类型|canvas背景图片|
|width|字符串|canvas宽度，必须和canvas标签中宽度一致|
|height|字符串|canvas高度，必须和canvas标签中高度一致|
|radius|字符串|涂抹笔的半径|
|transpercent|数值|透明面积占整个画布的百分比，超出此数字面试全部画布|
|callback|函数|用户自定义的回调函数名称|
例如：
``` 
var wipeConfig={
	id:"cas",
	coverType:"image", //取值类型color,image
	color:"#fff666",
	imgUrl:"images/wipe2.jpg",
	backImgUrl:"images/wipe1.jpg",
	width:"375",
	height:"677",
	radius:"20" ,
	transpercent:50,
	// 透明面积占整个画布的百分比，超过此数字显示全部画布
	callback:wipecallback//用户自定义回调函数名称
}

 ```3、初始化wipe插件，并将上一步的配置作为参数传入例如：``` 
new Wipe(wipeConfig);
 ```4、编写回调函数，用户在涂抹完成的后继操作必须写在此回调函数中。例如：``` 
function wipecallback(percent){	if (percent>50) {	console.log("透明面积超过50%，查看底图");	}}
 ```