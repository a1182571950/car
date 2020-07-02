<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/report.css">
</head>
<body>
    <h2><span>当前位置:</span>报表统计</h2>
    <div>
        <div class="inline-block sel_div">
            <input type="text" class="layui-input" id="sel_div1" placeholder="请选择日期">
        </div>
        <div class="inline-block sel_div">
            <select id="sel_div3">
                <option value="0">选择查询的数据</option>
                <option value="1">注册用户数</option>
                <option value="2">视频播放总数</option>
                <option value="3">分类视频播放总数</option>
                <option value="4">前十播放视频信息</option>
            </select>
        </div>
        <button class="layui-btn layui-btn-sm" id="button1">确认查询</button>
        <div id="main" style="width: 800px;height:400px;"></div>
    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/echarts.min.js"></script>
<script src="./View/js/report.js"></script>
</html>