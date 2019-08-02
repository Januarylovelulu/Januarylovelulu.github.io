
var addGoodsLock=false;//防止一时间多次添加商品造成混乱

$(function(){
	if(typeof(Storage) == "undefined") {
        alert("抱歉！您的浏览器不支持 Web Storage ...");
    }
	else{
		readData();
	}
	
	$('.short').on({ //小图模式时，鼠标移入的效果
		mouseover:function(){showDetail(this);},
		mouseout:function(){hideDetail(this);}
	});
	
	$('.viewBy').on('click',function(){changeFormate(this)});//查看大图还是小图
	
	if($('#selectedGoods').children().length==1){ //如果加载页面的时候，购物车没有物品
		$('.none').css('display','block');//显示 购物车里没有物品 标签
		$('#checkOut').css('display','none');
	}
	else{
		$('#checkOut').css('display','block');
	}
	
	$('.addGoods').on('click',function(){addGoods(this)});//添加商品
})

function readData(){
	var goodsJson = sessionStorage.getItem('goodsJson');
	if(goodsJson!=null && goodsJson!=undefined){
		$.each($.parseJSON(goodsJson), function(i,v){
			appendGoodsToHtml(v);
		});
	}
}

function saveData(){
	var goodsJson = [];
	$('.selected')
	.each(function(x,element){
		goodsJson.push(
		{
			'index':$(element).attr('index'),
			'name':$(element).attr('name'),
			'number':$(element).attr('num'),
			'price':parseInt($(element).find('.goodsPrice').html())+""
		});
	});
	sessionStorage.setItem('goodsJson', JSON.stringify(goodsJson));
}

function appendGoodsToHtml(goodsJson){ //真正将物品添加到购物栏的实现方法
	var goodsHtml=
		'<div class="box240 selected" index="'+
		goodsJson["index"]+
		'" num="'+
		goodsJson["number"] +
		'" name="'+
		goodsJson["name"]+
		'"><img src="img/'+
		goodsJson["index"]+
		'.jpg">'+
		'<div class="box160">'+
		'<p class="goodsPrice">'+
		goodsJson["price"]+
		'<i class="goodsNum">&nbsp;&nbsp;X'+
		goodsJson["number"] +
		'</i></p></div></div>';
	$('#selectedGoods').append(goodsHtml);
}

function addGoods(element){ //点击添加物品按钮的操作
	$('.none').css('display','none');//添加物品，隐藏购物车没有物品
	if(addGoodsLock==true)//防止一时间多次添加造成混乱
		return "";
	else
		addGoodsLock=true;
	
	var goods=$(element).parent().parent().parent();//获取goods节点
	var goodsIndex=$(goods).attr('index');
	
	var goodsJson=getGoodsElement(goods);
	
	var selectedList=$('.selected');
	var goodsNum="1";
	var selectedIndex=-1;
	for(var x=0;x<selectedList.length;x++){
		if($($(selectedList).get(x)).attr('index')==goodsJson['index']){
			goodsNum=parseInt($($(selectedList).get(x)).attr('num'))+1+"";
			selectedIndex=x;
			break;
		}
	}
	goodsJson['number']=goodsNum+"";
	
	var img=$(element).parent().parent().find('.img');
	var flyImg=img.clone().css(img.offset())
	$(flyImg).css({"position":'absolute'});
	$(flyImg).appendTo('body');
	
	var selectedGoods=$('#selectedGoods');
	var moveTop;
	if(selectedIndex==-1)
		moveTop=selectedGoods.offset().top + selectedGoods.height()-10;
	else
		moveTop=$($(selectedList).get(selectedIndex)).offset().top-10;
	flyImg.animate({
		left: selectedGoods.offset().left,
		top: moveTop,
		width: '40px',
		height: '50px'
	},500)
	.fadeOut('slow', function() {
		if(selectedIndex==-1){
			appendGoodsToHtml(goodsJson)
		}
		else{
			$($(selectedList).get(selectedIndex)).attr('num',goodsNum);
			$($(selectedList).get(selectedIndex)).find('i').html("&nbsp;&nbsp;X"+goodsNum);
		}
		flyImg.remove();
		saveData();
		$('#checkOut').css('display','block');
		addGoodsLock=false;
	});
}

function getGoodsElement(element){
	var goodsJson={
		'index':$(element).attr('goodsIndex'),
		'name':$($(element).find('.goodsName')).html(),
		'price':$($(element).find('.goodsPrice')).html()
	};
	return goodsJson;
}

function showDetail(element){
	var goodsHover=$(element).find('.goodsHover');
	var goodsHover2=$(element).find('.goodsHover2');
	var img=$(element).find('.img');
	goodsHover.css('display','block');
	goodsHover2.css('display','block');
	img.css('height',"256px");
}

function hideDetail(element){
	var goodsHover=$(element).find('.goodsHover');
	var goodsHover2=$(element).find('.goodsHover2');
	var img=$(element).find('.img');
	goodsHover.css('display','none');
	goodsHover2.css('display','none');
	img.css('height',"373px");
}

function changeFormate(element){
	if($('.viewByNow').prop('outerHTML')!=$(element).prop('outerHTML')){
		if($(element).attr('attr')=="short"){
			$('.detail').css("display","none");
			$('.short').css("display","block");
			$('.viewByNow').attr("class","viewBy");
			$(element).attr("class","viewBy viewByNow");
		}
		else{
			$('.short').css("display","none");
			$('.detail').css("display","block");
			$(element).attr("class","");
			$('.viewByNow').attr("class","viewBy");
			$(element).attr("class","viewBy viewByNow");
		}
	}
}