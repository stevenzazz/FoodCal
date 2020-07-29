import { getFoodDetail } from '../../network/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.getData(id)
  },

  async getData(id){
    var res = await getFoodDetail({
      id:id,
      m:'getIngredientDetails'
    })
    console.log(res)
    if(res.status==1){
      this.setData({
        foodData:res.data
      })
    }
  },

  back(){
    wx.navigateBack({
      delta: 1
    })
  },

  // convertKey (arr, key) {
  //   let newArr = [];
  //   arr.forEach((item, index) => {
  //       let newObj = {};
  //       for (var i = 0; i < key.length; i++) {
  //           newObj[key[i]] = item[Object.keys(item)[i]]
  //       }
  //       newArr.push(newObj);
  //   })
  //   return newArr;
  // },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showShareMenu({
      // withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  onShareTimeline: function () {
    return { }
  }, 


  /**
   * 生命周期函数--监听页面隐藏 
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{}
  }
})