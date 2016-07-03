var sendNotice = avalon.define({
	$id: 'sendNotice',
	userName: sessionStorage.getItem('userName'),
	allUser: []
})
$.ajax({
	url: '/searchSecondLevelAdmin',
	type: 'GET',
	success: function(res) {
		if (res.status == 0) {
			sendNotice.allUser = res.body;
			avalon.scan();
		} else {
			alert(res.message)
		}
	},
	error: function(err) {
		alert(err)
	}
})

/*var uId = req.body.uId;
	var messageInfo = {
		message: message,
		time: time,
		allId: allId
	}*/

$('.send').click(function() {
	var message = $('.message').val();
	var userId = parseInt($('.choosedUser').val());
	console.log(userId);
	var messageInfo = {
		message: message,
		uId: userId
	}
	if (!message) {
		alert('不能为空');
		return false;
	}
	if (userId != 0) {
		messageInfo.allId = 0;
	} else {
		messageInfo.allId = 1;
	}

	$.ajax({
		url: '/sendMessage',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(messageInfo),
		success: function(res) {
			if (res.status == 0) {
				alert('留言成功!');
				window.location.href = '/superAdmin';
			} else {
				alert('留言失败!');
			}
		},
		error: function(err) {
			alert(err);
		}
	})

})