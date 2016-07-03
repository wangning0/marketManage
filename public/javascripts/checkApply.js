var checkApply = avalon.define({
	$id: 'checkApply',
	userName: sessionStorage.getItem('userName'),
	apply: []
})

$.ajax({
	url: '/getAllApply',
	type: 'GET',
	success: function(res) {
		if (res.status == 0) {
			checkApply.apply = res.body;
			avalon.scan();
		} else {
			alert('服务器出错!');
		}
	},
	error: function(err) {
		alert(err);
	}
})

$(document).on('click', '.agree', function() {
	var userId = $(this).attr('userid');
	var shopId = $(this).attr('shopid');
	var shopName = $(this).attr('shopName');
	$.ajax({
		url: '/agreeApply?userId=' + userId + '&shopId=' + shopId,
		type: 'GET',
		success: function(res) {
			if (res.status == 0) {
				var messageInfo = {
					message: shopName + '店铺申请成功!',
					uId: userId,
					allId: 0
				}
				$.ajax({
					url: '/sendMessage',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(messageInfo),
					success: function(res) {
						if (res.status == 0) {
							alert('操作成功!');
							window.location.reload();
						} else {
							alert('操作失败');
						}
					},
					error: function(err) {
						alert(err);
					}
				})
			} else {
				alert('操作失败');
			}
		},
		error: function(err) {
			alert('取消失败！', err);
		}
	})
})

$(document).on('click', '.disagree', function() {
	var userId = $(this).attr('userid');
	var shopId = $(this).attr('shopid');
	var shopName = $(this).attr('shopName');
	$.ajax({
		url: '/cancleApplying?userId=' + userId + '&shopId=' + shopId,
		type: 'GET',
		success: function(res) {
			if (res.status == 0) {
				var messageInfo = {
					message: shopName + '店铺申请失败!',
					uId: userId,
					allId: 0
				}
				$.ajax({
					url: '/sendMessage',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(messageInfo),
					success: function(res) {
						if (res.status == 0) {
							alert('操作成功!');
							window.location.reload();
						} else {
							alert('操作失败');
						}
					},
					error: function(err) {
						alert(err);
					}
				})
			} else {
				alert('操作失败');
			}
		},
		error: function(err) {
			alert('取消失败！', err);
		}
	})
})