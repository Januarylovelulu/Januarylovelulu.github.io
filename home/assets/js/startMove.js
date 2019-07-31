function startMove(obj, name, number, number2 = 0) {
	clearInterval(obj.timer);
	var changer;
	var changerH;
	obj.timer = setInterval(function() {
		if (name == 'opacity')
			changer = getStyle(obj, name) * 100;
		else if (name == 'size') {
			changer = parseInt(getStyle(obj, 'width'));
			changerH = parseInt(getStyle(obj, 'height'));
		} else
			changer = parseInt(getStyle(obj, name));
		var speed = (number - changer) / 25;
		var speed2 = (number2 - changerH) / 25; //size专用
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if (changer == number && changerH == number2) {
			clearInterval(obj.timer);
		} else {
			if (name == 'opacity')
				obj.style[name] = (speed + changer) / 100;
			else if (name == 'size') {
				obj.style['width'] = speed + changer + 'px';
				obj.style['height'] = speed2 + changerH + 'px';
			} else
				obj.style[name] = speed + changer + 'px';
		}
		// document.title = name + ' ' + changer + ' ' + number;
	}, 10)
}

/*
	运动框架
	@elem 待运动的对象
	@targetJson 对象运动的重点位置
	@duration 动画的持续时间
*/
function animate(elem, targetJson, duration) {

	var interval = 20; //定义动画运动的间隔时间20毫秒
	var objInitJson = {}; //用来存储每一个属性的默认初始值
	for (var attr in targetJson) {
		objInitJson[attr] = parseInt(getStyle(elem, attr));
	}
	var totalFrames = duration / interval; //动画运动的总帧数

	var totalChange = {}; //用来存储每一个属性的总的变化量
	for (var attr in targetJson) {
		totalChange[attr] = targetJson[attr] - objInitJson[attr];
	}
	var objStepJson = {}; //每一个属性在每一帧的变化量
	for (var attr in targetJson) {
		objStepJson[attr] = parseFloat(totalChange[attr] / totalFrames);
	}


	var runCounts = 1;
	var timer = setInterval(function() {
		runCounts++;
		for (var attr in objStepJson) {
			objInitJson[attr] += objStepJson[attr];
			elem.style[attr] = objInitJson[attr] + "px";
		}
		if (runCounts > totalFrames) {
			for (var attr in objStepJson) {
				elem.style[attr] = targetJson[attr] + "px";
			}
			clearInterval(timer);
		}

	}, interval);
}

function getStyle(obj, name) {
	if (obj.currentStyle)
		return obj.currentStyle[name];
	else
		return getComputedStyle(obj, false)[name];
}
