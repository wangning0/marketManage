var mysql = require('mysql');
var async = require('async');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wangning',
  database: 'shopManage'
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

var db = {
  //查询所有商铺信息
  getAllShopMessage: function(cb) {
    connection.query('select * from `shopMessage`', function(err, results, fields) {
      cb(err, results);
    })
  },
  //查询某一个用户所拥有的商铺的信息
  getOneUserShopMessage: function(userId, cb) {
    connection.query('select shopId from `shop-user` where `userId` = ?', [userId], function(err, results, fields) {
      var response = [];
      console.log(results);
      async.eachOfSeries(results, function(item, index, next) {
          console.log(item.shopId);
          connection.query('select * from `shopMessage` where `shopId` = ? ', [item.shopId], function(err, data) {
            if (err) {
              cb(err);
              return;
            } else {
              response[index] = data;
              next(err);
            }
          })
        },
        function(err) {
          process.nextTick(function() {
            cb(err, response);
          })
        })
    })
  },
  //查询某一个用户的所有通知消息
  getOneUserNoticeMessage: function(userId, cb) {
    connection.query('select * FROM message left join (select messageId from `user-message` where userId=?) a on message.messageId=a.messageId order by time DESC ', [userId], function(err, results) {
      cb(err, results);
    })
  },
  //查询所有的二级管理员对一级管理员的留言反馈
  getAllFeedback: function(cb) {
    connection.query('select userName,feedback,time from `user` join `user-feedback` join `feedback` on `user`.userId=`user-feedback`.uId and `user-feedback`.fId=`feedback`.feedbackId order by time DESC', function(err, results) {
      cb(err, results);
      //console.log(results);
    })
  },
  //改变密码
  changePasswd: function(userId, passwd, cb) {
    connection.query('update user set userPasswd =? where userId=?', [passwd, userId], function(err, results) {
      //console.log(results);
      //cb(err,results);
    })
  },
  //注册
  register: function(userObj, cb) {
    connection.query('select * from user where userName=?', [userObj.userName], function(err, results) {
      if (err) {
        //cb(err)
        return;
      }
      if (results.length != 0) {
        //console.log(results);
        //cb('用于名已存在');
        return;
      } else {
        connection.query('insert into user set ?', {
          userName: userObj.userName,
          userPasswd: userObj.passwd,
          userAuth: 1
        }, function(err, result) {
          console.log(result);
          //cb(err,result);
        })
      }
    })
  },
  //登录
  login: function(userObj, cb) {
    connection.query('select * from user where userName=? and userPasswd=?', [userObj.userName, userObj.passwd], function(err, results) {
      //cb(err, results);
      console.log(results);
    })
  },
  //查询所有的二级管理员
  searchSecondLevelAdmin: function(cb) {
    connection.query('select userId,userName from user where userAuth=1', function(err, results) {
      //cb(err, results);
      console.log(results);
    })
  },
  //发送通知
  sendMessage: function(messageInfo, uId, cb) {
    connection.query('insert into message set ?', {
      message: messageInfo.message,
      time: messageInfo.time,
      all: messageInfo.allId
    }, function(err, results) {
      if (err)
        console.log(err);
      console.log(results);
      if (!messageInfo.allId) {
        connection.query('insert into `user-message` set ?', {
          userId: uId,
          messageId: results.insertId
        }, function(err, result) {
          //cb(err,results);
          console.log(result);
        })
      }
    })
  },
  //删除某一个二级管理员的某一个商铺信息
  deleteShopOwner: function(userId, shopId, cb) {
    connection.query('update shopMessage set owner=null,used=0,waterFee=0,eleFee=0,payWater=0,payEle=0 where shopId=?', [shopId], function(err, results) {
      //cb(err,results);
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
      connection.query('delete from `shop-user` where userId=? and shopId=?', [userId, shopId], function(err, result) {
        if (err) {
          console.log(1, err);
        }
        console.log(result);
      })
    })
  },
  //交了水费
  payedWater: function(shopId, cb) {
    connection.query('update shopMessage set payWater=0 where shopId=?', [shopId], function(err, result) {
      console.log(result);
    })
  },
  //交了电费
  payedEle: function(shopId, cb) {
    connection.query('update shopMessage set payELe=0 where shopId=?', [shopId], function(err, result) {
      console.log(result);
    })
  },
  //没交水费
  noPayedWater: function(shopId, cb) {
    connection.query('update shopMessage set payWater=1 where shopId=?', [shopId], function(err, result) {
      console.log(result);
    })
  },
  //没交电费
  noPayedEle: function(shopId, cb) {
    connection.query('update shopMessage set payELe=1 where shopId=?', [shopId], function(err, result) {
      console.log(result);
    })
  },
  //同意二级管理员的店铺申请
  agreeApply: function(userId, shopId, cb) {
    connection.query('select userName from user where userId=?', [userId], function(err, result) {
      if (err) {
        console.log(1, err);
        return;
      }
      var name = result[0].userName;
      console.log(name)
      connection.query('update shopMessage set owner=?,used=1 where shopId=?', [name, shopId], function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(result);
        connection.query('insert into `shop-user` set?', {
          userId: userId,
          shopId: shopId,
          apply: 0
        }, function(err, result1) {
          console.log(result1);
        })
      })
    })
  },
  applying: function(userId, shopId, cb) {
    //connection.query('update')
  }
};
//db.getAllShopMessage();
//db.getOneUserShopMessage(3);
//db.getOneUserNoticeMessage(3);
//db.getAllFeedback();
//db.changePasswd(1, '123');
//db.searchSecondLevelAdmin()
/*db.sendMessage({
  message: '这是一条对lan的广播',
  time: new Date(),
  allId: 0
}, 2);*/
//db.deleteShopOwner(2, 2);
//db.payedWater(3)
db.agreeApply(2, 2);