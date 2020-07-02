/**
 * Created by 11825 on 2020/4/9.
 */
var nowPage = 1;
var vipStr = '';

window.onload = function(){
    $.ajax({ //获取分类
        url:"index.php?ctrl=ClassifyCtrl&do=getClassify",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res);
            classifyShow(res.data)
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
    $.ajax({
        url:"index.php?ctrl=VIPCtrl&do=showVIPG",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res.data);
            vipStr = VIPShow(res.data);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
    var dataObj = {
        "clid":'',
        "searchVal":''
    };
    $.ajax({
        url:"index.php?ctrl=ResourcesCtrl&do=getResources&page="+nowPage,
        type:"post",
        dataType:"json",
        data:dataObj,
        success:function(res){

            //console.log(res.data);
            showResources(res.data.res);
            var count = res.data.totalPage;
           // resourcesPage(count,page,5,dataObj)
            showPage(count,dataObj);
        },
        error:function(a){
            console.log("ajax连接失败");
            console.log(a)
        }
    })


}


//显示资源列表
function showResources(data){
    var resourcesStr = `<thead><tr><td>ID</td><td>资源名</td><td>封面</td>
                        <td>类型</td><td>播放量</td><td>上传时间</td><td>操作</td></tr></thead>`;
    data.forEach(function(val,index){
        //console.log(val);
        resourcesStr += `<tr><td>${val.reid}</td><td class="reName">${val.reName}</td><td><img src="${val.covers}"/></td><td class="vName">${val.vName}</td><td>${val.playbackNum}</td><td>${val.createTime}</td>
                            <td><button class="layui-btn layui-btn-sm layui-btn-normal upRe_but" reid="${val.reid}" vid="${val.vid}">编辑</button>
                                <button class="layui-btn layui-btn-sm layui-btn-danger delRe_but" reid="${val.reid}">删除</button>
                                </td></tr>`;
    })
    $("#reDiv").html(resourcesStr);
}


//分类渲染
function classifyShow(data){
    var classifyStr = ``;
    data.forEach(function(val,index){
        if(val.gid == 2){
            classifyStr += `<option value="${val.clid}">${val.clName}</option>`;
        }
    })
    $("#classify_sel").append(classifyStr);
    return;
}

//编辑vip渲染
function VIPShow(data){
    var VIPStr = ``;
    data.forEach(function(val,index){
        VIPStr += `<option value="${val.vid}" class="vip_op">${val.vName}</option>`;
    })

    return VIPStr;
}
//分类筛选
$("#classify_sel").change(function(){
    var nowPage = 1;
    var clid = $("#classify_sel").val();
    var searchVal = $("#search_inp").val("");
    //console.log(vid);
    var dataObj = {"clid":clid};
    $.ajax({
        url:"index.php?ctrl=ResourcesCtrl&do=getResources&page="+nowPage,
        type:"post",
        data:dataObj,
        dataType:"json",
        success:function(res){
            //console.log(clid);
            //console.log(res);
            showResources(res.data.res);
            var count = res.data.totalPage;
            page = res.data.nowPage;
            //resourcesPage(count,page,5,dataObj);
            showPage(count,dataObj);

        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})

//搜索点击事件
$("#search_but").click(function(){
    var clid = $("#classify_sel").val("0");
    var searchVal = $("#search_inp").val();
    if(searchVal.trim() == ''){
        var nowPage = 1;
        var page = 1
        var dataObj = {};
        $.ajax({
            url:"index.php?ctrl=ResourcesCtrl&do=getResources&page="+nowPage,
            type:"post",
            data:dataObj,
            dataType:"json",
            success:function(res){
                //console.log(res.data);
                showResources(res.data.res);
                var count = res.data.totalPage;
                showPage(count,dataObj);
            },
            error:function(){
                console.log("ajax连接失败");
            }
        })
    }else {
        var nowPage = 1;
        var dataObj = {
            "searchVal":searchVal
        }
        $.ajax({
            url:"index.php?ctrl=ResourcesCtrl&do=getResources&page="+nowPage,
            type:"post",
            data:dataObj,
            dataType:"json",
            success:function(res){
                //console.log(res);
                showResources(res.data.res);
                var count = res.data.totalPage;
                //console.log(count);
                showPage(count,dataObj);
            },
            error:function(){
                console.log("ajax连接失败");
            }
        })
    }

})

//点击编辑事件
$("#reDiv").on('click','.upRe_but',function(){

    var _thisReName = $(this).parents('tr').find(".reName");
    var _thisVName = $(this).parents('tr').find(".vName");
    var reid = $(this).attr("reid");
    var reStr = `<div>资源ID:<span id="reSpan">${reid}</span></div>
                  <div>资源名:<input type='text' id="reName" value="${$(this).parents('tr').find(".reName").html()}"/></div>
                  <div>资源类型:<select name="a" id="re_select1">${vipStr}</select></div>`


    layui.use('layer', function(){
        //eg1
        layer.confirm(reStr, {
            title: ['修改资源信息', 'font-size:18px;'],
            area:'300px',
            offset: ['200px', '200px'],
            shade:0,
            btn: ['确认修改'] //可以无限个按钮
        }, function(index, layero){
            var vid = $("#re_select1").val();
            var reName = $("#reName").val();
            var reObj = {
                "reid":reid,
                "vid":vid,
                "reName":reName
            }
            $.ajax({
                url:"index.php?ctrl=ResourcesCtrl&do=upResources",
                type:"post",
                data:reObj,
                dataType:"text",
                success:function(res){
                    //console.log(res);
                    if(res == 1){
                        $(".vip_op").each(function(index,val){
                            if($(val).prop("value") == vid){
                                _thisVName.html($(val).html())
                            }
                        })
                        _thisReName.html(reName);
                        layer.msg('修改成功');
                    }else{
                        layer.msg('修改失败');
                    }
                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
        })
    });
})

//点击删除事件
$("#reDiv").on("click",".delRe_but",function(){
    var re_tr = $(this).parents("tr");
    var reid = $(this).attr("reid");
    layui.use('layer', function(){
        //eg1
        layer.confirm('确认删除？', {icon: 3, title:'删除',shade:0}, function(index){
            //do something
            $.ajax({
                url:"index.php?ctrl=ResourcesCtrl&do=delResources",
                type:"post",
                data:{reid:reid},
                dataType:"text",
                success:function(res){
                    //console.log(res);
                    if(res == 1){
                        re_tr.remove();
                        layer.msg('删除成功');
                    }else{
                        layer.msg('该视频下存在评论，删除失败');
                    }
                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
            layer.close(index);
        });
    })
})

function showPage(count,dataObj){
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: count //数据总数，从服务端得到
            ,limit:5
            ,jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                var page = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                $.ajax({
                    url:"index.php?ctrl=ResourcesCtrl&do=getResources&page="+page,
                    type:"post",
                    dataType:"json",
                    data:dataObj,
                    success:function(res){
                        //console.log(res);
                        showResources(res.data.res);
                    },
                    error:function(a){
                        console.log(a);
                        console.log("ajax连接失败");
                    }
                })
            }
        });
    });
}