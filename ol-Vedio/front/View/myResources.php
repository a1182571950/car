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
    <link rel="stylesheet" href="./View/css/myResources.css">
</head>
<body>
<div class="inline-block vedio_div" id="sel_vedioDiv">
    <div><p class="vedio_p inline-block">搜索结果</p></div>
    <div id="sel_vedioDiv1">

    </div>
</div>
<div id="test1"></div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="./View/js/jquery.cookie.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/myResources.js"></script>
</html>