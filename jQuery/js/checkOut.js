$(function(){
	$('table').on('click','.buttonLeft',function(){minusNum(this)});
	$('table').on('click','.buttonRight',function(){plusNum(this)});
	$('table').on('click','.deleteGoods',function(){deleteGoods(this)});
	$('table').on('click','.checked',function(){checkBoxCheck()});
	$('#deleteAll').click(function(){deleteAllGoods()});
	$('#checkAll').click(function(){checkBoxCheckAll()});
	readData();
	goodsCount();
})

function checkBoxCheckAll(){
	var checkedList=$('.checked');
	if($('#checkAll').is(":checked")){
		$('#checkAll').prop("checked",true);
		for(var x=0;x<$(checkedList).length;x++){
			$($(checkedList).get(x)).prop("checked",true);
		}
	}
	else{
		$('#checkAll').prop("checked",false);
		for(var x=0;x<$(checkedList).length;x++){
			$($(checkedList).get(x)).prop("checked",false);
		}
	}
	goodsCount();
}

function checkBoxCheck(){
	goodsCount();
	var checkedList=$('.checked');
	$('#checkAll').prop("checked",false);
	for(var x=0;x<$(checkedList).length;x++){
		if(!$($(checkedList).get(x)).is(":checked")){
			return "";
		}
	}
	$('#checkAll').prop("checked",true);
}

function saveData(){
	var goodsJson = [];
	$('.goods')
	.each(function(x,element){
		goodsJson.push(
		{
			'index':$(element).attr('index'),
			'name':$(element).attr('name'),
			'number':parseInt($(element).find('.goodsNumber').attr("value")),
			'price':parseInt($(element).find('.price').html())+""
		});
	});
	sessionStorage.setItem('goodsJson', JSON.stringify(goodsJson));
}

function readData(){
	var goodsJson = sessionStorage.getItem('goodsJson');
	console.log(goodsJson);
	if(goodsJson!=null && goodsJson!=undefined){
		$.each($.parseJSON(goodsJson), function(i,v){
			appendGoodsToHtml(v);
		});
	}
}

function appendGoodsToHtml(goodsJson){
	var goodsHtml=
		'<tr class="goods" index="'+
			goodsJson['index']+
			'" name="'+
			goodsJson['name']+
			'"><td><input class="checked" type="checkbox" checked></td>'+
			'<td class="img">'+
				'<img src="img/'+
				goodsJson['index']+
				'.jpg">'+
				goodsJson['name']+
				'</td><td class="price">'+
				goodsJson['price']+
			'</td>'+
			'<td>'+
				'<input class="buttonLeft" type="button" value="-">'+
				'<input class="goodsNumber" type="text" readonly="readonly" value="'+
				goodsJson['number']+
				'">'+
				'<input class="buttonRight" type="button" value="+">'+
			'</td>'+
			'<td class="priceCount">'+
			'</td>'+
			'<td><input class="deleteGoods" type="button" value="删除"></td>'+
		'</tr>';
	$('table').append(goodsHtml);
}

function goodsCount(){
	var numberList=$('.goodsNumber');
	var priceList=$('.price');
	var priceCountList=$('.priceCount');
	var checkedList=$('.checked');
	var totalNumber=0;
	var countPrice=new Array($(numberList).length);
	for(var x=0;x<$(numberList).length;x++)
		countPrice[x]=0;
	var totalPrice=0;
	for(var x=0;x<$(numberList).length;x++){
		if($($(checkedList).get(x)).is(":checked")){
			totalNumber+=parseInt($($(numberList).get(x)).attr('value'));
			countPrice[x]=parseInt($($(numberList).get(x)).attr('value'))*parseInt($($(priceList).get(x)).html());
		}
		totalPrice+=countPrice[x];
	}
	$('#totalGoods').html("已选商品"+totalNumber+"件");
	$('#priceAll').html(totalPrice+"");
	for(var x=0;x<$(numberList).length;x++){
		console.log($($(priceCountList).get(3)));
		if(countPrice[x]!=0)
			$($(priceCountList).get(x)).html(countPrice[x]+"");
		else
			$($(priceCountList).get(x)).html("未勾选");
	}
	saveData();
}

function minusNum(element){
	var number=parseInt($(element).next().attr("value"));
	if(number>=2){
		number--;
		$(element).next().attr('value',number+"");
	}
	goodsCount();
}

function plusNum(element){
	var number=parseInt($(element).prev().attr("value"));
	number++;
	$(element).prev().attr('value',number+"");
	goodsCount();
}

function deleteGoods(element){
	$(element).parent().parent().remove();
	saveData();
}

function deleteAllGoods(){
	$('.goods').remove();
	$('#checkAll').prop("checked",false);
	$('#totalGoods').html("已选商品0件");
	saveData();
}