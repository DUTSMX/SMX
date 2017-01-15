var xmlhttp;
if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
}else{// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
/*轮播图*/
$(document).ready(function () {
    $(".ad_Images").slick({
        autoplay: true,
        autoplaySpeed: "4000",
        dots: true
    });
});
/*返回上一级*/
function goBack(){
    window.history.back()
}
/*修改密码*/
function changePassword() {
    var oldPassword = document.getElementById("oldPassword").value;
    var password = document.getElementById("password").value;
    var passwordAgain = document.getElementById("passwordAgain").value;
    if(oldPassword.length == 0){
        document.getElementById("hint").innerHTML = "旧密码不能为空";
    }if(password.length == 0){
        document.getElementById("hint").innerHTML = "新密码不能为空";
    }else if(password !=passwordAgain){//发送登录请求;
        document.getElementById("hint").innerHTML = "新密码不一致";
    }else{
        xmlhttp.open("GET", "/users/changePassword?oldPassword=" + oldPassword + "&newPassword=" + password, true);
        xmlhttp.send();
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var str = xmlhttp.responseText;//得到服务器响应
            document.getElementById("hint").innerHTML=str;
            if(str == "修改成功"){
                document.getElementById("hint").innerHTML="修改成功，请重新登录";
                setTimeout(function () {
                    window.location.href="/users/loginPage";
                },1000)
            }
        }
    }
}

function createCourse () {
    console.log("请求发送成功");
    var courseName = document.getElementById("courseName").value;
    var courseDate = document.getElementById("courseDate").value;
    var beginTime = document.getElementById("beginTime").value;
    var finshTime = document.getElementById("finshTime").value;
    var courseTime = document.getElementById("courseTime").value;
    var objectOriented = document.getElementById("objectOriented").value;
    var courseContent = document.getElementById("courseContent").value;
    var url = "/course/createCourse?courseName=" + courseName + "&courseDate=" + courseDate + "&beginTime=" + beginTime + "" +
        "&finshTime=" + finshTime + "&courseTime=" + courseTime + "&objectOriented=" + objectOriented + "&courseContent=" + courseContent;
    xmlhttp.open("GET",url,true)
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            str = xmlhttp.responseText;//得到服务器响应
            document.getElementById("hint").innerHTML = str;//显示提示信息
            if (str == "创建成功") {
                window.location.href = "/course/course";//跳转到主页
            }
        }
    }
}
/*忘记密码*/
function forgetPassword() {
    var phoneNumber = document.getElementById("phoneNumber").value;
    var checkCode = document.getElementById("checkCode").value;
    var password = document.getElementById("password").value;
    var passwordAgain = document.getElementById("passwordAgain").value;
    if(phoneNumber.length == 0){
        document.getElementById("hint").innerHTML = "手机号不能为空";
    }else if(!(/^1[34578]\d{9}$/.test(phoneNumber))){
        document.getElementById("hint").innerHTML = "手机号格式不正确";
    }else if(checkCode.length == 0){
        document.getElementById("hint").innerHTML = "验证码不能为空";
    }else if(password.length == 0){
        document.getElementById("hint").innerHTML = "密码不能为空";
    }else if(password !=passwordAgain){//发送登录请求;
        document.getElementById("hint").innerHTML = "密码不一致";
    }else{
        xmlhttp.open("GET", "/users/forgetPassword?phoneNumber=" + phoneNumber +"&checkCode="+checkCode+"&password=" + password, true);
        xmlhttp.send();
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var str = xmlhttp.responseText;//得到服务器响应
            document.getElementById("hint").innerHTML=str;
            if(str == "修改成功"){
                window.location.href="/users/loginPage";
            }
        }
    }
}

