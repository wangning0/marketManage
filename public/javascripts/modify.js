var userId = sessionStorage.getItem('userId');
var modify = avalon.define({
	$id: 'modify',
	applyingName: sessionStorage.getItem('userName')
})
$('.modify').click(function(e) {
	e.preventDefault();
	var passwd = $('#passwd').val();
	var repasswd = $('#repasswd').val();
	if (passwd && repasswd) {
		if (passwd === repasswd) {
			/*console.log('ok');*/
			var data = {};
			data.userId = userId;
			data.passwd = passwd;
			$.ajax({
				url: '/changePasswd',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				success: function(res) {
					if (res.status == 0) {
						window.location = '/';
					} else {
						alert('失败')
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