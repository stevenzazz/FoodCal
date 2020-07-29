import { searchFoodList } from '../../network/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // async getxig(){
  //   var res = await searchFoodList({
  //     page:1,
  //     m:'search',
  //     key:'西瓜'
  //   })
  //   console.log(res)
  // },

  // 点击搜索
  search(){
    var value = this.data.value
    if(!value){
      wx.showToast({
        title: '请输入哦~',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/foodList/foodList?value=' + value,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
    
  }
})