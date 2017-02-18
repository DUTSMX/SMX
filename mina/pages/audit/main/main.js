//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  account:function(){
    console.log("account")
    wx.navigateTo({
      url: '../account/account'
    })
  }
})
