/**
 * Created by 11825 on 2020/4/17.
 */
layui.use('element', function(){
    var element = layui.element;

    //一些事件监听
    element.on('tab(demo)', function(data){
        //console.log(data);
    });
});
$.ajax({
    url:"index.php?ctrl=PersonalCtrl&do=getUser",
    type:"post",
    data:{
        "cid":cid
    },
    dataType:"json",
    success:function(res){
        var nowUser = res.data[0];
        $("#myVip").html(nowUser.vName);
        $("#myVip").attr("vid",nowUser.vid);
        $("#myPerTime").html(nowUser.vipExTime);
        $("#myMoney").html(nowUser.money);
    },
    error:function(){
        console.log("ajax连接失败");
    }

})
//点击充值
var moneyStr = `<input type="number" placeholder="请输入充值的金额" class="input_" min="0" id="myMoneyInp">`;
$("#moneyBut").click(function(){
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.confirm(moneyStr, {icon: 3, title:'充值',shade:0,offset: ['250px', '300px']}, function(index){
            //do something
            var moneys = $("#myMoneyInp").val();
            if(isNaN(moneys) || moneys<=0){
                alert("请输入正确的金额");
                return false;
            }
            $.ajax({
                url:"index.php?ctrl=PersonalCtrl&do=upMoney",
                type:"post",
                data:{
                    "cid":cid,
                    "money":moneys
                },
                success:function(res){
                    //console.log(res);
                    if(res){
                        var money1 = $("#myMoney").html();
                        var money2 = Number(money1)+Number(moneys);
                        $("#myMoney").html(money2);
                        alert('充值成功');
                    }else{
                        alert('充值失败');
                    }

                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
            layer.close(index);
        });
    });
})

var vipSel = `<select id="vip_sel"></select>
                <select id="vipTime_sel">
                    <option value="1">一个月</option>
                    <option value="3">三个月</option>
                    <option value="6">半年</option>
                    <option value="24">一年</option>
                </select>
                <span id="vip_span">1000</span>元`;
//渲染vipsle
function vipShow(data){
    var vipStr = ``;
    var nowVid = $("#myVip").attr("vid");
    data.forEach(function(val,index){
        if(val.vid >= nowVid){
            vipStr += `<option value="${val.vPrice}" vid="${val.vid}" class="vip_op">${val.vName}</option>`;
        }

    })
    $("#vip_sel").html(vipStr);
    var vipTime = $("#vipTime_sel").val();
    var vipPrice = $("#vip_sel").val();
    var sumPrice = Number(vipTime)*Number(vipPrice);
    $("#vip_span").html(sumPrice);
    return;
}

//点击升级
$("#upVipBut").click(function(){
    //渲染vipsle
    $.ajax({
        url:"index.php?ctrl=PersonalCtrl&do=getVIP",
        type:"get",
        dataType:"json",
        success:function(res){
            //console.log(res);
            vipShow(res.data);
        },
        error:function(){
            console.log("ajax连接失败");
        }

    })
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.confirm(vipSel, {icon: 3, title:'升级vip',shade:0,offset: ['250px', '300px']}, function(index){
            var options=$("#vip_sel option:selected");
            var vid = options.attr('vid');
            var time = $("#vipTime_sel").val();
            var money = Number($("#vip_span").html());
            var money2 = Number($("#myMoney").html());
            if(money2<money){
                alert('余额不足请充值');
                return;
            }
            $.ajax({
                url:"index.php?ctrl=PersonalCtrl&do=upVIP",
                type:"post",
                data:{
                    "cid":cid,
                    "vid":vid,
                    "money":money,
                    "time":time
                },
                dataType:"text",
                success:function(res){
                    //console.log(res);
                    if(res == 1){
                        alert('订单生成成功');
                    }else{
                        alert('订单生成失败');
                    }
                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
            layer.close(index);
        });
    });
})


$("body").on("change","#vip_sel",function(){
    var vipTime = $("#vipTime_sel").val();
    var vipPrice = $("#vip_sel").val();
    var sumPrice = Number(vipTime)*Number(vipPrice);
    $("#vip_span").html(sumPrice);
})

$("body").on("change","#vipTime_sel",function(){
    var vipTime = $("#vipTime_sel").val();
    var vipPrice = $("#vip_sel").val();
    var sumPrice = Number(vipTime)*Number(vipPrice);
    $("#vip_span").html(sumPrice);
})

//点击交易查询
$("#selOrder").click(function(){
    var nowPage = 1;
    $.ajax({
        url:"index.php?ctrl=PersonalCtrl&do=allOrder&page="+nowPage,
        type:"get",
        dataType:"JSON",
        success:function(res){
            //console.log(res);
            var count = res.data.totalPage;
            var page = res.data.nowPage;
            $("#orderBuy").html(show0rder(res.data.res));
            orderPage(count);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})

//交易记录渲染
function show0rder(data){
    var orderStr = `<thead><tr><td>订单ID</td><td>VIP名称</td><td>时长/月</td><td>总价</td><td>下单时间</td><td>操作</td></tr></thead>`;
    data.forEach(function(val,index){
        var butStr = val.isPay == '未支付'? `<button class="layui-btn layui-btn-sm layui-btn-warm pay" oid ="${val.oid}"  vid = "${val.vid}" money="${val.money}" time="${val.time}">付款</button>` : `<button class="layui-btn layui-btn-sm layui-btn-disabled">已支付</button>`;
        orderStr += `<tr><td>${val.oid}</td><td>${val.vName}</td><td>${val.time}</td><td>${val.money}</td><td>${val.createTime}</td>
                      <td>
                          ${butStr}
                      </td>
                    </tr>`
    })
    return orderStr;
}

//分页点击
function orderPage(count){
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: count //数据总数，从服务端得到
            ,jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                var page = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                $.ajax({
                    url:"index.php?ctrl=PersonalCtrl&do=allOrder&page="+page,
                    type:"get",
                    dataType:"JSON",
                    success:function(res){
                        //console.log(res);
                        $("#orderBuy").html(show0rder(res.data.res));
                    },
                    error:function(){
                        console.log("ajax连接失败");
                    }
                })

            }
        });
    });
}

