var app = getApp()
Page({
  data: {
      loading:false
  },
  login:function(){
    this.setData({
        loading:!this.data.loading
    })
  }
})
