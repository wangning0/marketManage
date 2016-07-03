$('.register').click(function(e) {
	e.preventDefault();
	var userName = $('#userName').val();
	var passwd = $('#passwd').val();
	var repasswd = $('#repasswd').val();
	if (userName && passwd && repasswd) {
		if (passwd === repasswd) {
			/*console.log('ok');*/
			var data = {};
			data.userName = userName;
			data.passwd = passwd;
			$.ajax({
				url: '/register',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				success: function(res) {
					if (res.status == 0) {
						window.location = 'login';
					} else {
						alert('注册失败')
						window.location.reload();
					}
				},
				err: function(err) {
					alert(err);
				}
			})
		} else {
			alert('两次密码输入错误!')
		}
	} else {
		alert('不能为空!')
	}
})