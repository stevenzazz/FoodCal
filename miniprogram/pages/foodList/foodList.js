import { searchFoodList } from '../../network/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNums:1,
    foodList:[],
    value:'',
    isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '请求数据~',
    })
    var value = options.value
    this.setData({
      value:value
    })
    this.getFoodList(value)
  },

  async getFoodList(value){
    var res = await searchFoodList({
      page:this.data.pageNums,
      m:'search',
      key:value
    })
    wx.hideLoading()
    if(res.status==1){
      this.setData({
        foodList:this.data.foodList.concat(res.data.list) 
      })
    }else{
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1500);
    }
    console.log(res)
  },  

  intoDetail(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/foodDetails/foodDetails?id=' + id,
    })
  },

  back(){
    wx.navigateBack({
      delta: 1,
    })
  },  

  getUserinfo(e){
    console.log(e)
    if(e.detail.errMsg=="getUserInfo:ok"){
      this.setData({
        isLogin: true
      });
    }
  },

  
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          this.setData({
            isLogin: true
          });
        }
      }
    })
   
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
    this.setData({
      pageNums:this.data.pageNums + 1
    })
    this.getFoodList(this.data.value)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})