Page({
    data:{
        array:['姚晗','齐书强','李镇'],
        date:'2017-02-18',
        index:"0"
    },
    bindDateChange:function(e){
        this.setData({
            date:e.detail.value
        })
    },
    bindHandlerChange:function(e){
        this.setData({
            index:e.detail.value
        })
    }
})