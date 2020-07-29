var apiUrl = 'https://api.tianapi.com/txapi/nutrient/index'
var apiURl1 = 'https://api.papaba.cn/dida.ashx'
var $http = (method, url, data) =>{
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

module.exports = {
  getFoodDetail,
  searchFoodList
}

