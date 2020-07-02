window.onload = function(){
    $.ajax({
        url:"./index.php?ctrl=MainCtrl&do=showMainMenu",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res.data);
            var data = res.data;
            showMenu(data);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
}
//显示菜单栏
function showMenu(data){
    var menuStr = ``;
    data.forEach(function(val,index){
        if(val.pid==0){
            menuStr += `<div class="munu-div"><p class="menu-p menu-cl" url="${val.url}" mid="${val.mid}">${val.mName}<span class="menu-span"><span></p><ul class="menu-ul">`;
            data.forEach(function(val1,index1){
                if(val1.pid == val.mid ){
                 //   也就是li这里挂点击事件 。切换Iframe的src 变成./index.php ?ctrl = ?? & do=???
                    menuStr += `<li url="${val1.url}" class="menu-li menu-cl" mid="${val.mid}">${val1.mName}</li>`
                }
            })
            menuStr+=`</ul></div>`;
        }
    })

    $('#leftBox').html(menuStr);
    $(".menu-li").each(function(index,val){
        $(val).parents(".munu-div").find(".menu-span").html("<");
    })
}






//二级菜单移入移出事件
$("#leftBox").on('mouseenter','.munu-div',function(){
    $(this).find("ul").css("display","block");
    if($(this).find(".menu-span").html() != '<span></span>'){
        $(this).find(".menu-span").html("∨");
    }

})

$("#leftBox").on('mouseleave','.munu-div',function(){
    $(this).find("ul").css("display","none");
    if($(this).find(".menu-span").html() != '<span></span>'){
        $(this).find(".menu-span").html("<");
    }
})

//点击事件

$("#leftBox").on('click','.menu-cl',function(){
    var mid = Number($(this).attr("mid"));
    var url = $(this).attr("url");
    var dataObj = {
        rid:rid,
        mid:mid
    }
    //console.log(dataObj);
    $.ajax({
        url:"./index.php?ctrl=MainCtrl&do=isPowers",
        type:"post",
        data:dataObj,
        dataType:"text",
        success:function(res){
           // console.log(res);
            if(res==1){
                if( url != "null"){
                    $("#myIframe").prop("src",url);
                }
            }else{
                alert("对不起您没有这个权限");
            }
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })


})

//点击注销事件
$("#out").click(function(){
    layui.use('layer', function(){
        layer.confirm('确认注销吗？', {icon: 3, title:'确认注销',shade:0}, function(index){
            //do something
            $.ajax({
                url:"index.php?ctrl=LoginCtrl&do=outLogin",
                type:"get",
                dataType:"text",
                success:function(res){
                    if(res == 1){
                        location.href = "index.php?ctrl=LoginCtrl&do=showLogin";
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


