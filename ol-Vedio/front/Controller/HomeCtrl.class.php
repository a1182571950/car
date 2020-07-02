<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/15
 * Time: 19:56
 */
class HomeCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new HomeModel();
    }

    //显示主页的方法
    public function showHome(){
        $this->showView("home");
        setcookie("url","./index.php?ctrl=HomeCtrl&do=showHome",0,"/") ;
        setcookie("type","home",0,"/");
    }

    //分类显示前十视频
    public function getResources(){
        $clid = isset($_POST['clid'])?$_POST['clid']:"";
        $res = $this->link->getResources($clid);
        echo $this->ajaxSend($res);
    }
}