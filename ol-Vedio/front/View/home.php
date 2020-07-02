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
    <title>视频页</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/home.css">
</head>
<body>
    <div class="inline-block vedio_div" id="like_vedioDiv">
        <div><p class="vedio_p inline-block">猜你喜欢</p></div>

    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="./View/js/jquery.cookie.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/home.js"></script>
</html>