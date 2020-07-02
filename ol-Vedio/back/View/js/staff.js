/**
 * Created by 11825 on 2020/4/5.
 */
var nowPage = 1;
window.onload = function(){
    $.ajax({
        url:"index.php?ctrl=StaffCtrl&do=showStaffG&page="+nowPage,
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res);
           showStaff(res.data.res);
            var count = res.data.pages*5;
            var page = res.data.nowPage;
            staffPage(count,page,5);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
}

function showStaff(data){
    var staffStr = `<thead><tr><td>ID</td><td>员工名</td><td>角色</td><td>创建时间</td><td>操作</td><tr></thead>`;
    data.forEach(function(val,index){
        var isLocking = val.isLocking;
        var isLocking_butS = ``;
        isLocking == "未锁定" ? isLocking_butS = "锁定":isLocking_butS = "解锁";
        staffStr +=`<tr class="staff_tr"><td>${val.sid}</td><td class="staffName_td">${val.sName}</td><td class="roleName_td">${val.rName}</td><td>${val.createTime}</td>
                    <td><button class="layui-btn edit_staff" sid="${val.sid}">编辑</button><button class="layui-btn locking_but" sid="${val.sid}">${isLocking_butS}</button></td></tr>`
    })
    $("#staffTable").html(staffStr);
}


//分页点击事件
function staffPage(count,page,num){
    $('#test1').pagination({
        total:count,
        doPaging:function(page,num){
            //$('.test').eq(0).html(`当前页是${page}每页数量${num}`);
            $.ajax({
                url:"index.php?ctrl=StaffCtrl&do=showStaffG&page="+page,
                type:"get",
                dataType:"json",
                success:function(res){
                    //console.log(res);
                    showStaff(res.data.res);
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
function showRole(data,sid,sName){
    var editStr = `<div>员工ID：<span class="sid">${sid}</span></div>
                    <div>员工名：<input type='text' value="${sName}" id="sName"/></div>
                    <div>员工角色：<select name="a" id="sRid">`
    data.forEach(function(val,index){
        editStr+=`<option value="${val.rid}" name="a" class="rName">${val.rName}</option>`

    })
    editStr+=  `</select></div>`;
    return editStr;
}
//点击编辑事件
$("#staffTable").on("click",".edit_staff",function(){
    var sid = $(this).attr("sid");
    var _thisName = $(this).parents(".staff_tr").find(".staffName_td");
    var _thisRole = $(this).parents(".staff_tr").find(".roleName_td");
    var sName = $(this).parents(".staff_tr").find(".staffName_td").html();
    $.ajax({
        url:"index.php?ctrl=StaffCtrl&do=showRole",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res.data);
            var role = res.data;
            var editStr = showRole(role,sid,sName);
            layui.use('layer', function(){
                layer.open({
                     content: editStr
                    ,shade:0
                    ,title: ['修改员工信息', 'font-size:18px;']
                    ,area:'300px'
                    ,offset: ['200px', '200px']
                    ,btn: ['密码重置', '确认修改', '取消']
                    ,btn1: function(index, layero){
                        $.ajax({
                            url:"index.php?ctrl=StaffCtrl&do=resetPwd",
                            type:"post",
                            data:{sid:sid},
                            dataType:"text",
                            success:function(res){
                                //console.log(res);
                                if(res == 1){
                                    layer.msg('重置成功');
                                }else{
                                    layer.msg('重置失败');
                                }
                            },
                            error:function(){
                                console.log("ajax连接失败");
                            }
                        })
                    }
                    ,btn2: function(index, layero){
                        var sName = $("#sName").val();
                        var sRid = $("#sRid").val();
                        var staffObj = {sid:sid,
                                        sName:sName,
                                        sRid:sRid}
                        $.ajax({
                            url:"index.php?ctrl=StaffCtrl&do=upStaff",
                            type:"post",
                            data:staffObj,
                            dataType:"text",
                            success:function(res){
                                if(res == 1){
                                    $(".rName").each(function(index,val){
                                        if($(val).val() == sRid){
                                            _thisRole.html($(val).html());
                                        }
                                    })
                                    _thisName.html(sName);
                                    layer.msg('修改成功');
                                }else{
                                    layer.msg('修改失败');
                                }
                            },
                            error:function(){
                                console.log("ajax连接失败");
                            }
                        })

                    }
                    ,cancel: function(){
                        //右上角关闭回调

                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            })
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})

//锁定解锁点击事件
$("#staffTable").on("click",".locking_but",function(){
    var sid = $(this).attr("sid");
    var _this = $(this);
    var isLocking = $(this).html();
    var locking = ``;
    isLocking == "锁定" ? locking = "锁定" : locking = "未锁定";
    layui.use('layer', function(){
        //eg1
        layer.confirm('确认'+isLocking+'？', {icon: 3, title:'重置',shade:0}, function(index){
            //do something
            $.ajax({
                url:"index.php?ctrl=StaffCtrl&do=isLockingG",
                type:"post",
                data:{sid:sid,
                    locking:locking},
                dataType:"text",
                success:function(res){
                    //console.log(res);
                    if(res == 1){
                        _this.html(isLocking=="锁定" ? "解锁":"锁定");
                        layer.msg(isLocking+'成功');
                    }else{
                        layer.msg(isLocking+'失败');
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


$("#search").change(function(){
    var seleVal = $(this).val();
    $.ajax({
        url:"index.php?ctrl=StaffCtrl&do=seleStaff&page="+nowPage,
        type:"post",
        data:{seleVal:seleVal},
        dataType:"json",
        success:function(res){
            // console.log(res);
            showStaff(res.data.res);
            var count = res.data.pages*5;
            var page = res.data.nowPage;
            staffPage(count,page,5);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})