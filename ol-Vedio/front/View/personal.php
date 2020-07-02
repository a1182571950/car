<?php $nowUserInfo =  isset($_COOKIE["nowUser"])?unserialize($_COOKIE["nowUser"]):'';
if($nowUserInfo != ''){
    $vid = $nowUserInfo['vid'];
    $vName = $nowUserInfo['vName'];
    $cid = $nowUserInfo['cid'];
    $vipExTime = $nowUserInfo['vipExTime'];
    $money = $nowUserInfo['money'];
    echo "<script>var isLogin = true</script>";
    echo "<script>var cid = $cid</script>";
}else{
    echo "<script>var isLogin = false</script>";
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>个人中心</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/personal.css">
</head>
<body>
    <div class="layui-tab" id="perDiv">
        <ul class="layui-tab-title">
            <li class="layui-this per_li">我的账户</li>
            <li class="per_li" id="selPlayback">播放记录</li>
            <li class="per_li" id="selOrder">交易查询</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show" id="myPerDiv">
                <div>
                    <span>您当前的会员类型为：</span>
                    <span id="myVip">普通用户</span>
                    <button  id="upVipBut" class="layui-btn layui-btn-radius layui-btn-warm myPerBut">升级/续费</button>
                    <div>
                        <span>到期时间：</span><span id="myPerTime">时间--------</span>
                    </div>
                </div>
                <div>
                    <san>余额： ￥</san>
                    <span id="myMoney">50</span>
                    <button id="moneyBut" class="layui-btn layui-btn-radius layui-btn-danger myPerBut">充值</button>
                </div>
            </div>

            <div class="layui-tab-item">
                <table class="layui-table" lay-size="lg" id="playvedioDiv"></table>
                <div id="test2"></div>
            </div>
            <div class="layui-tab-item">
                <div class="layui-tab">
                    <ul class="layui-tab-title">
                        <li class="layui-this" id="allOrder">全部</li>
                        <li id="payOrder">成功</li>
                        <li id="noPayOrder">处理中</li>
                    </ul>
                </div>
                <div>
                    <table class="layui-table" lay-size="lg" id="orderBuy"></table>
                    <div id="test1"></div>

                </div>
            </div>
        </div>
    </div>

</body>
<script src="./View/js/jquery.min.js"></script>
<script src="./View/js/jquery.cookie.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/personal.js"></script>
</html>