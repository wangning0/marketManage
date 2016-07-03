var userId = sessionStorage.getItem('userId');

var addMoney = avalon.define({
	$id: 'addMoney',
	applyingName: sessionStorage.getItem('userName')
})
$('.right').click(function(e) {
	e.preventDefault();
	var money = $('#money').val();
	if (!money) {
		alert('不能为空!');
		return false;
	}
	$.ajax({
		url: '/addMoney?userId=' + userId + '&money=' + money,
		type: 'GET',
		success: function(res) {
			if (res.status == 0) {
				alert('充值成功');
				window.location.href = '/admin?id=' + userId;
			} else {
				alert('充值失败!');
			}
		},
		error: function(err) {
			alert('充值失败!', err);
		}
	})
})