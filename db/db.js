var mysql = require('mysql');
var async = require('async');
var schedule = require('node-schedule');
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
var rule = new schedule.RecurrenceRule();
rule.date = 1;
rule.hour = 0;
rule.minute = 0;
var j = schedule.scheduleJob(rule, function() {
  connection.query('select user.userId,shopMessage.shopId,payWater,payEle,waterFee,eleFee,money from `shop-user` join `shopMessage` join `user` on `shop-user`.userId=`user`.userId and `shop-user`.shopId=`shopMessage`.shopId where applying=0', function(err, results) {
    async.eachOfSeries(results, function(item, index, next) {
        if ((item.waterFee + item.eleFee) > item.money) {
          connection.query('insert into message set ?', {
            message: '余额不足！请充值',
            time: new Date(),
            all: 0
          }, function(err, results1) {
            if (err) {
              next(err);
              return;
            }
            connection.query('insert into `user-message` set ?', {
              userId: item.userId,
              messageId: results1.insertId
            }, function(err, result) {
              next(err);
            })
          })
        } else {
          console.log(item);
          connection.query('update shopMessage set payWater=0,waterFee=0 where shopId=?', [item.shopId], function(err, result) {
            //cb(err, result);
            if (err) {
              next(err);
              return;
            }
            connection.query('select money from `user` where userId=?', [item.userId], function(err, resu) {
              if (err) {
                next(err);
                return;
              }
              var money = parseInt(resu[0].money) - parseInt(item.waterFee);
              console.log(money);
              connection.query('update user set money=? where userId=?', [money, item.userId], function(err, result) {
                if (err) {
                  next(err);
                  return;
                }
                connection.query('update shopMessage set payEle=0,eleFee=0 where shopId=?', [item.shopId], function(err, result) {
                  //cb(err, result);
                  if (err) {
                    next(err);
                    return;
                  }
                  money = parseInt(money) - parseInt(item.eleFee);
                  console.log('money', money);
                  connection.query('update user set money=? where userId=?', [money, item.userId], function(err, result) {
                    next(err);
                  })
                })
              })
            })

          });
        }
      },
      function(err) {
        console.log(err);
      })
  })
});


