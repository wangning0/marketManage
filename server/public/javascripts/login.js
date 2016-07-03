$('.login').click(function(e) {
	e.preventDefault();
	if (!$('#userName').val() || !$('#passwd').val()) {
		alert('用户名或密码不能为空');
		return false;
	}
	var data = {};
	data.userName = $('#userName').val();
	data.passwd = $('#passwd').val();
	$.ajax({
		url: '/login',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		success: function(res) {
			if (res.status == 0) {
				if (!res.body[0].userAuth) {
					sessionStorage.setItem("userName", res.body[0].userName);
					sessionStorage.setItem("userId", res.body[0].userId);
					window.location.href = 'superAdmin';
				} else {
					sessionStorage.setItem("userName", res.body[0].userName);
					sessionStorage.setItem("userId", res.body[0].userId);
					sessionStorage.setItem("money", res.body[0].money);
					window.location.href = 'admin?id=' + res.body[0].userId;
				}
			} else {
				alert(res.message);
			}
		},
		error: function(err) {
			alert(err);
		}
	})
})

$('.register').click(function(e) {
	e.preventDefault();
	window.location.href = 'register';
})