/**
 * Created by 11825 on 2020/4/14.
 */
//检验登录
if(isLogin){
    $("#olLogin_div").css("display","inline-block");
    $("#login_div").css("display","none");
}else{
    $("#login_div").css("display","inline-block");
    $("#olLogin_div").css("display","none");
}

$("#codeImg").click(function(){
    $(this).attr("src",`./tools/Code.php?v=${Math.random()}`);
})
$("#codeImg1").click(function(){
    $(this).attr("src",`./tools/Code.php?v=${Math.random()}`);
})

var flag1 = false;
var flag2 = false;
var flag3 = false;


//注册用户失焦
$("#userName").blur(function(){
    var r = /^[a-zA-Z0-9_-]{4,16}$/;
    if(!r.test($(this).val())){
        $('#noUserName').css('display','block');
        flag1 = false;
    }else{
        $('#noUserName').css('display','none');
        flag1 = true;
    }
})

//注册密码失焦
$("#pwd").blur(function(){
    var r = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if(!r.test($(this).val())){
        $('#noPassWord').css('display','block');
        flag2 = false;
    }else{
        $('#noPassWord').css('display','none');
        flag2 = true;
    }
})
//确认密码失焦
$("#pwd2").blur(function(){
    if($("#pwd2").val() != $("#pwd").val()){
        $('#noPassWord2').css('display','block');
        flag3 = false;
    }else{
        $('#noPassWord2').css('display','none');
        flag3 = true;
    }
})
//注册点击事件
$("#reg_but").click(function(){
    if(flag1&&flag2&&flag3){
        var userName = $("#userName").val();
        var pwd = $("#pwd2").val();
        var userCode = $("#userCode").val();
        var userObj = {
            "userName":userName,
            "pwd":pwd,
            "userCode":userCode
        }
        $.ajax({
            url:"index.php?ctrl=mainCtrl&do=doReg",
            type:"post",
            data:userObj,
            dataType:"text",
            success:function(res){
                if(res == 2){
                    alert("验证码输入错误");
                    return;
                }else if(res == 3){
                    alert("用户名已存在");
                    return;
                }else{
                    alert("注册成功");
                }
            },
            error:function(){
                console.log("ajax连接失败");
            }
        })
    }
})

