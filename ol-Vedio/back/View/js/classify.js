/**
 * Created by 11825 on 2020/4/8.
 */
window.onload = function(){
    $.ajax({
        url:"index.php?ctrl=ClassifyCtrl&do=getClassify",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res);
            //console.log(res.data);
            nextClassify(res.data);
            fontClassify(res.data,1);
            $("#nextClassify_sel").change(function(){
                var pid = $(this).val();
                fontClassify(res.data,pid);
            })
            layui.use('tree', function(){
                var tree = layui.tree;
                //渲染
                var inst1 = tree.render({
                    elem: '#classify_div'  //绑定元素
                    ,onlyIconControl:true
                    //,showCheckbox:true
                    ,id: 'demoId'
                    ,data:showClassify(res.data)
                    ,click: function(obj){
                        //console.log(obj.data.pid); //得到当前点击的节点数据
                        //console.log(obj.state); //得到当前节点的展开状态：open、close、normal
                        //console.log(obj.elem); //得到当前节点元素
                       // console.log(obj.data.children); //当前节点下是否有子节点
                        $("#classify_int").val(obj.data.title);
                        $("#gClassify_sel").val(obj.data.gid);
                        $("#nextClassify_sel").val(obj.data.pid);
                        fontClassify(res.data,obj.data.pid);
                        $("#fontClassify_sel").val(obj.data.sid-1);
                        $("#classify_sel").attr("clid",obj.data.id);
                        $("#classify_sel").attr("sid",obj.data.sid);
                        if(obj.data.children.length != 0 && JSON.stringify(obj.data.children) != '{}'){
                            //alert(1);
                            $("#classify_sel").attr("children",1);
                        }else{
                            $("#gClassify_sel").removeAttr("children");
                        }

                    }
                });
            });
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
}





//获取树状图对象数组
function showClassify(data){
    var arr = [];
    data.forEach(function(val,index){
        // console.log(val.pid);
        if(val.pid==0){
            var arr1 = [];
            data.forEach(function(val1,index1){
                if(val1.pid == val.clid){
                    var arr2 = [];
                    data.forEach(function(val2,index2){
                        if(val2.pid == val1.clid){
                           var  classifyObj2 = {"id":`${val2.clid}`
                                             ,"gid":`${val2.gid}`
                                             ,"pid":`${val2.pid}`
                                              ,"sid":`${val2.sid}`
                                             ,"title":`${val2.clName}`
                                             ,children:{}
                           }
                            arr2.push(classifyObj2);
                        }
                    })
                    var classifyObj1 = {"id":`${val1.clid}`
                        ,"title":`${val1.clName}`
                        ,"gid":`${val1.gid}`
                        ,"pid":`${val1.pid}`
                        ,"sid":`${val1.sid}`
                        ,children:arr2
                    }
                    arr1.push(classifyObj1);
                }

            })
            var classifyObj = {"id":`${val.clid}`
                ,"title":`${val.clName}`
                ,"gid":`${val.gid}`
                ,"pid":`${val.pid}`
                ,"sid":`${val.sid}`
                ,"disabled":true
                ,children:arr1
                ,"spread":true
            }
            arr.push(classifyObj);
        }
    })
    //console.log(arr);
    return arr;
}

//上级分类渲染
function nextClassify(data){
    var nextClassify = ``;
    data.forEach(function(val,index){
        if(val.gid<3){
            nextClassify += `<option value="${val.clid}" name="a">${val.clName}</option>`;
        }
    })
    $("#nextClassify_sel").html(nextClassify);
}

//前置分类渲染
function fontClassify(data,pid){
    var fontClassify = ``;
    data.forEach(function(val,index){
        if(val.pid == pid){
            fontClassify += `<option value="${val.sid}" name="c">${val.clName}</option>`;
        }
    })
    $("#fontClassify_sel").html(fontClassify);
}





//点击修改
var doFlag = "";
$("#up_but").click(function(){
    $("#gClassify_sel").removeAttr("disabled");
    $("#nextClassify_sel").removeAttr("disabled");
    $("#fontClassify_sel").removeAttr("disabled");
    $("#classify_sel").show();
    doFlag = "up";
})

//点击提交
$("#classify_submit").click(function(){
    if(doFlag == "up"){
        if(classifyName =  $("#classify_int").val() == ""){
            alert("分类名不能为空");
            return;
        }
        var classifyName =  $("#classify_int").val();
        var gid = $("#gClassify_sel").val();
        var pid = $("#nextClassify_sel").val();
        var sid = Number($("#fontClassify_sel").val())+1;
        var clid = $("#classify_sel").attr("clid");
        var sid1 = Number($("#classify_sel").attr("sid"));
        var classifyObj = {
            classifyName:classifyName,
            clid:clid,
            gid:gid,
            pid:pid,
            sid:sid,
            sid1:sid1
        }
        $.ajax({
            url:"index.php?ctrl=ClassifyCtrl&do=upClassify",
            type:"post",
            data:classifyObj,
            dataType:"text",
            success:function(res){
                if(res ==1){
                    alert("修改成功");
                    window.location.reload();
                }else{
                    alert("修改失败");
                }
            },
            error:function(a){
                console.log(a);
            }
        })

    }
    if(doFlag == "add"){
        if(classifyName =  $("#classify_int").val() == ""){
            alert("分类名不能为空");
            return;
        }
        var classifyName =  $("#classify_int").val();
        var gid = $("#gClassify_sel").val();
        var pid = $("#nextClassify_sel").val();
        var sid = Number($("#fontClassify_sel").val())+1;
        var classifyObj = {
            classifyName:classifyName,
            gid:gid,
            pid:pid,
            sid:sid
        }
        $.ajax({
            url:"index.php?ctrl=ClassifyCtrl&do=addClassify",
            type:"post",
            data:classifyObj,
            dataType:"text",
            success:function(res){
                if(res ==1){
                    alert("添加成功");
                    window.location.reload();
                }else{
                    alert("添加失败");
                }
            },
            error:function(a){
                console.log(a);
            }
        })
    }
    if(doFlag == "del"){
        if(classifyName =  $("#classify_int").val() == ""){
            alert("分类名不能为空");
            return;
        }
        if($("#classify_sel").attr("children") == 1){
            alert("该分类下存在子分类，无法删除！");
            return;
        }
        var pid = $("#nextClassify_sel").val();
        var clid = $("#classify_sel").attr("clid");
        var sid1 = Number($("#classify_sel").attr("sid"));
        var classifyObj = {
            clid:clid,
            sid1:sid1,
            pid:pid
        }
        $.ajax({
            url:"index.php?ctrl=ClassifyCtrl&do=delClassify",
            type:"post",
            data:classifyObj,
            dataType:"text",
            success:function(res){
                if(res ==1){
                    alert("删除成功");
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            },
            error:function(a){
                console.log(a);
            }
        })
    }

})


//点击添加事件
$("#add_but").click(function(){
    $("#gClassify_sel").removeAttr("disabled");
    $("#nextClassify_sel").removeAttr("disabled");
    $("#fontClassify_sel").removeAttr("disabled");
    $("#classify_int").val("");
    $("#gClassify_sel").val(2);
    $("#nextClassify_sel").val(1);
    $("#fontClassify_sel").val(1);
    $("#classify_sel").show();
    doFlag ="add";
})

//点击删除
$("#del_but").click(function(){
    $("#gClassify_sel").attr("disabled","false");
    $("#nextClassify_sel").attr("disabled","false");
    $("#fontClassify_sel").attr("disabled","false");
    $("#classify_sel").show();
    doFlag = "del";
})

//点击关闭
$("#classify_close").click(function(){
    $("#classify_sel").hide();
})

//点击重置
$("#classify_r").click(function(){
    $("#classify_int").val("");
    $("#gClassify_sel").val(2);
    $("#nextClassify_sel").val(1);
    $("#fontClassify_sel").val(1);
})
