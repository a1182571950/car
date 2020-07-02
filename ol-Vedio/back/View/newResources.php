<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/newResources.css">
</head>
<body>
    <h2><span>当前位置:</span>资源添加</h2>
    <div id="reDiv" class="inline-block">
        <div><span>分类:</span><select id="cl_sel">   </select></div>
        <div><span>用户类型</span><select id="vip_sel"></select></div>
        <div><span>封面:</span><input type="file" accept="image/*" id="imgFile"/></div>
        <div><span>视频:</span><input type="file" multiple="multiple" id="vedioFile"/></div>
        <div><span>标题:</span><input type="text" id="reName"></div>
        <div><span>导演:</span><input type="text" id="reDirector"></div>
        <div><span>主演:</span><input type="text" id="rePerformer"></div>
        <div><span>简介:</span><input type="text" id="reInfo"></div>
        <div><button class="layui-btn" id="r1">确认添加</button></div>
    </div>
    <div class="inline-block" id="reImgDiv">
        <p>封面预览</p>
        <img id="imgFiles">

        </img>
    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="../layui/layui.js"></script>
<script src="./View/js/newResources.js"></script>
</html>