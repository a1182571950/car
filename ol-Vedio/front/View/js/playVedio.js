/**
 * Created by 11825 on 2020/4/16.
 */
var path = parent.document.getElementById("front_iframe").getAttribute("path");
//获取视频id
var reid = parent.document.getElementById("front_iframe").getAttribute("reid");
var cid = parent.document.getElementById("front_iframe").getAttribute("cid");
$("#myVideo").prop("src",path);
//console.log(reid);
//ajax获取视频详情
$.ajax({
    url:"index.php?ctrl=VedioCtrl&do=getNowResources",
    type:"post",
    data:{"reid":reid},
    dataType:"json",
    success:function(res){
        //console.log(res);
        $("#videoInto_div").html(showReInto(res.data[0]));
    },
    error:function(){
        console.log("ajax连接失败");
    }
})
//视频点击率+1新增一条播放纪录
$.ajax({
    url:"index.php?ctrl=VedioCtrl&do=addVedio",
    type:"post",
    data:{
        "reid":reid,
        "cid":cid
    },
    dataType:"text",
    success:function(res){
        //console.log(res);
    },
    error:function(){
        console.log("ajax连接失败");
    }
})
//视频信息渲染
function showReInto(data){
    var reIntoStr =`<p id="myVideo_p">${data.reName}</p>
                        <p class="myVideo_p1">评分： <span>9.0</span>分</p>
                        <p class="myVideo_p1">播放量： <span>${data.playbackNum}</span></p>
                        <p class="myVideo_p1">导演：<span>${data.director}</span></p>
                        <p class="myVideo_p1">主演： <span>${data.performer}</span></p>
                        </br>
                        </br>
                        <p class="myVideo_p1">简介：</p>
                        <span>
                            ${data.info}
                        </span>`
    return reIntoStr;
}
//查询评论
var nowPage = 1;
$.ajax({
    url:"index.php?ctrl=VedioCtrl&do=getComment&page="+nowPage,
    type:"post",
    data:{
        "reid":reid
    },
    dataType:"json",
    success:function(res){
       // console.log(res.data.res.length);
        if(res.data.res.length != 0){
            //alert(1)
            var count = res.data.pages*5;
            var page = res.data.nowPage;
            $("#commentDiv1").html(showComment(res.data.res));
            commentPage(count,page,5);
        }
    },
    error:function(){
        console.log("ajax连接失败");
    }
})

//评论渲染
function showComment(data){
    var commentStr = ``;
    data.forEach(function(val,index){
        commentStr += `<div class="infoDiv">
                            <p class="nowName">${val.cName}</p>
                            <p>${val.createTime}</p>
                            <p>${val.content}</p>
                        </div>`
    })
    return commentStr;
}


//评论编辑区域
var ieditor =``;
var layedit;
layui.use(['layedit', 'layer', 'jquery'], function () {
    var $ = layui.jquery;
    var layedit = layui.layedit;
    layedit.set({
        //暴露layupload参数设置接口 --详细查看layupload参数说明
        uploadImage: {
            url: '/Attachment/LayUploadFile',
            accept: 'image',
            acceptMime: 'image/*',
            exts: 'jpg|png|gif|bmp|jpeg',
            size: '10240',
        }
        , uploadVideo: {
            url: '/Attachment/LayUploadFile',
            accept: 'video',
            acceptMime: 'video/*',
            exts: 'mp4|flv|avi|rm|rmvb',
            size: '20480'
        }
        //右键删除图片/视频时的回调参数，post到后台删除服务器文件等操作，
        //传递参数：
        //图片： imgpath --图片路径
        //视频： filepath --视频路径 imgpath --封面路径
        , calldel: {
            url: '/Attachment/DeleteFile'
        }
        //开发者模式 --默认为false
        , devmode: true
        //插入代码设置
        , codeConfig: {
            hide: true,  //是否显示编码语言选择框
            default: 'javascript' //hide为true时的默认语言格式
        }
        , tool: [
            'html', 'code', 'strong', 'italic', 'underline', 'del', 'addhr', '|', 'fontFomatt', 'colorpicker', 'face'
            , '|', 'left', 'center', 'right', '|', 'link', 'unlink', 'image_alt', 'video', 'anchors'
            , '|', 'fullScreen'
        ]
        , height: '90%'
    });
    ieditor = layedit.build('layeditDemo');
    $("#commentBut").click(function(){
        var info = layedit.getContent(ieditor)//获取值
        pushInfo(info,layedit,ieditor);
    })
})
//评论发布
function pushInfo(info,layedit,ieditor){
    if(info.trim() == ''){
        alert("评论内容不能为空");
        return;
    }
    $.ajax({
        url:"index.php?ctrl=VedioCtrl&do=pushInfo",
        type:"post",
        data:{
            "cid":cid,
            "reid":reid,
            "info":info
        },
        dataType:"text",
        success:function(res){
            //console.log(res)
            if(res == 1){
                alert('发布成功');
                layedit.setContent(ieditor,"");
                $.ajax({
                    url:"index.php?ctrl=VedioCtrl&do=getComment&page="+nowPage,
                    type:"post",
                    data:{
                        "reid":reid
                    },
                    dataType:"json",
                    success:function(res){
                        // console.log(res.data.res.length);
                        if(res.data.res.length != 0){
                            //alert(1)
                            var count = res.data.pages*5;
                            var page = res.data.nowPage;
                            $("#commentDiv1").html(showComment(res.data.res));
                            commentPage(count,page,5);
                        }
                    },
                    error:function(){
                        console.log("ajax连接失败");
                    }
                })
               return true;
            }else{
                alert('发布失败');
                return false;
            }

        }
    })
}
//分页点击
function commentPage(count,page,num){
    $('#test1').pagination({
        total:count,
        doPaging:function(page,num){
            //$('.test').eq(0).html(`当前页是${page}每页数量${num}`);
            $.ajax({
                url:"index.php?ctrl=VedioCtrl&do=getComment&page="+page,
                type:"post",
                data:{
                    "reid":reid
                },
                dataType:"json",
                success:function(res){
                    // console.log(res.data.res.length);
                    if(res.data.res.length != 0){
                        //alert(1)
                        $("#commentDiv1").html(showComment(res.data.res));
                    }
                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
        },
        perPage: 5 ,
        isShowFirstPage :true,
        isShowLastPage : true
    })
}