module.exports = {
  //查询所有商铺信息
  getAllShopMessage: function(cb) {
    connection.query('select * from `shopMessage`', function(err, results, fields) {
      cb(err, results);
    })
  },
  //查询某一个用户所拥有的商铺的信息
  getOneUserShopMessage: function(userId, applying, cb) {
    connection.query('select shopId from `shop-user` where `userId` = ? and applying=?', [userId, applying], function(err, results, fields) {
      var response = [];
      async.eachOfSeries(results, function(item, index, next) {
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
    connection.query('(select * from message where `all`=1) union (select  message.messageId,message,time,`all`  from message   join (select messageId from `user-message` where userId=?) middle on middle.messageId=message.messageId) ORDER BY time DESC ', [userId], function(err, results) {
      cb(err, results);
    })
  },
  //查询所有的二级管理员对一级管理员的留言反馈
  getAllFeedback: function(cb) {
    connection.query('select userName,feedback,time from `user` join `user-feedback` join `feedback` on `user`.userId=`user-feedback`.uId and `user-feedback`.fId=`feedback`.feedbackId order by time DESC', function(err, results) {
      cb(err, results);
    })
  },
  //改变密码
  changePasswd: function(userId, passwd, cb) {
    connection.query('update user set userPasswd =? where userId=?', [passwd, userId], function(err, results) {
      cb(err, results);
    })
  },
  //注册
  register: function(userObj, cb) {
    connection.query('select * from user where userName=?', [userObj.userName], function(err, results) {
      if (err) {
        cb(err)
        return;
      }
      if (results.length != 0) {
        cb('用于名已存在');
        return;
      } else {
        connection.query('insert into user set ?', {
          userName: userObj.userName,
          userPasswd: userObj.passwd,
          userAuth: 1
        }, function(err, result) {
          cb(err, result);
        })
      }
    })
  },
  //登录
  login: function(userObj, cb) {
    connection.query('select * from user where userName=? and userPasswd=?', [userObj.userName, userObj.passwd], function(err, results) {
      cb(err, results);
    })
  },
  //查询所有的二级管理员
  searchSecondLevelAdmin: function(cb) {
    connection.query('select userId,userName from user where userAuth=1', function(err, results) {
      cb(err, results);
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
        cb(err)
      if (!messageInfo.allId) {
        connection.query('insert into `user-message` set ?', {
          userId: uId,
          messageId: results.insertId
        }, function(err, result) {
          cb(err, results);
        })
      } else {
        cb(err, results);
      }
    })
  },
  //删除某一个二级管理员的某一个商铺信息
  deleteShopOwner: function(userId, shopId, cb) {
    connection.query('update shopMessage set owner=null,used=0,waterFee=0,eleFee=0,payWater=0,payEle=0,name=null where shopId=?', [shopId], function(err, results) {
      if (err) {
        cb(err);
        return;
      }
      connection.query('delete from `shop-user` where userId=? and shopId=?', [userId, shopId], function(err, result) {
        cb(err, result);
      })
    })
  },
  //交了水费
  payedWater: function(userId, shopId, cb) {
    var sId = shopId;
    connection.query('select * from user where userId=?', [userId], function(err, result) {
      if (err) {
        cb(err)
        return;
      }
      var money = result[0].money;
      connection.query('select waterFee from shopMessage where shopId=?', [shopId], function(err, results) {
        if (err) {
          cb(err)
          return;
        }
        var waterFee = results[0].waterFee;
        if (money > waterFee) {
          connection.query('update shopMessage set payWater=0,waterFee=0 where shopId=?', [shopId], function(err, result) {
            //cb(err, result);
            if (err) {
              cb(err)
              return;
            }
            money = parseInt(money) - parseInt(waterFee);
            connection.query('update user set money=? where userId=?', [money, userId], function(err, result) {
              cb(err, result);
            })
          })
        } else {
          cb('余额不足！请充值!')
        }
      })
    })
  },
  //交了电费
  payedEle: function(userId, shopId, cb) {
    connection.query('select * from user where userId=?', [userId], function(err, result) {
      if (err) {
        cb(err)
        return;
      }
      var money = result[0].money;
      connection.query('select eleFee from shopMessage  where shopId=?', [shopId], function(err, result) {
        if (err) {
          cb(err)
          return;
        }
        var eleFee = result[0].eleFee;
        if (money > eleFee) {
          connection.query('update shopMessage set payEle=0,eleFee=0 where shopId=?', [shopId], function(err, result) {
            //cb(err, result);
            if (err) {
              cb(err)
              return;
            }
            money = parseInt(money) - parseInt(eleFee);
            connection.query('update user set money=? where userId=?', [money, userId], function(err, result) {
              cb(err, result);
            })
          })
        } else {
          cb('余额不足！请充值!')
        }
      })

    })
  },
  //没交水费
  noPayedWater: function(shopId, cb) {
    connection.query('update shopMessage set payWater=1 where shopId=?', [shopId], function(err, result) {
      cb(err, result);
    })
  },
  //没交电费
  noPayedEle: function(shopId, cb) {
    connection.query('update shopMessage set payELe=1 where shopId=?', [shopId], function(err, result) {
      cb(err, result);
    })
  },
  //同意二级管理员的店铺申请
  agreeApply: function(userId, shopId, cb) {
    console.log('userId', userId, shopId);
    connection.query('select userName from user where userId=?', [userId], function(err, result) {
      if (err) {
        cb(err);
        return;
      }
      var name = result[0].userName;
      connection.query('update shopMessage set owner=?,used=1 where shopId=?', [name, shopId], function(err, result) {
        if (err) {
          cb('err', err);
          return;
        }
        console.log('usewrId', userId, shopId);
        userId = parseInt(userId);
        shopId = parseInt(shopId);
        connection.query('update `shop-user` set applying=? where userId=? and shopId=?', [0, userId, shopId], function(err, result1) {
          console.log('e', err);
          cb(err, result1);
        })
      })
    })
  },
  //申请店铺
  applying: function(userId, shopId, applyReason, shopName, cb) {
    connection.query('select * from `shop-user` where userId=? and shopId=? and applying=1', [userId, shopId], function(err, res) {
      if (err) {
        cb(err);
        return false;
      }
      if (res.length != 0) {
        cb('已经申请!');
      } else {
        connection.query('insert into `shop-user` set?', {
          userId: userId,
          shopId: shopId,
          applying: 1,
          applyReason: applyReason
        }, function(err, result) {
          if (err) {
            console.log('ersr', err);
            cb(err)
            return false;
          } else {
            connection.query('update `shopMessage` set name=? where shopId=?', [shopName, shopId], function(err, resultss) {
              console.log('errw', err);
              cb(err, resultss);
            })
          }
        })
      }
    })
  },
  //取消申请
  cancelApplying: function(userId, shopId, cb) {
    connection.query('delete from `shop-user` where userId=? and shopId=? and applying=1', [userId, shopId], function(err, result) {
      cb(err, result);
    })
  },
  addMoney: function(userId, money, cb) {
    connection.query('select money from user  where userId=?', [userId], function(err, result) {
      if (err) {
        cb(err);
        return;
      }
      money = parseInt(money) + parseInt(result[0].money);
      connection.query('update user set money=? where userId=?', [money, userId], function(err, result) {
        cb(err, result);
      })
    })
  },
  oneUser: function(userId, cb) {
    connection.query('select * from user where userId=?', [userId], function(err, result) {
      cb(err, result);
    })
  },
  allApplyShop: function(cb) {
    connection.query('select userName,location,applyReason from `user` join `shopMessage` join `shop-user` on `user`.userId=`shop-user`.userId and `shopMessage`.shopId=`shop-user`.shopId where applying=1', function(err, results) {
      cb(err, results);
    })
  },
  getAllNoUsedShop: function(cb) {
    connection.query('select shopId,location from shopMessage where used=0', function(err, results) {
      cb(err, results);
    })
  },
  sendFeedback: function(userId, feedback, cb) {
    connection.query('insert into `feedback` set?', {
      feedback: feedback,
      time: new Date()
    }, function(err, result) {
      if (err) {
        cb(err);
        return false;
      }
      var fId = result.insertId;
      connection.query('insert into `user-feedback` set?', {
        fId: fId,
        uId: userId
      }, function(err, results) {
        cb(err, results);
      })
    })
  },
  oneUserByName: function(userName, cb) {
    connection.query('select userId from user where userName=?', [userName], function(err, result) {
      cb(err, result);
    })
  },
  getAllApply: function(cb) {
    connection.query('select userName , location,applyReason,`user`.userId,`shopMessage`.shopId from `shop-user` join `user` join `shopMessage` on `shop-user`.shopId=shopMessage.shopId and `shop-user`.userId=`user`.userId where applying=1', function(err, results) {
      cb(err, results);
    })
  },
  setWater: function(value, shopId, cb) {
    connection.query('update shopMessage set waterFee=?,payWater=1 where shopId=?', [waterEle, shopId], function(err, result) {
      cb(err, result);
    })
  },
  setEle: function(value, shopId, cb) {
    connection.query('update shopMessage set eleFee=?,payEle=1 where shopId=?', [value, shopId], function(err, result) {
      cb(err, result);
    })
  }
};