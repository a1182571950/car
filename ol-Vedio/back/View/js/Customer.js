/**
 * Created by 11825 on 2020/4/3.
 */
var nowPage = 1;
window.onload = function(){
    $.ajax({
        url:"index.php?ctrl=CustomerCtrl&do=showCustomerG&page="+nowPage,
        type:"get",
        dataType:"json",
        success:function(res){
           // console.log(res);
            showCustomer(res.data.res);
            var count = res.data.pages*5;
            var page = res.data.nowPage;
            customerPage(count,page,5);

        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
}

function showCustomer(data){
    var customerStr = `<thead><tr><td>ID</td><td>用户名</td><td>类型</td><td>最近登录时间</td><td>创建时间</td><td>操作</td></tr></thead>`;
    data.forEach(function(val,index){
        var isLocking = val.isLocking;
        var isLocking_butS = ``;
        isLocking == "未锁定" ? isLocking_butS = "锁定":isLocking_butS = "解锁";
        customerStr += `<tr><td>${val.cid}</td><td>${val.cName}</td><td>${val.vName}</td><td>${val.loginTime}</td><td>${val.createTime}</td>
                    <td><button class="layui-btn reset_pwd" cid="${val.cid}">重置密码</button>
                                        <button class="layui-btn locking_pwd" cid="${val.cid}">${isLocking_butS}</button></td></tr>`;
    })
    $("#userTable").html(customerStr);
}

//分页点击事件
function customerPage(count,page,num){
    $('#test1').pagination({
        total:count,
        doPaging:function(page,num){
            //$('.test').eq(0).html(`当前页是${page}每页数量${num}`);
            $.ajax({
                url:"index.php?ctrl=CustomerCtrl&do=showCustomerG&page="+page,
                type:"get",
                dataType:"json",
                success:function(res){
                    //console.log(res);
                    showCustomer(res.data.res);
                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
        },
        perPage: 5 ,
        isShowFirstPage :true,
        isShowLastPage : true,
    })
}

//重置密码点击事件
$("#userTable").on("click",".reset_pwd",function(){
    var cid = $(this).attr("cid");
    layui.use('layer', function(){
        //eg1
        layer.confirm('确认重置？', {icon: 3, title:'重置',shade:0}, function(index){
            //do something
            $.ajax({
                url:"index.php?ctrl=CustomerCtrl&do=resetPwd",
                type:"post",
                data:{cid:cid},
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
            layer.close(index);
        });
    })
})


//锁定解锁点击事件
$("#userTable").on("click",".locking_pwd",function(){
    var cid = $(this).attr("cid");
    var _this = $(this);
    var isLocking = $(this).html();
    var locking = ``;
    isLocking == "锁定" ? locking = "锁定" : locking = "未锁定";
    layui.use('layer', function(){
        //eg1
        layer.confirm('确认'+isLocking+'？', {icon: 3, title:'重置',shade:0}, function(index){
            //do something
            $.ajax({
                url:"index.php?ctrl=CustomerCtrl&do=isLockingG",
                type:"post",
                data:{cid:cid,
                      locking:locking},
                dataType:"text",
                success:function(res){
                    //console.log(res);
                    if(res ==1){
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
        url:"index.php?ctrl=CustomerCtrl&do=seleCustomer&page="+nowPage,
        type:"post",
        data:{seleVal:seleVal},
        dataType:"json",
        success:function(res){
           // console.log(res);
            showCustomer(res.data.res);
            var count = res.data.pages*5;
            var page = res.data.nowPage;
            customerPage(count,page,5);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})