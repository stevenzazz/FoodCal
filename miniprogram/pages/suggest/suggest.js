// pages/suggest/suggest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autosize:{
      maxHeight:300,
      minHeight:100
    },
    value:'',
    buttonShow:true,
    popupShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  intoSuggestList(){
    wx.navigateTo({
      url: '/pages/suggestList/suggestList',
    })
  },

  onClose(){
    this.setData({
      popupShow:false
    })
  },

  logtap(){
    console.log(12)
    wx.getImageInfo({
      src: 'cloud://zhouhao-c89hw.7a68-zhouhao-c89hw-1300970301/icon/WechatIMG38.jpeg',
      success:res=>{
         wx.saveImageToPhotosAlbum({
            filePath: res.path,
          })
      }
    })
    
   
  },

  showpop(){
    this.setData({
      popupShow:true
    })
  },

  valueChange(e){
    console.log(e)
    this.setData({
      value:e.detail,
      buttonShow:e.detail.length>0?false:true
    })
  },

  async submit(){
    if(!this.data.value){
      
    } 
    const db = wx.cloud.database()
    var res = await db.collection('feedback').add({
      data:{value:this.data.value}
    })
    console.log(res)
    if(res.errMsg=="collection.add:ok"){
      wx.showToast({
        title: '反馈成功',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500);
      
    }
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