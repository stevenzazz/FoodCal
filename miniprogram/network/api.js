var apiUrl = 'https://api.tianapi.com/txapi/nutrient/index'
var apiURl1 = 'https://api.papaba.cn/dida.ashx'

// var imgType = wx.getStorageSync('imgType') || 'fengjing'
// if(imgType=='fengjing'){
// }else{
//   var img = 'https://api.ixiaowai.cn/api/api.php?return=json'
// }

var img = 'https://api.ixiaowai.cn/gqapi/gqapi.php?return=json'



var $http = (method, url, data={}) =>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url,
      data,
      method,
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        resolve(res.data)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}

var getFoodDetail = (data)=> {
  return $http('GET',apiURl1,data)
}

// 搜索食物列表
var searchFoodList = (data)=> {
  return $http('GET',apiURl1,data)
}

// 请求随机图片
var getImage = (data)=> {
  return $http('GET',img)
}

module.exports = {
  getFoodDetail,
  searchFoodList,
  getImage
}

