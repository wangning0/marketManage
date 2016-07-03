var userId = sessionStorage.getItem('userId');

var notice = avalon.define({
	$id: 'notice',
	applyingName: sessionStorage.getItem('userName'),
	message: []
})

$.ajax({
	url: '/getOneUserNoticeMessage?userId=' + userId,
	type: 'GET',
	success: function(res) {
		if (res.status == 0) {
			notice.message = res.body;
			avalon.scan();
		}
	},
	error: function(err) {
		alert(err);
	}
})