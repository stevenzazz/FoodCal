import { searchFoodList,getImage } from '../../network/api'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    speed:false,
    imgSrc:'',
    offPrompt:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var imgSrc = wx.getStorageSync('imgSrc') || '../../images/bg.gif'
    var offPrompt = wx.getStorageSync('offPrompt') == 'false' ? false : true
    this.setData({
      imgSrc,offPrompt
    })
  },

  onFengche(){
    var z = () =>{
      this.setData({
        speed:!this.data.speed
      })
    }
    z()
    setTimeout(async() => {
      var res = await getImage()
      console.log(res)
      if(res.code==200){
        this.setData({imgSrc:res.imgurl})
      }
      z()
    }, 300);
  },

  downimg(){
    var that = this
    wx.showActionSheet({
      itemList: ['保存到手机', '将图片设为默认背景'],
      success (res) {
        console.log(res.tapIndex)
        if(res.tapIndex==0){
          if(that.data.imgSrc=='../../images/bg.gif'){
            wx.getImageInfo({
              src: '../../images/bg.gif',
              success(res) { 
                console.log(res)
                wx.saveImageToPhotosAlbum({
                    filePath:res.path,
                    success(res) { 
                      console.log(res)
                    },fail:err=>{
                      console.log(err)
                    }
                })
                }
            })
          }else{
            wx.downloadFile({
              url: that.data.imgSrc,
              success: res =>{
                console.log(res)
                wx.saveImageToPhotosAlbum({
                  filePath:res.tempFilePath,
                  success(res) { 
                    console.log(res)
                  },fail:err=>{
                    console.log(err)
                  }
              })
              }
            })
          }
        }else if(res.tapIndex==1){
          wx.setStorageSync('imgSrc', that.data.imgSrc)
          wx.showToast({
            title: '成功',
          })
        }
        else if(res.tapIndex==2){
          app.globalData.imgType = 'dongman'
          wx.setStorageSync('imgType', 'dongman')
        }
        else if(res.tapIndex==3){
          app.globalData.imgType = 'fengjing'
          wx.setStorageSync('imgType', 'fengjing')
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
    
    
    
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

  offPrompt(){
    this.setData({
      offPrompt:false
    })
    wx.setStorageSync('offPrompt', 'false')
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