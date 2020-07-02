/**
 * Created by 11825 on 2020/4/19.
 */
var selName = parent.document.getElementById("front_iframe").getAttribute("selName");
var nowPage = 1;
$.ajax({
    url:"index.php?ctrl=MyResourcesCtrl&do=getMyResources&page="+nowPage,
    type:"post",
    data:{"selName":selName},
    dataType:"json",
    success:function(res){
        //console.log(res);
        $("#sel_vedioDiv1").html(showVedio(res.data.res));
        var count = res.data.totalPage;
        myResourcesPage(count)
    },
    error:function(){
        console.log("ajax连接失败");
    }
})

$("body").on("mouseenter",".vedio_div1",function(){
    $(this).find(".vedio_div2").css("top","0");
})

$("body").on("mouseleave",".vedio_div1",function(){
    $(this).find(".vedio_div2").css("top","120px");
})

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


function myResourcesPage(count){
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: count //数据总数，从服务端得到
            ,limit:20
            ,jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                var page = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                $.ajax({
                    url:"index.php?ctrl=MyResourcesCtrl&do=getMyResources&page="+page,
                    type:"post",
                    data:{"selName":selName},
                    dataType:"JSON",
                    success:function(res){
                        //console.log(res);
                        $("#sel_vedioDiv1").html(showVedio(res.data.res));
                    },
                    error:function(){
                        console.log("ajax连接失败");
                    }
                })

            }
        });
    });
}