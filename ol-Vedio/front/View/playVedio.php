<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/playVedio.css">
</head>
<body>
    <video src="" controls="controls" id="myVideo" width="800px" height="450px"></video>
    <div id="videoInto_div" class="inline-block">
        <p id="myVideo_p">这是名字这是名字</p>
        <p class="myVideo_p1">评分： <span>9.0</span>分</p>
        <p class="myVideo_p1">播放量： <span>100</span></p>
        <p class="myVideo_p1">导演：<span>王家卫</span></p>
        <p class="myVideo_p1">主演： <span>水水水水</span></p>
        </br>
        </br>
        <p class="myVideo_p1">简介：</p>
        <span>
            很好好看牛逼
        </span>
    </div>
    <div id="commentDiv">
        <textarea id="layeditDemo"></textarea>
        <button class="layui-btn" id="commentBut">发表评论</button>
        <div  id="commentDiv2">
            <p id="commentDiv1_p">全部评论</p>
            <div id="commentDiv1">

            </div>
            <div id="test1">
            </div>
        </div>
    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="./View/js/jquery.cookie.js"></script>
<script src="../layui/layui.js"></script>
<script src="./View/js/ace.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/playVedio.js"></script>

</html>