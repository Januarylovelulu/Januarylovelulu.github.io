function naviListHover(element){
	console.log($(element).index());
	$('.navi:first li').removeClass('navi_active');
	$('.navi:first li').eq($(element).index()).addClass('navi_active');
	$('.goodsList').css('display','block');
	$('.goodsList').find('.containBox').css('display','none');
	$('.goodsList').find('.containBox').eq($(element).index())
		.css('display','block');
}

function naviListOut(element){
	$('.navi:first li').removeClass('navi_active');
	$('.goodsList').css('display','none');
	$('.goodsList').find('.containBox').css('display','none');
}

var naviIndex=0;
var active=false;//手动切图的开关
var autoActive=false;//自动切图的开关

function autoChangePicture(){//自动切换图片
	if(autoActive==false)
		naviChangePicture($('.navi_rightBtn'));
}

function naviChangePicture(element){//左右Btn切换图片
	if(active)
		return "";
	active=true;
	if($(element).hasClass('navi_leftBtn')){
		naviIndex--;
		if(naviIndex<0)
			naviIndex=4;
	}
	else{
		naviIndex++;
		if(naviIndex>4)
			naviIndex=0;
	}
	$('.changePictureList li').removeClass('navi_circleActive');
	$('.changePictureList li').eq(naviIndex)
		.addClass('navi_circleActive');
	changePicture();
}

function changePictureCircleClick(element){//下面5个小圆点切换图片
	if(active)
		return "";
	active=true;
	$('.changePictureList li').removeClass('navi_circleActive');
	$(element).addClass('navi_circleActive');
	naviIndex=$(element).index();
	changePicture();
}

function changePicture(){//实际切换图片的函数
	var div = $('.naviPicture');
	var img = $('.naviPicture img');
	
	var divClone = div.clone().css(div.offset()).css({
		'position':'absolute',
		'top':'0','left':'0',
		'height':"460px",
		'width':"1180px",
		'opacity':'0',
		'z-index':'1'
	});
	
	divClone.find('img').attr('src',"img/navi/"+naviIndex+".jpg");
	$('#naviBigPicture').append(divClone);
	
	var opacity=0.0;
	var timer=setInterval(function(){
		divClone.css('opacity',opacity);
		div.css('opacity',1-opacity);
		if(opacity>=1){
			clearInterval(timer);
			divClone.remove();
			img.attr('src',"img/navi/"+naviIndex+".jpg");
			div.css('opacity',1);
			active=false;
		}
		opacity+=0.02;
	},16);
}

function changeActive(element){//如果鼠标移入为Ture，则不自动切换图片
	autoActive=element;
}