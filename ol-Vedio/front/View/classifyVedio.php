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
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/classifyVedio.css">
</head>
<body>
    <div>
        <div class="layui-carousel" id="lunBoDiv">
            <div carousel-item>
                <img src="../img/lb1.jpg" alt="">
                <img src="../img/lb1.jpg" alt="">
                <img src="../img/lb2.jpg" alt="">
                <img src="../img/lb3.jpg" alt="">
                <img src="../img/lb4.jpg" alt="">
                <img src="../img/lb5.jpg" alt="">
            </div>
        </div>
        <div class="inline-block vedio_div" id="new_vedioDiv">
            <div><p class="vedio_p inline-block">最新热映</p></div>


        </div>
    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="./View/js/jquery.cookie.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/classifyVedio.js"></script>
</html>