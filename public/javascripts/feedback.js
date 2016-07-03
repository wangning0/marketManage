var userId = sessionStorage.getItem('userId');

var feedback = avalon.define({
	$id: 'feedback',
	applyingName: sessionStorage.getItem('userName')
});

$('.right').click(function(e) {
	var feedbackcontent = $('.feedback').val();
	var feedback = {
		userId: parseInt(userId),
		feedback: feedbackcontent
	};
	console.log(feedback);
	if (!feedbackcontent) {
		alert('不能为空')
		return;
	}
	$.ajax({
		url: '/sendFeedback',
		type: 'POST',
		conentType: 'application/json',
		data: feedback,
		success: function(res) {
			if (res.status == 0) {
				alert('留言成功');
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