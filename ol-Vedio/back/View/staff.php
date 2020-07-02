<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>员工列表</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/staff.css">
</head>
<body>
    <h2><span>当前位置:</span>员工列表</h2>
    <div>搜索:<input type="text" placeholder="输入关键词" id="search"></div>
    <table class="layui-table" lay-size="lg" id="staffTable">

    </table>
    <div id="test1"></div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/staff.js"></script>
</html>