<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/16
 * Time: 0:25
 */
class ClassifyCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new ClassifyModel();
    }

    //显示主页的方法
    public function showClassify(){
        $this->showView("ClassifyVedio");
        setcookie("url","./index.php?ctrl=ClassifyCtrl&do=showClassify",0,"/") ;
        setcookie("type","home",0,"/");
    }

    //分类最新显示
    public function getResourcesNew(){
        $clid = isset($_POST['clid'])?$_POST['clid']:"";
        $res = $this->link->getResourcesNew($clid);
        echo $this->ajaxSend($res);
    }
}