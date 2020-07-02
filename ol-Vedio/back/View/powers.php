<?php $adminInfo =  isset($_COOKIE["nowAdmin"])?unserialize($_COOKIE["nowAdmin"]):'';
        $a = $adminInfo['rid'];
        echo "<script>var nowRid = {$a}</script>";
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/powers.css">
</head>
<body>
    <h2><span>当前位置:</span>权限管理</h2>
    <div id="role_div" class="inline-block">
        <div>角色列表</div>
        <button type="button" class="layui-btn layui-btn layui-btn-sm" id="upPowers_but">
            <i class="layui-icon">&#xe608;</i> 添加
        </button>
        <table id="role_table" class="layui-table" lay-size="lg"></ table>
    </div>
    <div id="powers_div" class="inline-block">
        <i class="layui-icon" class="layui-icon-close" id="power_close">&#x1006;</i>
        <div>权限管理</div>
        <button type="button" class="layui-btn layui-btn layui-btn-sm"  id="powersG_but">
            确认修改
        </button>
        <div id="powers_div1" >


        </div>
    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/powers.js"></script>
</html>