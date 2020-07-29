// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
var d = new Date();
const time = d.getFullYear() + '-' + (Number(d.getMonth()) + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('homeData').doc(event._id).update({
    data:{
      comment: _.push([{
        nickName: event.userinfo.nickName,
        avatarUrl: event.userinfo.avatarUrl,
        time: time,
        content: event.content,
      }])
    }
  })
}