<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/adminlogin.css">
</head>
<body>
    <div id="login-div" class="safe-width">
        <h2><span>YOUTUCI</span>后台管理系统</h2>
        <div id="login-div1">
            <h3>登录</h3>
            <div>
                <h4>adminID:</h4><input type="text" id="adminID">
            </div>
            <div>
                <h4>password:</h4><input type="password" id="adminPW">
            </div>
            <img src="./tools/Code.php" alt="" id="codeImg">
            <div class="code_div"><span>点击图片更换验证码</span></div>
            <div>
                <h4>验证码:</h4><input type="text" id="adminCode">
            </div>
            <button id="login-but" class="layui-btn layui-btn-normal">登录</button>
        </div>
    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="../layui/layui.js"></script>
<script src="./View/js/adminLogin.js?v=<?php echo time();?>"></script>
</html>