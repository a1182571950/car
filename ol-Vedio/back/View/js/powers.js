window.onload = function(){
    $.ajax({
        url:"index.php?ctrl=PowersCtrl&do=showPowersG",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res.data);
             showRole(res.data);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
}

//显示角色表
function showRole(data){
    var roleStr = `<thead><tr><td>角色ID</td><td>角色名</td><td>操作</td></tr></thead>`;
    data.forEach(function(val,index){
        if(val.rid == 1){
            roleStr += `<tr><td class="role_rid">${val.rid}</td><td class="role_rName">${val.rName}</td>
                    <td>
                        <button type="button" class="layui-btn layui-btn-disabled layui-btn-xs layui-btn-danger">
                          <i class="layui-icon">修改</i>
                        </button>
                        <button type="button" class="layui-btn layui-btn-disabled layui-btn-xs layui-btn-normal">
                          <i class="layui-icon">删除</i>
                        </button>
                        <button type="button" class="layui-btn layui-btn-xs layui-btn-warm  powers_but" rid = "${val.rid}">
                          <i class="layui-icon" >权限管理</i>
                        </button>
                    </td></tr>`;

        }else{
            roleStr += `<tr><td class="role_rid">${val.rid}</td><td class="role_rName">${val.rName}</td>
                    <td>
                        <button type="button" class="layui-btn layui-btn-xs layui-btn-danger upRole_but" rid = "${val.rid}">
                          <i class="layui-icon">修改</i>
                        </button>
                        <button type="button" class="layui-btn layui-btn-xs layui-btn-normal delRole_but" rid = "${val.rid}">
                          <i class="layui-icon">删除</i>
                        </button>
                        <button type="button" class="layui-btn layui-btn-xs layui-btn-warm powers_but" rid = "${val.rid}">
                          <i class="layui-icon" >权限管理</i>
                        </button>
                    </td></tr>`;
        }

    })
    $("#role_table").html(roleStr);
}

//新增角色
function addRole(rid,rName){
    var roleStr = `<tr><td class="role_rid">${rid}</td><td class="role_rName">${rName}</td>
                    <td>
                        <button type="button" class="layui-btn layui-btn-xs layui-btn-danger upRole_but" rid = "${rid}">
                          <i class="layui-icon">修改</i>
                        </button>
                        <button type="button" class="layui-btn layui-btn-xs layui-btn-normal delRole_but" rid = "${rid}">
                          <i class="layui-icon">删除</i>
                        </button>
                        <button type="button" class="layui-btn layui-btn-xs layui-btn-warm powers_but" rid = "${rid}">
                          <i class="layui-icon" >权限管理</i>
                        </button>
                    </td></tr>`;
    $("#role_table").append(roleStr);
}
var rid = 0;

//权限管理点击事件
$("#role_table").on('click','.powers_but',function(){
    $("#powersG_but").show();
    $("#powers_div").show();
    $("#powersG_but").unbind();
    rid = $(this).attr("rid");
    //console.log(rid)
    $.ajax({
        async : false,
        url:"index.php?ctrl=MainCtrl&do=showMainMenu",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(rid)
            $.ajax({
                async : false,
                url:"index.php?ctrl=PowersCtrl&do=isPowers",
                type:"post",
                dataType:"json",
                data:{"rid":rid},
                success:function(res1){
                   var powersArrs =  powersArr(res1.data);
                    layui.use('tree', function(){
                        var tree = layui.tree;
                        //渲染
                        var inst1 = tree.render({
                            elem: '#powers_div1'  //绑定元素
                            ,showCheckbox:true
                            ,onlyIconControl:true
                            ,id: 'demoId'
                            ,data:showPowers(res.data)
                        });
                        tree.setChecked('demoId',powersArrs);
                        //点击确认修改
                        $("#powersG_but").click(function(){
                            //console.log(11111)
                            //alert(1);
                            var checkData = tree.getChecked('demoId');
                            var powersArr = checkPowers(checkData);
                           // console.log(powersArr)
                            //console.log(checkData);

                            //console.log(arr);
                            var dataObj = {
                                "powersArr":powersArr,
                                "rid":rid
                            }
                            //console.log(dataObj);
                            layui.use('layer', function(){
                                //eg1
                                layer.confirm('确认修改该角色权限？', {icon: 3, title:'修改权限',shade:0}, function(index){
                                    //do something
                                    $.ajax({
                                        url:"index.php?ctrl=PowersCtrl&do=upPowers",
                                        type:"post",
                                        data:dataObj,
                                        dataType:"text",
                                        success:function(res){
                                            if(res == 1){
                                                if(rid == nowRid){
                                                    alert('当前角色权限修改成功,请重新登录');
                                                    $.ajax({
                                                        url:"index.php?ctrl=LoginCtrl&do=outLogin",
                                                        type:"get",
                                                        dataType:"text",
                                                        success:function(res){
                                                            if(res == 1){
                                                                window.parent.location.href="index.php?ctrl=LoginCtrl&do=showLogin";
                                                            }
                                                        },
                                                        error:function(){
                                                            console.log("ajax连接失败")
                                                        }
                                                    })
                                                }else{
                                                    layer.msg('权限修改成功');
                                                }
                                            }else{
                                                layer.msg('权限修改失败');
                                            }
                                        },
                                        error:function(){
                                            console.log("ajax连接失败")
                                        }

                                    })
                                    layer.close(index);
                                });
                            })

                        })
                    });
                },
                error:function(a){
                    console.log(a);
                }
            })
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })

})

//获取树状图对象数组
function showPowers(data){
    var arr = [];
    data.forEach(function(val,index){
       // console.log(val.pid);
        if(val.pid==0){
            var arr1 = [];
            data.forEach(function(val1,index1){
                if(val1.pid == val.mid){
                    powersObj1 = {"id":`${val1.mid}`
                                    ,"title":`${val1.mName}`
                                    }
                    arr1.push(powersObj1);
                }

            })
            if(val.mid == 1){
                powersObj = {"id":`${val.mid}`
                    ,"title":`${val.mName}`
                    ,"checked":true
                    ,children:arr1
                }
            }else{
                powersObj = {"id":`${val.mid}`
                    ,"title":`${val.mName}`
                    ,children:arr1
                }

            }
            arr.push(powersObj);
        }
    })
    //console.log(arr);
    return arr;
}

//获取当前用户权限数组
function powersArr(data){
    var arr = [];
    data.forEach(function(val,index){
        arr.push(val.mid);
    })
    return arr;
}

//获取勾选的权限
function checkPowers(data){
    var arr = [];
    data.forEach(function(val,index){
        //console.log(val.children);
        arr.push(val.id);
        if(val.children.length != 0){
            val.children.forEach(function(val1,index1){
                arr.push(val1.id)
            })
        }
    })
    return arr;
}

//点击权限关闭
$("#power_close").click(function(){
    $("#powers_div").hide(100);
})



//点击添加角色
var roleStr = `<div>角色名称：<input type='text' id="addRole_inp"/></div>`
$("#upPowers_but").click(function(){
    $("#powersG_but").hide();
    $("#powers_div").show();
    rid = $(this).attr("rid");
    //console.log(rid)
    $.ajax({
        url:"index.php?ctrl=MainCtrl&do=showMainMenu",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(rid)
            layui.use('tree', function(){
                var tree = layui.tree;
                //渲染
                var inst1 = tree.render({
                    elem: '#powers_div1'  //绑定元素
                    ,showCheckbox:true
                    ,onlyIconControl:true
                    ,id: 'demoId'
                    ,data:showPowers(res.data)
                });
                var checkData = tree.getChecked('demoId');
                var powersArr = checkPowers(checkData);//获取勾选的权限
                //console.log(powersArr);
                layui.use('layer', function(){
                    //eg1
                    layer.confirm(roleStr, {
                        title: ['添加角色', 'font-size:18px;'],
                        area:'300px',
                        offset: ['200px', '200px'],
                        shade:0,
                        btn: ['确认添加'] //可以无限个按钮
                    }, function(index, layero){
                        var rNameVal = $("#addRole_inp").val();
                        if(rNameVal.trim() == ''){
                            alert("请输入正确的角色名");
                            return false;
                        }
                        var roleObj = {
                            "rNameVal":rNameVal,
                            "powersArr":powersArr
                        }
                        //发送角色添加ajax请求
                        $.ajax({
                            url:"index.php?ctrl=PowersCtrl&do=addRole",
                            type:"post",
                            data:roleObj,
                            dataType:"json",
                            success:function(res1){
                                if(res1.data.flag){
                                    /*addRole(res1.data.rid,rNameVal);*/
                                    $.ajax({
                                        url:"index.php?ctrl=PowersCtrl&do=showPowersG",
                                        type:"get",
                                        dataType:"json",
                                        success:function(res){
                                            //console.log(res.data);
                                            showRole(res.data);
                                        },
                                        error:function(){
                                            console.log("ajax连接失败");
                                        }
                                    })
                                    layer.msg('新增角色成功');
                                }else{
                                    layer.msg('新增角色失败');
                                }
                            },
                            error:function(a){
                                console.log(a);
                            }
                        })
                    })
                });
            });


        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})

//点击修改

$("#role_table").on("click",".upRole_but",function(){
    var role_rid = $(this).parents("tr").find(".role_rid");
    var role_rName = $(this).parents("tr").find(".role_rName");
    var role_ridVal = role_rid.html();
    var role_rNameVal = role_rName.html();
    var upRoleStr = `<div class="addRole_div">角色ID：<span id="addRole_span">${role_ridVal}</span></div>
                    <div class="addRole_div">角色名：<input type='text' id="addRole_inp" value="${role_rNameVal}"/></div>`;
    layui.use('layer', function(){
        layer.confirm(upRoleStr, {
            title: ['修改角色', 'font-size:18px;'],
            area:'300px',
            offset: ['200px', '200px'],
            shade:0,
            btn: ['确认修改'] //可以无限个按钮
        }, function(index, layero) {
            //按钮【按钮一】的回调
            var rName = $("#addRole_inp").val();
            var roleObj = {
                "rid":role_ridVal,
                "rName":rName
            }
            $.ajax({
                url:"index.php?ctrl=PowersCtrl&do=upRole",
                type:"post",
                data:roleObj,
                dataType:"text",
                success:function(res){
                    if(res == 1){
                        role_rName.html(rName);
                        layer.msg('角色修改成功');
                    }else{
                        layer.msg('角色修改失败');
                    }

                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
        })
    })
})

//点击角色删除事件
$("#role_table").on("click",".delRole_but",function(){
    var role_tr = $(this).parents("tr");
    var rid = Number($(this).attr("rid"));
    layui.use('layer', function(){
        //eg1
        layer.confirm('确认删除？', {icon: 3, title:'删除',shade:0}, function(index){
            //do something
            $.ajax({
                url:"index.php?ctrl=PowersCtrl&do=delRole",
                type:"post",
                data:{rid:rid},
                dataType:"json",
                success:function(res){
                    //console.log(res);
                    if(res.data){
                        role_tr.remove();
                        layer.msg('删除成功');
                    }else{
                        layer.msg('该用户权限未清空删除失败');
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