/*获取验证码*/
function check() {
    var phoneNumber = document.getElementById("phoneNumber").value;
    console.log("phoneNumber:"+phoneNumber)
    if(!(/^1[34578]\d{9}$/.test(phoneNumber))){
        document.getElementById("hint").innerHTML = "手机号格式不正确";
    }else{
        xmlhttp.open('GET','/users/getCheckCode?phoneNumber=' + phoneNumber)
        xmlhttp.send();
        $("#checkCodeBtn").css({'background':"#CCCCCC"})
        $("#checkCodeBtn").text("59秒后重试")
        var time=58;
        var interval = window.setInterval(function () {
            $("#checkCodeBtn").attr({"onclick":"#"})
            $("#checkCodeBtn").text(time--+"秒后重试")
            if(time == -1){
                $("#checkCodeBtn").attr({"onclick":"check()"})
                $("#checkCodeBtn").css({'background':"#3B7454"})
                $("#checkCodeBtn").text("发送验证码")
                window.clearInterval(interval);
            }
        },1000,0);
    }
    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            document.getElementById("hint").innerHTML=xmlhttp.responseText;
        }
    }


}
/*登录*/
function login() {
    console.log("login")
    var phoneNumber = document.getElementById("phoneNumber").value;
    var password = document.getElementById("password").value;
    if(phoneNumber.length == 0){
        document.getElementById("hint").innerHTML = "手机号不能为空";
    }else if(!(/^1[34578]\d{9}$/.test(phoneNumber))){
        document.getElementById("hint").innerHTML = "手机号格式不正确";
    }else if(password.length == 0){
        document.getElementById("hint").innerHTML = "密码不能为空";
    }else{//发送登录请求
        xmlhttp.open("GET", "/users/login?phoneNumber=" + phoneNumber + "&password=" + password, true);
        xmlhttp.send();
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            str = xmlhttp.responseText;//得到服务器响应
            document.getElementById("hint").innerHTML = str;//显示提示信息
            if(str == "登录成功"){
                window.location.href = "/course/course";//跳转到主页
            }
        }
    }
}
/*切换问答状态*/
function statusSwitch() {
    var status = '<%=status%>'
    console.log("status:"+status);
    if(status == 1){
        status = 0;
        document.getElementById("question_status").innerHTML = "状态：关";
        xmlhttp.open('GET',"/users/questionStatus?userId=<%=userId%>&status=0");

    }else{
        status = 1;
        document.getElementById("question_status").innerHTML = "状态：开";
        xmlhttp.open('GET',"/users/questionStatus?userId=<%=userId%>&status=1");
    }
    xmlhttp.send();
}
/*注册成功*/
function register() {
    var phoneNumber = document.getElementById("phoneNumber").value;
    var checkCode = document.getElementById("checkCode").value;
    var password = document.getElementById("password").value;
    var passwordAgain = document.getElementById("passwordAgain").value;
    if(phoneNumber.length == 0){
        document.getElementById("hint").innerHTML = "手机号不能为空";
    }else if(!(/^1[34578]\d{9}$/.test(phoneNumber))){
        document.getElementById("hint").innerHTML = "手机号格式不正确";
    }else if(checkCode.length == 0){
        document.getElementById("hint").innerHTML = "验证码不能为空";
    }else if(password.length == 0){
        document.getElementById("hint").innerHTML = "密码不能为空";
    }else if(password !=passwordAgain){//发送登录请求;
        document.getElementById("hint").innerHTML = "密码不一致";
    }else{
        xmlhttp.open("GET", "/users/register?phoneNumber=" + phoneNumber + "&checkCode="+checkCode+"&password=" + password, true);
        xmlhttp.send();
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var str = xmlhttp.responseText;//得到服务器响应
            document.getElementById("hint").innerHTML=str;
            if(str == "注册成功"){
                window.location.href="/course/course";
            }
        }
    }
}

function registerTeacher() {
    console.log("请求发送成功");
    var goodCourse = document.getElementById("goodCourse").value;
    var selfIntro = document.getElementById("selfIntro").value;
    var url = "registerTeacher?goodCourse=" +goodCourse+ "&selfIntro="+ selfIntro;
    xmlhttp.open("GET",url,true)
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            str = xmlhttp.responseText;//得到服务器响应
            document.getElementById("hint").innerHTML = str;//显示提示信息
            if (str == "申请成功") {
                window.location.href = "/course/course";//跳转到主页
            }
        }
    }
}

/*
提问
 */
function askQuestion() {
    console.log("请求发送成功");
    var questionTitle = document.getElementById("questionTitle").value;
    var questionContent = document.getElementById("questionContent").value;
    var url = "askQuestion?questionTitle=" +questionTitle+ "&questionContent="+ questionContent;
    xmlhttp.open("GET",url,true)
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            str = xmlhttp.responseText;//得到服务器响应
            document.getElementById("hint").innerHTML = str;//显示提示信息
            if (str == "提问成功") {
                window.location.href = "/course/course";//跳转到主页
            }
        }
    }
}
function editInfo() {
    console.log("请求发送成功");
    //获取各项值
    var name=document.getElementById("name").value;
    var sex=document.getElementById("sex").value;
    var age=document.getElementById("age").value;
    var school=document.getElementById("school").value;
    var grade=document.getElementById("grade").value;
    var address=document.getElementById("address").value;
    var url="editInfo?name="+name+"&sex="+sex+"&age="+age+"&school="+school+"&grade="+grade+"&address="+address;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function () {
        console.log("back"+xmlhttp.readyState +"   "+xmlhttp.status)
        if(xmlhttp.readyState==4&&xmlhttp.status==200){
            var str=xmlhttp.responseText;
            document.getElementById("hint").innerHTML=str;
            if(str=="修改成功"){
                window.history.back();//修改成功之后回到上一个页面
            }
        }
    }
}
function sendRetroaction() {
    console.log("请求发送成功");
    //获取各项值
    var content=document.getElementById("retroContent").value;
    var url="sendRetroaction?content="+content;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function () {
        console.log("back"+xmlhttp.readyState +"   "+xmlhttp.status)
        if(xmlhttp.readyState==4&&xmlhttp.status==200){
            var str=xmlhttp.responseText;
            document.getElementById("hint").innerHTML=str;
            if(str=="修改成功"){
                window.history.back();//修改成功之后回到上一个页面
            }
        }
    }

}