<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>员工添加</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/NewStaff.css">
</head>
<body>
    <div>
        <h2><span>当前位置:</span>员工添加</h2>
        <div>
            <div>
                <div class="staffDiv">
                    <span>员工名：</span><input type="text" id="staffName"/>
                </div>
                <div class="tishi" id="noUserName">
                    <span>员工名输入格式不正确</span>
                </div>
                <div class="staffDiv">
                    <span>员工密码：</span><input type="password" id="staffPwd"/>
                </div>
                <div class="tishi" id="noPwd">
                    <span>密码输入格式不正确</span>
                </div>
                <div class="staffDiv">
                    <span>确认密码：</span><input type="password" id="staffPwd2"/>
                </div>
                <div class="tishi" id="noPwd2">
                    <span>两次密码不一致</span>
                </div>
                <div id="roleDiv" class="staffDiv">

                </div>
                <div class="staffDiv">
                    <button class="layui-btn layui-btn-normal" id="appNewStaff_but">确认添加</button>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="./View/js/jquery.min.js"></script>
<script src="../layui/layui.js"></script>
<script src="../page/pagination-jquery.js"></script>
<script src="./View/js/NewStaff.js"></script>
</html>