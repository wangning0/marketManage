var userId = sessionStorage.getItem('userId');

var pay = avalon.define({
	$id: 'pay',
	applyingName: sessionStorage.getItem('userName')
})