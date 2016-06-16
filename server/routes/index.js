var express = require('express');
var router = express.Router();
var db = require('../db/db.js');
/*
	页面路由控制
 */
router.get('/login', function(req, res, next) {
	res.render('login');
});

router.get('/register', function(req, res, next) {
	res.render('/register');
});

router.get('/admin', function(req, res, next) {
	res.render('admiIndex');
});

router.get('/superAdmin', function(req, res, next) {
	res.render('superAdminIndex');
})

/*
	请求路由控制
*/
router.get('/getAllShopMessage', function(req, res, next) {
	db.getAllShopMessage(function(err, results) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: results,
				message: ''
			})
		}
	})
})

router.get('/getOneUserShopMessage', function(req, res, next) {
	var userId = req.query.userId;
	var applying = req.query.applying;
	db.getOneUserShopMessage(userId, applying, function(err, results) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: results,
				message: ''
			})
		}
	})
})

router.get('/getOneUserNoticeMessage', function(req, res, next) {
	var userId = req.query.userId;
	db.getOneUserNoticeMessage(userId, function(err, results) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: results,
				message: ''
			})
		}
	})
})

router.get('/getAllFeedback', function(req, res, next) {
	db.getAllFeedback(function(err, results) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: results,
				message: ''
			})
		}
	})
})

router.get('/searchSecondLevelAdmin', function(req, res, next) {
	db.searchSecondLevelAdmin(function(err, results) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: results,
				message: ''
			})
		}
	})
})

router.get('/deleteShopOwner', function(req, res, next) {
	var userId = req.query.userId;
	var shopId = req.query.shopId;
	db.deleteShopOwner(userId, shopId, function(err, result) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: result,
				message: ''
			})
		}
	})
})

router.get('/payedWater', function(req, res, next) {
	var shopId = req.query.shopId;
	db.payedWater(shopId, function(err, result) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: result,
				message: ''
			})
		}
	})
})

router.get('/payedEle', function(req, res, next) {
	var shopId = req.query.shopId;
	db.payedEle(shopId, function(err, result) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: result,
				message: ''
			})
		}
	})
})

router.get('/noPayedWater', function(req, res, next) {
	var shopId = req.query.shopId;
	db.noPayedWater(shopId, function(err, result) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: result,
				message: ''
			})
		}
	})
})

router.get('/noPayedEle', function(req, res, next) {
	var shopId = req.query.shopId;
	db.noPayedEle(shopId, function(err, result) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: result,
				message: ''
			})
		}
	})
})

router.get('/agreeApply', function(req, res, next) {
	var userId = req.query.userId;
	var shopId = req.query.shopId;
	db.agreeApply(userId, shopId, function(err, result) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: result,
				message: ''
			})
		}
	})
})

router.get('/applying', function(req, res, next) {
	var userId = req.query.userId;
	var shopId = req.query.shopId;
	db.applying(userId, shopId, function(err, result) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: result,
				message: ''
			})
		}
	})
})

router.post('/changePasswd', function(req, res, next) {
	var userId = req.body.userId;
	var passwd = req.body.passwd;
	db.changePasswd(userId, passwd, function(err, results) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: results,
				message: ''
			})
		}
	})
})

router.post('/register', function(req, res, next) {
	var userName = req.body.userName;
	var passwd = req.body.passwd;
	var infoObj = {
		userName: userName,
		passwd: passwd
	}
	db.register(infoObj, function(err, results) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: results,
				message: ''
			})
		}
	})
})

router.post('/login', function(req, res, next) {
	db.login(req.body, function(err, results) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else if (results.length == 0) {
			res.send({
				status: 1,
				body: [],
				message: '用户名／密码错误'
			})
		} else {
			res.send({
				status: 0,
				body: results,
				message: ''
			})
		}
	})
})

router.post('/sendMessage', function(req, res, next) {
	var message = req.body.message;
	var time = req.body.time;
	var allId = req.body.allId;
	var uId = req.body.uId;
	var messageInfo = {
		message: message,
		time: time,
		allId: allId
	}
	db.sendMessage(messageInfo, uId, function(err, results) {
		if (err) {
			res.send({
				status: 1,
				body: [],
				message: err
			})
		} else {
			res.send({
				status: 0,
				body: results,
				message: ''
			})
		}
	})
})
module.exports = router;