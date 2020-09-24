import 'umtrack-wx';
App({
  umengConfig: {
    appKey: '5f211059d30932215472f997', //由友盟分配的APP_KEY
    useOpenid: false, // 是否使用openid进行统计，此项为false时将使用友盟+随机ID进行用户统计。使用openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用OpenID。
    autoGetOpenid: false, // 是否需要通过友盟后台获取openid，如若需要，请到友盟后台设置appId及secret
    debug: false, //是否打开调试模式
    uploadUserInfo: true // 自动上传用户信息，设为false取消上传，默认为false
  },
  onLaunch: function () {
    this.getUserinfo()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {  
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
  },

  getUserinfo(){
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        if (res.userInfo){
          wx.setStorageSync('userinfo', res.userInfo)
          
        }
      }
    })
  },
  globalData:{
    imgType: wx.getStorageSync('imgType') || 'fengjing'
  }
})
