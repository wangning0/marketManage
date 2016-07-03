//console.log(window.location.search.slice(4));
var userId = sessionStorage.getItem('userId');
var adminIndex = avalon.define({
	$id: 'adminIndex',
	applyingName: sessionStorage.getItem('userName'),
	applyingShop: [],
	hasedShop: [],
	allShop: [],
	info: {
		money: '',
		applyingShop: '',
		hasedShop: ''
	}
})
$.ajax({
	url: '/oneUser?userId=' + userId,
	type: 'GET',
	success: function(res) {
		if (res.status == 0) {
			adminIndex.info.money = res.body[0].money;
			avalon.scan();
		}
	},
	error: function(err) {
		alert(err);
	}
})

//申请的店铺
$.ajax({
	url: '/getOneUserShopMessage?applying=1&userId=' + userId,
	type: 'GET',
	success: function(res) {
		if (res.status == 0) {
			adminIndex.applyingShop = res.body;
			//console.log(res.body.length)
			adminIndex.info.applyingShop = res.body.length;
			avalon.scan();
		}
	},
	error: function(err) {
		alert(err);
	}
})

//已经有的店铺
$.ajax({
	url: '/getOneUserShopMessage?applying=0&userId=' + userId,
	type: 'GET',
	success: function(res) {
		if (res.status == 0) {
			adminIndex.hasedShop = res.body;
			adminIndex.info.hasedShop = res.body.length;
			avalon.scan();
		}
	},
	error: function(err) {
		alert(err);
	}
})

$(document).on('click', '.cancleApply', function() {
	$.ajax({
		url: '/cancleApplying?userId=' + userId + '&shopId=' + $(this).attr('shopid'),
		type: 'GET',
		success: function(res) {
			if (res.status == 0) {
				alert('取消成功!');
				window.location.reload();
			} else {
				alert('取消失败！')
			}
		},
		error: function(err) {
			alert('取消失败！', err);
		}
	})
})
$(document).on('click', '.payWater', function() {
	var shopId = parseInt($(this).attr('shopid'));
	$.ajax({
		url: '/payedWater?shopId=' + shopId + '&userId=' + userId,
		type: 'GET',
		success: function(res) {
			if (res.status == 0) {
				alert('缴费成功')
				window.location.reload();
			} else {
				alert(res.message);
			}
		},
		error: function(err) {
			alert('缴费失败！', err)
		}
	})
});
$(document).on('click', '.payEle', function() {
	var shopId = parseInt($(this).attr('shopid'));
	$.ajax({
		url: '/payedEle?shopId=' + shopId + '&userId=' + userId,
		type: 'GET',
		success: function(res) {
			if (res.status == 0) {
				alert('缴费成功')
				window.location.reload();
			} else {
				alert(res.message);
			}
		},
		error: function(err) {
			alert('缴费失败！', err)
		}
	})
});
//自定义过滤器
avalon.filters.myfilter = function(str, args, args2) {
	var ret = str ? '否' : '是';
	return ret;
}