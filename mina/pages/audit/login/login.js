var app = getApp()
Page({
  data: {
      loading:false,
      phoneNumber:"",
      password:"",
      hide_change:"hide",
      hint:""
  },
  bindPhoneNumberInput:function(e){
      this.setData({
          phoneNumber:e.detail.value
      })
  },
  bindPasswordInput:function(e){
      this.setData({
          password:e.detail.value
      })
  },
  login:function(){
    this.setData({
        loading:!this.data.loading
    })
    if(this.data.phoneNumber.length == 0){
        console.log("手机号不能为空");
        this.setData({
            hide_change:"hint-view",
            hint:"手机号不能为空",
            loading:!this.data.loading
        })
    }else if(this.data.password.length == 0){
        console.log("密码不能为空");
        this.setData({
            hide_change:"hint-view",
            hint:"密码不能为空",
            loading:!this.data.loading
        })
    }else{
        var data = {phoneNumber:this.data.phoneNumber,password:this.data.password}
        console.log("data:"+JSON.stringify(data));
        wx.request({
            url: 'http://shangmingxiao.com.cn/users/login',
            data: {phoneNumber:this.data.phoneNumber,password:this.data.password},
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                console.log("res:"+res)
            },
            fail: function() {
                console.log("res:"+fail)
            },
            complete: function() {
                console.log("res:"+complete)
            }
            })
        }
  }
})
