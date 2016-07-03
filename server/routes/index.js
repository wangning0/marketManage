var express = require('express');
var router = express.Router();
var db = require('../db/db.js');
/*
	页面路由控制
 */
router.get('/', function(req, res, next) {
	res.render('login');
})
router.get('/login', function(req, res, next) {
	res.render('login');
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.get('/admin', function(req, res, next) {
	res.render('admiIndex');
});
router.get('/modifyPasswd', function(req, res, next) {
	res.render('modifyPasswd');
})
router.get('/superAdmin', function(req, res, next) {
	res.render('superAdminIndex');
})
router.get('/notice', function(req, res, next) {
	res.render('notice');
})
router.get('/addMoneyPage', function(req, res, next) {
	res.render('addMoney');
})
router.get('/pay', function(req, res, next) {
	res.render('pay');
})
router.get('/applyShop', function(req, res, next) {
	res.render('applyShop');
})
router.get('/feedback', function(req, res, next) {
	res.render('feedback');
})
router.get('/sendNotice', function(req, res, next) {
	res.render('sendNotice');
})
router.get('/checkApply', function(req, res, next) {
	res.render('checkApply');
})
router.get('/allFeedback', function(req, res, next) {
	res.render('allFeedback');
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
	var userId = req.query.userId;
	db.payedWater(userId, shopId, function(err, result) {
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
	var userId = req.query.userId;
	db.payedEle(userId, shopId, function(err, result) {
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
	console.log(userId, shopId);
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

router.post('/applying', function(req, res, next) {
	var userId = req.body.userId;
	var shopId = req.body.shopId;
	var applyReason = req.body.applyReason;
	console.log(req.body.userId);
	db.applying(userId, shopId, applyReason, function(err, result) {
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
});
router.get('/cancleApplying', function(req, res, next) {
	var userId = req.query.userId;
	var shopId = req.query.shopId;
	db.cancelApplying(userId, shopId, function(err, result) {
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
	};
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
	var allId = req.body.allId;
	var uId = req.body.uId;
	var messageInfo = {
		message: message,
		time: new Date(),
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
router.get('/addMoney', function(req, res, next) {
	var userId = req.query.userId;
	var money = req.query.money;
	db.addMoney(userId, money, function(err, result) {
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
router.get('/oneUser', function(req, res, next) {
	var userId = req.query.userId;
	db.oneUser(userId, function(err, result) {
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
});
router.post('/oneUserByName', function(req, res, next) {
	var userName = req.body.userName;
	console.log(userName);
	db.oneUserByName(userName, function(err, result) {
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
});
router.get('/allApplyShop', function(req, res, next) {
	db.allApplyShop(function(err, results) {
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
router.get('/getAllNoUsedShop', function(req, res, next) {
	db.getAllNoUsedShop(function(err, results) {
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
router.post('/sendFeedback', function(req, res, next) {
	var userId = req.body.userId;
	var feedback = req.body.feedback;
	db.sendFeedback(userId, feedback, function(err, results) {
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
router.get('/getAllApply', function(req, res, next) {
	db.getAllApply(function(err, results) {
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
router.post('/setWater', function(req, res, next) {
	var value = req.body.value;
	var shopId = req.body.shopId;
	db.setWater(value, shopId, function(err, results) {
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
router.post('/setEle', function(req, res, next) {
	var value = req.body.value;
	var shopId = req.body.shopId;
	db.setEle(value, shopId, function(err, results) {
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