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
    offPrompt:false,
    isLogin:false,
    userInfo:null,
    imageArr:['',2,3,4],
    focus:false
    
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

  bindblur(){
    this.setData({
      focus:false
    })
  },
  bindfocus(){
    this.setData({
      focus:true
    })
  },

  onBox(e){
    var index = e.currentTarget.dataset.index
    if(index==0){
      wx.showToast({
        title: '正在拼命开发中',
        icon:'none'
      })
    }else if(index==1){
      wx.navigateTo({
        url: '/pages/updateLog/updateLog',
      })
    }else if(index==2){
      wx.setClipboardData({
        data: 'TUDUTU',
        success (res) {
          wx.getClipboardData({
            success (res) {
              wx.showToast({
                title: '已复制微信号',
              })
            }
          })
        }
      })
    }else if(index==3){
      wx.navigateTo({
        url: '/pages/suggest/suggest',
      })
    }
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



  getUserinfo(e){
    console.log(e)
    if(e.detail.errMsg=="getUserInfo:ok"){
      this.onShow()
      this.setData({
        isLogin: true
      });
    }
  },


  downimg(){
    var that = this
    wx.showActionSheet({
      itemList: ['保存到手机', '将图片设为默认背景','恢复默认壁纸'],
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
        }else if(res.tapIndex==2){
          that.setData({
            imgSrc:'../../images/bg.gif'
          })
          wx.setStorageSync('imgSrc', that.data.imgSrc)

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
    var _  = this
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: res => {
              console.log(res)
              _.setData({
                isLogin: true,
                userInfo:res.userInfo
              });
            }
          })
          
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})