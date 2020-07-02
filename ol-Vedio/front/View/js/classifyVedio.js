/**
 * Created by 11825 on 2020/4/16.
 */

$("body").on("mouseenter",".vedio_div1",function(){
    $(this).find(".vedio_div2").css("top","0");
})

$("body").on("mouseleave",".vedio_div1",function(){
    $(this).find(".vedio_div2").css("top","120px");
})

//前11视频显示
var clid = parent.document.getElementById("front_iframe").getAttribute("clid");
$.ajax({
    url:"index.php?ctrl=mainCtrl&do=getResourcesS",
    type:"post",
    data:{"clid":clid},
    dataType:"json",
    success:function(res){
        //console.log(res);
        showLunBo(res.data);
        layui.use('carousel', function(){
            var carousel = layui.carousel;
            //建造实例
            carousel.render({
                elem: '#lunBoDiv'
                ,width: '86%' //设置容器宽度
                ,height:'400px'
                ,arrow: 'hover' //始终显示箭头
                //,anim: 'updown' //切换动画方式
            });
        });
    },
    error:function(){
        console.log("ajax连接失败");
    }
})
//轮播显示
function showLunBo(data){
    var lunBoStr = `<div carousel-item>`;
    data.forEach(function(val){
        lunBoStr += `<img src="${val.covers}" alt="">`;
    })
    lunBoStr += `</div>`
    $("#lunBoDiv").html(lunBoStr);
}



$.ajax({
    url:"index.php?ctrl=ClassifyCtrl&do=getResourcesNew",
    type:"post",
    data:{"clid":clid},
    dataType:"json",
    success:function(res){
       // console.log(res);
        $("#new_vedioDiv").append(showVedio(res.data));
    },
    error:function(){
        console.log("ajax连接失败");
    }
})



//视频渲染
function showVedio(data){
    var vedioStr = ``;
    data.forEach(function(val,index){
        vedioStr += `<div class="vedio_div1 inline-block" path ="${val.paths}" vid="${val.vid}" reid="${val.reid}">
                        <div>
                            <img src="${val.covers}" alt="">
                        </div>
                        <div class="vedio_div3">
                            <p>${val.reName}</p>
                        </div>
                        <div class="vedio_div2">
                            <p><i class="layui-icon vedio_i" id="">&#xe652;</i></p>
                        </div>
                    </div>`
    })
    return vedioStr;
}

//获取分类视频分类
$.ajax({
    url:"index.php?ctrl=mainCtrl&do=getClassify",
    type:"get",
    dataType:"json",
    success:function(res){
        //console.log(res);
        $("body").append(showVedio2(res.data));
    },
    error:function(){
        console.log("ajax连接失败");
    }
})

//当前分类二级菜单渲染
function showVedio2(data){
    var vedioStr = ``;
    data.forEach(function(val,index){
        if(val.pid == clid){
            vedioStr += `    <div class="inline-block vedio_div" id="${val.clid}">
                                  <div><p class="vedio_p inline-block">${val.clName}</p></div>
                            </div>`
            $.ajax({
                url:"index.php?ctrl=HomeCtrl&do=getResources",
                type:"post",
                data:{"clid":val.clid},
                dataType:"json",
                success:function(res){
                    //console.log(res);
                    var vedioStr = showVedio(res.data)
                    var id = val.clid;
                    $(`#${id}`).append(vedioStr);
                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
        }
    })
    return vedioStr;
}

//播放视频点击事件
$("body").on("click",".vedio_div1",function(){
    var _this = $(this);
    if(!isLogin){
        alert("请先登录");
        return;
    }
    //vip查询
    var vvid = $(this).attr("vid");
    $.ajax({
        url:"index.php?ctrl=VedioCtrl&do=selVip",
        type:"post",
        data:{"vid":vvid},
        dataType:"json",
        success:function(res){
            //console.log(res);
            var vName = res.data[0].vName;
            if(vid < vvid){
                alert(`该视频需要${vName},请先升级VIP等级`);
                var url = `index.php?ctrl=PersonalCtrl&do=showPersonal`;
                parent.document.getElementById("front_iframe").setAttribute("src",url);
                parent.document.getElementById("myDiv").children[1].children[2].style.color = "rgb(133,153,255)";
                parent.document.getElementById("myDiv").children[1].children[1].style.color = "rgb(23,200,186)";
                parent.document.getElementById("myDiv").children[1].children[0].style.color = "rgb(23,200,186)";
                return;
            }else{
                var url = `index.php?ctrl=VedioCtrl&do=showVedio`;
                parent.document.getElementById("front_iframe").setAttribute("src",url);
                parent.document.getElementById("front_iframe").setAttribute("path",_this.attr("path"));
                $.cookie("path", _this.attr("path"), 0,"/");
                parent.document.getElementById("front_iframe").setAttribute("reid",_this.attr("reid"));
                $.cookie("reid", _this.attr("reid"), 0,"/");
                parent.document.getElementById("front_iframe").setAttribute("cid",cid);
                $.cookie("cid", cid, 0,"/");
                parent.document.getElementById("myDiv").children[1].children[1].style.color = "rgb(133,153,255)";
                parent.document.getElementById("myDiv").children[1].children[0].style.color = "rgb(23,200,186)";
                parent.document.getElementById("myDiv").children[1].children[2].style.color = "rgb(23,200,186)";
            }
        },
        error:function(){
            console.log("ajax连接失败");
        }

    })
})