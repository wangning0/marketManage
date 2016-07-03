var allFeedback = avalon.define({
	$id: 'allFeedback',
	userName: sessionStorage.getItem('userName'),
	allFeedback: []
})


$.ajax({
	url: '/getAllFeedback',
	type: 'GET',
	success: function(res) {
		if (res.status == 0) {
			allFeedback.allFeedback = res.body;
			avalon.scan();
		} else {
			alert('服务器出错!');
		}
	},
	error: function(err) {
		alert(err);
	}
})