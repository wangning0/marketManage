var userId = sessionStorage.getItem('userId');

var applyShop = avalon.define({
	$id: 'applyShop',
	applyingName: sessionStorage.getItem('userName'),
	allNoUsedShop: []
});

$.ajax({
	url: '/getAllNoUsedShop',
	type: 'GET',
	success: function(res) {
		if (res.status == 0) {
			applyShop.allNoUsedShop = res.body;
			avalon.scan();
		} else {
			alert(res.message)
		}
	},
	error: function(err) {
		alert(err)
	}
})


$('.right').click(function(e) {
	var shopId = $('.choosedShop').val();
	var applyReason = $('.reason').val();
	var shopName = $('#shopName').val();
	var applyInfo = {
		userId: parseInt(userId),
		shopId: parseInt(shopId),
		applyReason: applyReason,
		shopName: shopName
	};
	console.log(applyShop);
	$.ajax({
		url: '/applying',
		type: 'POST',
		conentType: 'application/json',
		data: applyInfo,
		success: function(res) {
			if (res.status == 0) {
				alert('成功提交申请！');
				window.location.href = '/admin';
			} else {
				alert(res.message);
			}
		},
		error: function(err) {
			alert(err);
		}
	})
})