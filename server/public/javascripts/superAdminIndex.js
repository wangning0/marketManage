var allShop = avalon.define({
	$id: 'allShop',
	userName: sessionStorage.getItem('userName'),
	allShops: []
})

$.ajax({
	url: '/getAllShopMessage',
	type: 'GET',
	success: function(res) {
		if (res.status == 0) {
			allShop.allShops = res.body;
		} else {
			alert(res.message);
		}
	},
	error: function(err) {
		alert(err);
	}
})

var shopId;
var userId;
//deleteShop
$(document).on('click', '.opa', function() {
	console.log('1');
	shopId = $(this).attr('shopid');
	var userName = $(this).attr('owner');
	var info = {
		userName: userName
	}
	console.log(info);
	$.ajax({
		url: '/oneUserByName',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(info),
		success: function(res) {
			if (res.status == 0) {
				userId = res.body[0].userId;
			} else {
				alert(res.message);
			}
		},
		error: function(err) {
			alert(err);
		}
	})
})
$('.deleteShop').click(function() {
	$.ajax({
		url: '/deleteShopOwner?shopId=' + shopId + '&userId=' + userId,
		type: 'GET',
		success: function(res) {
			if (res.status == 0) {
				alert('收回成功');
				window.location.reload();
			}
		},
		error: function(err) {
			alert(err);
		}
	})
})
var value;

$(document).on('click', '.setwater', function() {
	shopId = $(this).attr('shopid');
})
$('.waterSubmit').click(function() {
	var info = {
		shopId: shopId,
		value: $('#watervalue').val()
	}
	$.ajax({
		url: '/setWater',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(info),
		success: function(res) {
			if (res.status == 0) {
				alert('设置成功');
				window.location.reload();
			} else {
				alert(res.message);
			}
		},
		error: function(err) {
			alert(err);
		}
	})
})
$(document).on('click', '.setele', function() {
	shopId = $(this).attr('shopid');
})
$('.eleSubmit').click(function() {
	var info = {
		shopId: shopId,
		value: $('#elevalue').val()
	}
	$.ajax({
		url: '/setEle',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(info),
		success: function(res) {
			if (res.status == 0) {
				alert('设置成功');
				window.location.reload();
			} else {
				alert(res.message);
			}
		},
		error: function(err) {
			alert(err);
		}
	})
})
avalon.filters.use = function(str, args, args2) {
	var ret = str == 1 ? '是' : '否';
	return ret;
}
avalon.filters.myfilter = function(str, args, args2) {
	var ret = str ? '否' : '是';
	return ret;
}
avalon.filters.unused = function(str, args, args2) {
	var ret = str ? str : '未使用';
	return ret;
}