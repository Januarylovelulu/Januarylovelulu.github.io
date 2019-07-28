function startMove(obj, name, number ,number2=0) {
	clearInterval(obj.timer);
	var changer;
	var changerH;
	obj.timer = setInterval(function() {
		if (name == 'opacity')
			changer = getStyle(obj, name) * 100;
		else if (name == 'size'){
			changer = parseInt(getStyle(obj, 'width'));
			changerH = parseInt(getStyle(obj, 'height'));
		}
		else 
			changer = parseInt(getStyle(obj, name));
		var speed = (number - changer) / 25;
		var speed2 = (number2 - changerH) / 25;//size专用
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if (changer == number && changerH == number2) {
			clearInterval(obj.timer);
		} else {
			if (name == 'opacity')
				obj.style[name] = (speed + changer) / 100;
			else if (name == 'size'){
				obj.style['width'] = speed + changer + 'px';
				obj.style['height'] = speed2 + changerH + 'px';
			}
			else
				obj.style[name] = speed + changer + 'px';
		}
		// document.title = name + ' ' + changer + ' ' + number;
	}, 10)
}

function getStyle(obj, name) {
	if (obj.currentStyle)
		return obj.currentStyle[name];
	else
		return getComputedStyle(obj, false)[name];
}