//登录点击事件
$("#login_but").click(function(){
    var userName1 = $("#userName1").val().trim();
    var pwd1 = $("#pwd1").val().trim();
    var userCode1 = $("#userCode1").val().trim();
    if(userName1 == ''||pwd1 == ''||userCode1 == ''){
        alert("登录信息填写不正确");
        return;
    }
    var userObj = {
        "userName":userName1,
        "pwd":pwd1,
        "userCode":userCode1
    }
    $.ajax({
        url:"index.php?ctrl=mainCtrl&do=doLogin",
        type:"post",
        data:userObj,
        dataType:"text",
        success:function(res){
            //console.log(res);
            if(res == 1){
                alert("登录成功");
                $("#regLogin_div").hide(300);
                window.location.reload();
            }else if(res == 0){
                alert("用户名或密码输入错误");
            }else if(res == 3){
                alert("该用户被锁定,无法登录");
            }else{
                alert("验证码输入错误");
            }
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})

//点击注销
$("#outOL").click(function(){
    layui.use('layer', function(){
        layer.confirm('确认注销吗？', {icon: 3, title:'确认注销',shade:0}, function(index){
            //do something
            $.ajax({
                url:"index.php?ctrl=mainCtrl&do=outLogin",
                type:"get",
                dataType:"text",
                success:function(res){
                    if(res == 1){
                        alert("注销成功");
                        $("#login_div").css("display","inline-block");
                        $("#olLogin_div").css("display","none");
                        var url = `index.php?ctrl=HomeCtrl&do=showHome`;
                        $("#front_iframe").attr("src",url);
                        window.location.reload();
                    }
                },
                error:function(){
                    console.log("ajax连接失败")
                }
            })
            layer.close(index);
        });
    });
})


//点击关闭窗口
$("#reg_close").click(function(){
    $("#regLogin_div").hide(300);
})

$("#login_close").click(function(){
    $("#regLogin_div").hide(300);
})

$("#reg_span").click(function(){
    $("#reg1_div").show();
    $("#login1_div").hide();
    $("#regLogin_div").show(300);
})

$("#login_span").click(function(){
    $("#reg1_div").hide();
    $("#login1_div").show();
    $("#regLogin_div").show(300);
})

$("#loginS_but").click(function(){
    $("#reg1_div").hide();
    $("#login1_div").show();
})

$("#regS_but").click(function(){
    $("#reg1_div").show();
    $("#login1_div").hide();
})

//分类显示
$.ajax({
    url:"index.php?ctrl=mainCtrl&do=getClassify",
    type:"get",
    dataType:"json",
    success:function(res){
        //console.log(res);
        showClassify(res.data)
    },
    error:function(){
        console.log("ajax连接失败");
    }
})

//分类显示
function showClassify(data){
    var classifyStr = ``;
    data.forEach(function(val,index){
        if(val.gid == 2){
            classifyStr += `<div class="class_div1"><p id="${val.clid}" class="classify_p classify_cl">${val.clName}<span class="classify_span"></span></p><ul>`
            data.forEach(function(val1,index){
                if(val.clid == val1.pid){
                    classifyStr += `<li id="${val1.clid}" class="class_li classify_cl">${val1.clName}</li>`
                }
            })
            classifyStr += '</ul></div>';
        }
    })
    $("#classifyDiv").html(classifyStr);
    $(".class_li").parents(".class_div1").find("span").html(">")
}

//二级菜单移入移出事件
$("#classifyDiv").on('mouseenter','.class_div1',function(){
    $(this).find("ul").css("display","block");
    //console.log($(this).find(".classify_span").html());
    if($(this).find(".classify_span").html() != ''){
        $(this).find(".classify_span").html("∨");
    }
})

$("#classifyDiv").on('mouseleave','.class_div1',function(){
    $(this).find("ul").css("display","none");
    if($(this).find(".classify_span").html() != ''){
        $(this).find(".classify_span").html(">");
    }
})



//导航栏点击事件
$(".nav_li")[0].style.color = "rgb(133,153,255)";
$(".nav_li").click(function(){
    var viewName = $(this).prop("id");
    if(viewName == "Personal" && isLogin == false){
        alert("请先登录");
        return;
    }
    if(viewName == "Vedio"){
        alert("请选择要播放的视频");
        return;
    }
    $(".nav_li").css("color","rgb(23,200,186)");
    $(this).css("color","rgb(133,153,255)");
    var url = `index.php?ctrl=${viewName}Ctrl&do=show${viewName}`;
    $("#front_iframe").attr("src",url);
})

window.onload=function(){
    $(".nav_li").each(function(index,val){
        //console.log($("#front_iframe").attr("type"));
        if($(val).prop("id") == $("#front_iframe").attr("type")){

            $(".nav_li").css("color","rgb(23,200,186)");
            $(val).css("color","rgb(133,153,255)");
            return;
        }
    })
}



//分类导航点击事件
$("#classifyDiv").on("click",".classify_cl",function(){
    $(".nav_li").css("color","rgb(23,200,186)");
    $(".nav_li")[0].style.color = "rgb(133,153,255)";
    var clid = $(this).prop("id");
    var url = `index.php?ctrl=ClassifyCtrl&do=showClassify`;
    $("#front_iframe").attr("clid",clid);
    $.cookie("clid", clid, 0,"/");
    $("#front_iframe").attr("src",url);
})

//点击搜索事件
$("#nav_but").click(function(){
    var url = `index.php?ctrl=MyResourcesCtrl&do=showMyResources`;
    $("#front_iframe").attr("src",url);
    var selName = $("#nav_inp").val();
    if(selName.trim() == ''){
        alert("请输入关键词");
        return
    }
    parent.document.getElementById("front_iframe").setAttribute("selName",selName);
    $.cookie("selName", selName, 0,"/");
})