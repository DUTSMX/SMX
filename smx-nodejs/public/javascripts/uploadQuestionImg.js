
var editor;
function iframe_load(){//
    console.log("iframe_load")
    // editor = new Squire(iframe,{
    //     blockTag:"div",
    //     blockAttributes:{style:'font-size:14px;font-weight:normal'}
    // })
    editor = iframe.contentWindow.editor;
    editor.setConfig({
        blockTag:"div",
        blockAttributes:{style:'font-size:14px;font-weight:normal'}
    })
}
var cos = new CosCloud("10068625","/")
var successCallBack = function (result) {
    hideLoader()
    console.log("success："+JSON.parse(result).data.access_url)
    editor.insertImage(JSON.parse(result).data.access_url,{style:"max-height:100px;max-width:80vw;text-align:center"});
}
var errorCallBack = function (result) {hideLoader()
    console.log("error")
    console.log("result:"+JSON.stringify(result))
}
$("#file").change(function addImage() {
    showLoader()
    console.log("add image")
    var fileList = this.files;
    if(fileList.length>0){
        var selectedFile = fileList[0];
        var name = selectedFile.name;
        cos.uploadFile(successCallBack,errorCallBack,"smxbucket","/question/question"+Math.round(new Date().getTime()/1000),selectedFile,0)
    }else{
        hideLoader()
    }
    $("#file").val('');
})
//显示加载器
function showLoader() {
    //显示加载器.for jQuery Mobile 1.2.0
    $.mobile.loading('show', {
        text: '上传图片...', //加载器中显示的文字
        text: '上传图片...', //加载器中显示的文字
        textVisible: true, //是否显示文字
        theme: 'a',        //加载器主题样式a-e
        textonly: false,   //是否只显示文字
        html: ""           //要显示的html内容，如图片等
    });
}

//隐藏加载器.for jQuery Mobile 1.2.0
function hideLoader() {
    //隐藏加载器
    $.mobile.loading('hide');
}