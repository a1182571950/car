/**
 * Created by 11825 on 2020/3/31.
 */

$("#codeImg").click(function(){
    $(this).attr("src",`./tools/Code.php?v=${Math.random()}`);
})
$(function(){
    $("#login-but").click(function(){
        var adminID = $("#adminID").val(),
            adminPW = $("#adminPW").val(),
            adminCode = $("#adminCode").val();
        if(adminID.length>7){
            alert("用户名长度不正确，应小于7位数");
            return false;
        }
        if(adminPW.length>8){
            alert("密码长度不正确，应小于8位数");
            return false;
        }
        var dataJson = {
            "adminID":adminID,
            "adminPW":adminPW,
            "adminCode":adminCode
        };
        //console.log(dataJson);
        $.ajax({
            //提交路径
            url:"index.php?ctrl=LoginCtrl&do=doLogin",
            //type提交方式
            type:"post",
            //提交内容
            data:dataJson,
            //dataType预期服务器返回的数据类型
            dataType:"text",
            success:function(res){
                //console.log(res);
              if(res==1){
                  alert("登录成功");
                  location.href = "./index.php?ctrl=MainCtrl&do=showMain";
              }else if(res==2){
                  alert("账号或密码错误");
              }else if(res==3){
                  alert("该用户被锁定无法登录");
              }else{
                  alert("验证码输入错误");
              }
            },
            error:function(){
                //console.log(res);
            }
        })
    })
})
