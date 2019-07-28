//封装移动函数
function animate(element, target) {
	clearInterval(element.animateTimer);
	element.animateTimer = setInterval(function() {
		var left = element.offsetLeft;
		var speed = (target - left) / 30;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		left += speed;
		element.style.left = left + 'px';
		if (left==target) {
			clearInterval(element.animateTimer);
			element.style.left = target + 'px';
		}
	}, 10);
}

function move(boxIndex, picture_total) {
	var pictureBox = document.getElementsByClassName('pictureBox')[boxIndex];
	var pictureList = document.getElementsByClassName("pictureList")[boxIndex];
	var bigPicture = document.getElementsByClassName("bigPicture")[boxIndex];
	var imgArr = pictureList.getElementsByTagName('li');
	//4.最后一张显示后，克隆第一张图片继续显示第一张
	pictureBox.appendChild(pictureBox.children[0].cloneNode(true));
	var ulLeft = pictureBox.offsetLeft;
	console.log(ulLeft);
	var ulIndex = 0; //默认第一张图片下标
	// console.log(ulLeft);
	//开启
	var autoPlayTimer = setInterval(function() {
		//4.2 从最后一张滚回到第一张(ulIndex == 5)之后  需重置回第一张状态
		if (ulIndex == picture_total) {
			ulIndex = 0;
			pictureBox.style.left = '0';
			ulLeft = 0;
		}
		ulLeft -= 940;
		// console.log(ulLeft);
		animate(pictureBox, ulLeft);
		ulIndex++;
		for (var i = 0; i < imgArr.length; i++) {
			imgArr[i].className = '';
		}
		//4.3改变页面  第五张图片结束后ulIndex是4 
		//第六张图片即第一张图片的ulIndex是picture_total  所以求ulIndex % picture_total恢复ulIndex为0 
		imgArr[ulIndex % picture_total].className = 'current';
	}, 3000);
	//第二大步  给小圆点img添加点击事件
	for (var i = 0; i < imgArr.length; i++) {
		var img = imgArr[i];
		img.index = i;
		img.onmouseover = function() {
			//实现点击img后图片移动
			var targetLeft = -940 * this.index; //0 - 4
			//点击后自动滚动到 当前圆点对应的图片的位置  即左移800*下标
			animate(pictureBox, targetLeft);
			//记录此时的ulLeft ulIndex 为了继续从当前点击图片向下一张图片移动
			ulLeft = targetLeft;
			ulIndex = this.index;
			//切换当前img选中样式
			for (var j = 0; j < imgArr.length; j++) {
				imgArr[j].className = '';
			}
			this.className = 'current';
		}
	}
	bigPicture.onmouseover = function() {
		clearInterval(autoPlayTimer);
	}
	bigPicture.onmouseout = function() {
		autoPlayTimer = setInterval(function() {
			//4.2 从最后一张滚回到第一张(ulIndex == picture_total)之后  需重置回第一张状态
			if (ulIndex == picture_total) {
				ulIndex = 0;
				pictureBox.style.left = '0';
				ulLeft = 0;
			}
			ulLeft -= 940;
			// console.log(ulLeft);
			animate(pictureBox, ulLeft);
			ulIndex++;
			for (var i = 0; i < imgArr.length; i++) {
				imgArr[i].className = '';
			}
			//4.3改变页面  第五张图片结束后ulIndex是4 
			//第六张图片即第一张图片的ulIndex是5  所以求ulIndex % 5恢复ulIndex为0 
			imgArr[ulIndex % picture_total].className = 'current';
		}, 3000);
	}
}

window.onload = function() {
	move(0, 8);
	// move(1,8);
	
	var picture=document.getElementsByClassName("picture");
	for(var x=0;x<picture.length;x++)
	{
		picture[x].onmouseover=function(){
			startMove(this,'size',420,420);
		}
		picture[x].onmouseout=function(){
			startMove(this,'size',140,140);
		}
	}
}
