<?php $nowUserInfo =  isset($_COOKIE["nowUser"])?unserialize($_COOKIE["nowUser"]):'';
if($nowUserInfo != ''){
    $vid = $nowUserInfo['vid'];
    $cid = $nowUserInfo['cid'];
    echo "<script>var isLogin = true</script>";
    echo "<script>var cid = $cid</script>";
    echo "<script>var vid = $vid </script>";
}else{
    echo "<script>var isLogin = false</script>";
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>视频登录页</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/main.css">
</head>
<body>
    <div class="safe-width">
        <div id="myDiv">
            <h1 class="inline-block"><b>YOUTUCI</b></h1>
            <ul id="nav_ul">
                <li class="nav_li" id="Home">视频库</li>
                <li class="nav_li" id="Vedio">播放器</li>
                <li class="nav_li" id="Personal">个人中心</li>
            </ul>
            <div class="inline-block" id="search_div">
                <input type="text" placeholder="关键字搜索" id="nav_inp">
                <button id="nav_but" class="layui-btn layui-btn-sm">搜索</button>
            </div>
            <div class="inline-block" id="login_div">
                <span id="login_span">登录</span>
                <span>|</span>
                <span id="reg_span">注册</span>
            </div>
            <div class="inline-block" id="olLogin_div">
                <?php $nowUserInfo =  isset($_COOKIE["nowUser"])?unserialize($_COOKIE["nowUser"]):'';
                if($nowUserInfo != ''){
                    echo "<span>当前用户:</span><span id='olUserName'>{$nowUserInfo['cName']}</span>";
                    echo "<script>var isLogin = true</script>";
                }else{
                    echo "<script>var isLogin = false</script>";
                }
                ?>
                <span id="outOL">注销</span>
            </div>
        </div>
        <div id="regLogin_div">
            <!--注册框-->
            <div class="regLogin_div" id="reg1_div">
                <i class="layui-icon close_rg" id="reg_close">&#x1006;</i>
                <p class="regLogin_p">注 册</p>
                <div class="reg_div"><label for="userName">用户名:</label><input type="text" id="userName">
                </div>
                <div class="tiShi" id="noUserName">4到16位（字母，数字，下划线，减号）</div>
                <div class="reg_div"><label for="pwd">密码:</label><input type="password" id="pwd">
                </div>
                <div class="tiShi" id="noPassWord">密码至少包含 数字和英文，长度6-20</div>
                <div class="reg_div"><label for="pwd2">确认密码:</label><input type="password" id="pwd2">
                </div>
                <div class="tiShi"  id="noPassWord2">两次输入的密码不一致</div>
                <div class="reg_div"><label for="userCode">验证码:</label><input type="text" id="userCode"></div>
                <img src="./tools/Code.php" alt="" id="codeImg">
                <div class="code_div"><span>点击图片更换验证码</span></div>
                <div id="reg_butDiv"><button class="layui-btn layui-btn-sm layui-btn-warm reglogin_button" id="reg_but">确认注册</button><button class="layui-btn layui-btn-sm layui-btn-primary" id="loginS_but">跳转登录</button></div>
            </div>
            <!--登录框-->
            <div class="regLogin_div" id="login1_div">
                <i class="layui-icon close_rg" id="login_close">&#x1006;</i>
                <p class="regLogin_p">登 录</p>
                <div class="reg_div"><label for="userName1">用户名:</label><input type="text" id="userName1">
                </div>
                <div class="reg_div"><label for="pwd1">密码:</label><input type="password" id="pwd1">
                </div>
                <div class="reg_div"><label for="userCode1">验证码:</label><input type="text" id="userCode1"></div>
                <img src="./tools/Code.php" alt="" id="codeImg1">
                <div class="code_div"><span>点击图片更换验证码</span></div>
                <div id="reg_butDiv"><button class="layui-btn layui-btn-sm layui-btn-warm reglogin_button" id="login_but">确认登录</button><button class="layui-btn layui-btn-sm layui-btn-primary" id="regS_but">跳转注册</button></div>
            </div>
         </div>
        <div>
            <div id="classifyDiv">

            </div>
<!--            //刷新后 这个 iframe 是首页 -->
            <iframe src=" <?php echo   isset($_COOKIE['url'] )? $_COOKIE['url']:'./index.php?ctrl=HomeCtrl&do=showHome' ?>"
                    path="<?php echo   isset($_COOKIE['path'] )? $_COOKIE['path']:'' ?>"
                    reid="<?php echo   isset($_COOKIE['reid'] )? $_COOKIE['reid']:'' ?>"
                    cid="<?php echo   isset($_COOKIE['cid'] )? $_COOKIE['cid']:'' ?>"
                    clid="<?php echo   isset($_COOKIE['clid'] )? $_COOKIE['clid']:'' ?>"
                    type="<?php echo   isset($_COOKIE['type'] )? $_COOKIE['type']:'' ?>"
                    type="<?php echo   isset($_COOKIE['selName'] )? $_COOKIE['selName']:'' ?>"
                    scrolling="no" frameborder="0"  width='1100px' height="3000px" id="front_iframe" >
            </iframe>
        </div>
    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="./View/js/jquery.cookie.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/main.js"></script>
</html>