/**
 * Created by 11825 on 2020/4/12.
 */
//类型渲染
window.onload = function(){
    $.ajax({ //获取分类
        url:"index.php?ctrl=ClassifyCtrl&do=getClassify",
        type:"get",
        dataType:"json",
        success:function(res){
          // console.log(res);
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
            //console.log(res);
            vipShow(res.data)
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
}

//类型
function classifyShow(data){
    var classifyStr = ``;
    data.forEach(function(val,index){
        if(val.gid == 2){
            classifyStr += `<option value="${val.clid}">${val.clName}</option>`;
        }
    })
    $("#cl_sel").html(classifyStr);
    return;
}
//用户权限
function vipShow(data){
    var vipStr = ``;
    data.forEach(function(val,index){
        vipStr += `<option value="${val.vid}">${val.vName}</option>`;
    })
    $("#vip_sel").html(vipStr);
    return;
}
//点击确认上传
$("#r1").click(function(){
    //var file_data = $("#imgFile").prop("files")[0];
    var clid = $("#cl_sel").val();
    var vid = $("#vip_sel").val();
    var reName = $("#reName").val();
    if(reName.trim() == ''){
        alert("请输入标题");
        return;
    }
    var file =  document.getElementById('imgFile').files[0] ;
    var file1 = document.getElementById('vedioFile').files[0];
    var reDirector = $("#reDirector").val();
    var rePerformer = $("#rePerformer").val();
    var reInfo = $("#reInfo").val();
    //console.log(file);
    if(!file){
        alert("请上传封面");
        return;
    }
    if(!file1){
        alert("请上传视频");
        return;
    }
    //console.log(clid,vid);
    var form_data = new FormData();
    form_data.append('fileImg',file);
    form_data.append('fileVedio',file1);
    form_data.append('reName',reName);
    form_data.append('clid',clid);
    form_data.append('vid',vid);
    form_data.append('director',reDirector);
    form_data.append('performer',rePerformer);
    form_data.append('info',reInfo);
    $.ajax  ({
        url:"./index.php?ctrl=ResourcesCtrl&do=addResources" ,
        data:form_data,
        type:"post",
        processData : false, //让文件的数据在传输过程中不做处理
        contentType : false, //让请求头不做更改   文件上传的时候加上就好
        success:function (res){
            if(res == 2){
                alert("上传的文件格式不正确");
            }else if(res == 1){
                alert("上传的资源成功");
            }else{
                alert("上传失败");
            }
        }
    })
})

$("#imgFile").change(function(){
    var file = $("#imgFile")[0].files[0];
    //console.log(file);
    if(window.FileReader){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(even){
            document.getElementById("imgFiles").src = even.target.result;
        }
    }else{
        alert("建议使用高版本浏览器")
    }
})
