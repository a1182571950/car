<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/classify.css">
</head>
<body>
    <h2><span>当前位置:</span>分类管理</h2>
    <div id="classify_div">

    </div>
    <div id="classify_butDiv" class="inline-block">
        <button class="layui-btn layui-btn-radius layui-btn-sm" id="add_but">添加</button>
        <button class="layui-btn layui-btn-radius layui-btn-sm" id="del_but">删除</button>
        <button class="layui-btn layui-btn-radius layui-btn-sm" id="up_but">修改</button>
    </div>
    <div id="classify_sel" class="inline-block" clid="">
        <i class="layui-icon" class="layui-icon-close" id="classify_close">&#x1006;</i>
        <div>
            分类名称: <input type="text" id="classify_int"/>
        </div>
        <div>
            分类级别: <select name="b" id="gClassify_sel">
                            <option name="b" value="2">
                                二级分类
                            </option>
                            <option name="b" value="3">
                                三级分类
                            </option>
                      </select>
        </div>
        <div>
            上级分类: <select name="a" id="nextClassify_sel">

                      </select>
        </div>
        <div>
            前置分类: <select name="c" id="fontClassify_sel"></select>
        </div>
        <button class="layui-btn layui-btn-radius layui-btn-sm" id="classify_submit">提交</button>
        <button class="layui-btn layui-btn-radius layui-btn-sm" id="classify_r">重置</button>
    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/classify.js"></script>
</html>