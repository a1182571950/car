<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>资源管理</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/resources.css">
</head>
<body>
    <h2><span>当前位置:</span>资源列表</h2>
        <div class="inline-block">
            <select name="a" id="classify_sel" class="inline-block">
                <option value="0" name="a">分类选择</option>
            </select>
            <div class="inline-block" id="searchDiv">
                <input type="text" placeholder="请输入关键词" id="search_inp"/>
                <button type="button" class="layui-btn layui-btn-sm" id="search_but">
                    <i class="layui-icon">&#xe615;</i>
                </button>
            </div>
            <div>
                <table class="layui-table" lay-size="lg"  id="reDiv">

                </table>
                <div id="test1"></div>
                <div id="test3"></div>
            </div>
        </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/resources.js"></script>
</html>