window.onload = function(){
    $.ajax({
        url:"index.php?ctrl=VIPCtrl&do=showVIPG",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res);
            showVIPG(res.data);
        },
        error:function(){
            console.log("ajax连接失败");
        }

    })
}

function showVIPG(data){
    var vipStr = `<thead><tr><td>等级</td><td>时效/天</td><td>费用/元</td><td>操作</td></tr></thead>`;
    data.forEach(function(val,index){
        vipStr += `<tr class="vip_tr">
                    <td class="vip_Name">${val.vName}</td>
                    <td class="vip_Time">${val.vTime}</td>
                    <td class="vip_Price">${val.vPrice}</td>
                    <td><button type="button" class="layui-btn up_but" vid="${val.vid}">编辑</button>
                        <button type="button" class="layui-btn del_but" vid="${val.vid}">删除</button></td>
                   </tr>` ;

    })
    $("#vipTable").html(vipStr);
}
var appStr = `<div class="addVIP_div">等级名称：<input type='text' class="addVIP_inp" id="vipName"/></div>
               <div class="addVIP_div">等级时效：<input type='number'min="0" class="addVIP_inp" id="vipTime"/>  天</div>
               <div class="addVIP_div">等级费用：<input type='number'min="0" class="addVIP_inp" id="vipPrice"/>  元</div>`

//添加VIP
$("#add_VIP").click(function(){
    layui.use('layer', function(){
        //eg1
        layer.confirm(appStr, {
            title: ['添加等级', 'font-size:18px;'],
            area:'300px',
            offset: ['200px', '200px'],
            shade:0,
            btn: ['确认添加'] //可以无限个按钮
        }, function(index, layero){
            //按钮【按钮一】的回调
            var vipName = $("#vipName").val(),
                vipTime = $("#vipTime").val(),
                vipPrice = $("#vipPrice").val();
            if(vipName.trim() == ''){
                alert("请输入正确的VIP名");
                return false;
            }
            if(vipPrice.trim()==''){
                alert("请输入正确的价格");
                return false;
            }
            if(!/^\d+$/.test(vipTime) || vipTime.trim() == ''){
                alert("输入的时效必须为整数");
                return false;
            };
            var vipObj = {
                "vipName":vipName,
                "vipTime":vipTime,
                "vipPrice":vipPrice
            }
            //console.log(vipObj);
            $.ajax({
                url:"index.php?ctrl=VIPCtrl&do=addVIP",
                type:"post",
                data:vipObj,
                dataType:"text",
                success:function(res){
                    if(res==1){
/*                        var vipStr = `<tr class="vip_tr">
                                        <td class="vip_Name">${vipName}</td>
                                        <td class="vip_Time">${vipTime}</td>
                                        <td class="vip_Price">${vipPrice}</td>
                                        <td><button type="button" class="layui-btn">编辑</button>
                                            <button type="button" class="layui-btn">删除</button></td>
                                       </tr>`
                        $("#vipTable").append(vipStr);*/
                        $.ajax({
                            url:"index.php?ctrl=VIPCtrl&do=showVIPG",
                            type:"get",
                            dataType:"json",
                            success:function(res){
                                //console.log(res);
                                showVIPG(res.data);
                            },
                            error:function(){
                                console.log("ajax连接失败");
                            }

                        })
                        layer.msg('添加成功');
                    }else{
                        layer.msg('添加失败');
                    }
                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
        })
    });
})

//点击编辑
$("#vipTable").on("click",".up_but",function(){
    var vipName_d = $(this).parents(".vip_tr").find(".vip_Name");
    var vipTime_d = $(this).parents(".vip_tr").find(".vip_Time");
    var vipPrice_d = $(this).parents(".vip_tr").find(".vip_Price");
    var vipName = vipName_d .html();
    var vipTime = vipTime_d .html();
    var vipPrice = vipPrice_d .html();
    var appStr = `<div class="addVIP_div">等级名称：<input type='text' class="addVIP_inp" id="vipName1" value="${vipName}"/></div>
               <div class="addVIP_div">等级时效：<input type='number'min="0" class="addVIP_inp" id="vipTime1" value="${vipTime}"/>  天</div>
               <div class="addVIP_div">等级费用：<input type='number'min="0" class="addVIP_inp" id="vipPrice1" value="${vipPrice}"/>  元</div>`;
    var vipId = Number($(this).attr("vid"));
    layui.use('layer', function(){
        layer.confirm(appStr, {
            title: ['修改等级', 'font-size:18px;'],
            area:'300px',
            offset: ['200px', '200px'],
            shade:0,
            btn: ['确认修改'] //可以无限个按钮
        }, function(index, layero) {
            //按钮【按钮一】的回调
            var vipName1 = $("#vipName1").val(),
                vipTime1 = Number($("#vipTime1").val()),
                vipPrice1 = Number($("#vipPrice1").val());
            if(vipName1.trim() == ''){
                alert("请输入正确的VIP名");
                return false;
            }
            if(vipPrice1 == ''){
                alert("请输入正确的价格");
                return false;
            }
            if(!/^\d+$/.test(vipTime1) || vipTime1 == ''){
                alert("输入的时效必须为整数");
                return false;
            };
            var vipObj1 = {
                vipId:vipId,
                vipName1:vipName1,
                vipTime1:vipTime1,
                vipPrice1:vipPrice1
            }
            $.ajax({
                url:"index.php?ctrl=VIPCtrl&do=upVIP",
                type:"post",
                data:vipObj1,
                dataType:"text",
                success:function(res){
                    //console.log(res)
                    if(res == 1){
                        vipName_d.html(vipName1);
                        vipTime_d.html(vipTime1);
                        vipPrice_d.html(vipPrice1);
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
    })
})

//点击删除
$("#vipTable").on("click",".del_but",function(){
    var delvip_d = $(this).parents(".vip_tr");
    var vipId = Number($(this).attr("vid"));
    layui.use('layer', function(){
        //eg1
        layer.confirm('确认删除？', {icon: 3, title:'删除',shade:0}, function(index){
            //do something
            $.ajax({
                url:"index.php?ctrl=VIPCtrl&do=delVIP",
                type:"post",
                data:{vipId:vipId},
                dataType:"json",
                success:function(res){
                    if(res.data){
                        delvip_d.remove();
                        layer.msg('删除成功');
                    }else{
                        layer.msg('删除失败');
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