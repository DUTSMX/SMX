/*获取验证码*/
function check() {
    var phoneNumber = $("#phoneNumber").val();
    if(!(/^1[34578]\d{9}$/.test(phoneNumber))){
        $("#hint").text("手机号格式不正确");
    }else{
        var data = {phoneNumber:phoneNumber};
        $.post("/users/getCheckCode",data,function (data) {
            if(data.status){
                $("#hint").text(data.desc);
            }else{
                console.log(data.desc)
            }
        },"json");

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
}