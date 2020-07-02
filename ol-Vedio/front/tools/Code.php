<?php
require_once "./Code.class.php";

//是Code类 实例化出来的 对象
$codeImg = new Code(120,40,4);
session_start();
$nowCode = $codeImg->getCode();
$_SESSION["code"]=$nowCode;