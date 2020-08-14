Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'foodList':{
      type:Array
    }
  },  

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    intoProductDetail(e){
      var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/foodDetails/foodDetails?id=' + id,
      })
    }
  }
})
