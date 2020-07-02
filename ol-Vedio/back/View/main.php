<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <link rel="stylesheet" href="./View/css/public.css">
    <link rel="stylesheet" href="./View/css/main.css">
</head>
<body>
<div class="safe-width" id="cbody">
    <div id="log-div">
        <h2>YOUTUCI</h2>
    </div>
    <div>
        <div id="adminInfo">
            <div id="adminInfo1">
                <?php $adminInfo =  isset($_COOKIE["nowAdmin"])?unserialize($_COOKIE["nowAdmin"]):'';
                echo $adminInfo['sName'];
                echo "</br>";
                echo $adminInfo['rName'];
                echo "</br>";
                echo $adminInfo['showTime'];
                echo "</br>";
                $a = $adminInfo['rid'];
                $b = $adminInfo['sid'];
                echo "<script>var rid = {$a}</script>";
                echo "<script>var sid = {$b}</script>";
                ?>
                <span href="" id="out">注销</span>
            </div>
        </div>
        <div id="leftBox" class="inline-block">

        </div>
<!--        //这个SRC改变掉就可以切换不同的模块了哈 ， ~~ -->
        <iframe  frameborder="0" width="1000" height="532" id="myIframe" src="index.php?ctrl=HomeCtrl&do=showHome"></iframe>
    </div>
</div>

</body>
<script src="./View/js/jquery.min.js"></script>
<script src="./View/js/jquery.cookie.js"></script>
<script src="../layui/layui.js"></script>
<script src="./View/js/main.js?v=<?php echo time();?>"></script>
</html>