function orderPage1(count){
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: count //数据总数，从服务端得到
            ,jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                var page = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                $.ajax({
                    url:"index.php?ctrl=PersonalCtrl&do=payOrder&page="+page,
                    type:"get",
                    dataType:"JSON",
                    success:function(res){
                        //console.log(res);
                        $("#orderBuy").html(show0rder(res.data.res));
                    },
                    error:function(){
                        console.log("ajax连接失败");
                    }
                })

            }
        });
    });
}

//分页点击
function orderPage2(count){
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: count //数据总数，从服务端得到
            ,jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                var page = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                $.ajax({
                    url:"index.php?ctrl=PersonalCtrl&do=noPayOrder&page="+page,
                    type:"get",
                    dataType:"JSON",
                    success:function(res){
                        //console.log(res);
                        $("#orderBuy").html(show0rder(res.data.res));
                    },
                    error:function(){
                        console.log("ajax连接失败");
                    }
                })

            }
        });
    });
}
$("#allOrder").click(function(){
    var nowPage = 1;
    $.ajax({
        url:"index.php?ctrl=PersonalCtrl&do=allOrder&page="+nowPage,
        type:"get",
        dataType:"JSON",
        success:function(res){
            //console.log(res);
            var count = res.data.totalPage;
            var page = res.data.nowPage;
            $("#orderBuy").html(show0rder(res.data.res));
            orderPage(count);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})
//点击成功
$("#payOrder").click(function(){
    var nowPage = 1;
    $.ajax({
        url:"index.php?ctrl=PersonalCtrl&do=payOrder&page="+nowPage,
        type:"get",
        dataType:"JSON",
        success:function(res){
            //console.log(res);
            var count = res.data.totalPage;
            var page = res.data.nowPage;
            $("#orderBuy").html(show0rder(res.data.res));
            orderPage1(count);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})

//点击处理中
$("#noPayOrder").click(function(){
    var nowPage = 1;
    $.ajax({
        url:"index.php?ctrl=PersonalCtrl&do=noPayOrder&page="+nowPage,
        type:"get",
        dataType:"JSON",
        success:function(res){
            //console.log(res);
            var count = res.data.totalPage;
            var page = res.data.nowPage;
            $("#orderBuy").html(show0rder(res.data.res));
            orderPage2(count);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})

$("body").on("click",".pay",function(){
    var _this =  $(this);
    var vid = $(this).attr("vid");
    var money = $(this).attr("money");
    var time = $(this).attr("time");
    var oid = $(this).attr("oid");
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.confirm('确认支付？', {icon: 3, title:'确认支付',shade:0,offset: ['250px', '300px']}, function(index){
            $.ajax({
                url:"index.php?ctrl=PersonalCtrl&do=payVIP",
                type:"post",
                data:{
                    "cid":cid,
                    "vid":vid,
                    "money":money,
                    "time":time,
                    "oid":oid
                },
                dataType:"text",
                success:function(res){
                    //console.log(res);
                    if(res == 1){
                        alert('支付成功');
                        _this.parents("tr").remove();
                        $.ajax({
                            url:"index.php?ctrl=PersonalCtrl&do=getUser",
                            type:"post",
                            data:{
                                "cid":cid
                            },
                            dataType:"json",
                            success:function(res){
                                var nowUser = res.data[0];
                                $("#myVip").html(nowUser.vName);
                                $("#myVip").html(nowUser.vName);
                                $("#myPerTime").html(nowUser.vipExTime);
                                $("#myMoney").html(nowUser.money);
                            },
                            error:function(){
                                console.log("ajax连接失败");
                            }
                        })
                    }else{
                        alert('支付失败');
                    }
                },
                error:function(){
                    console.log("ajax连接失败");
                }
            })
            layer.close(index);
        });
    });

})

//查询播放激励
$("#selPlayback").click(function(){
    var nowPage = 1;
    $.ajax({
        url:"index.php?ctrl=PersonalCtrl&do=getPlayvedio&page="+nowPage,
        type:"post",
        data:{"cid":cid},
        dataType:"json",
        success:function(res){
            //console.log(res)
            var count = res.data.totalPage;
            var page = res.data.nowPage;
            $("#playvedioDiv").html(showPlayvedio(res.data.res));
            playPage2(count);
        },
        error:function(){
            console.log("ajax连接失败");
        }
    })
})

function showPlayvedio(data){
    var playvedio = `<thead><tr><td>ID</td><td>视频名称</td><td>封面图</td><td>播放时间</td></tr></thead>`;
    data.forEach(function(val,index){
        playvedio += `<tr><td>${val.plid}</td><td>${val.reName}</td><td><img src="${val.covers}" alt="" class="playImg"></td><td>${val.playTime}</td></tr>`
    })
    return playvedio;
}

//播放记录分页
function playPage2(count){
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'test2' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: count //数据总数，从服务端得到
            ,limit:6
            ,jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                var page = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                //console.log(obj.curr);
                $.ajax({
                    url:"index.php?ctrl=PersonalCtrl&do=getPlayvedio&page="+page,
                    type:"post",
                    data:{"cid":cid},
                    dataType:"json",
                    success:function(res){
                       // console.log(res)
                        $("#playvedioDiv").html(showPlayvedio(res.data.res));
                    },
                    error:function(){
                        console.log("ajax连接失败");
                    }
                })

            }
        });
    });
}