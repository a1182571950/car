<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/19
 * Time: 23:14
 */
class MyResourcesCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new MyResourcesModel();
    }

    //显示主页的方法
    public function showMyResources(){
        $this->showView("MyResources");
        setcookie("url","./index.php?ctrl=MyResourcesCtrl&do=showMyResources",0,"/") ;
        setcookie("type","MyResources",0,"/");
    }

    //搜索视频
    public function getMyResources(){
        $selName = isset($_POST['selName'])?$_POST['selName']:"";
        $page = isset($_GET['page'])?$_GET['page']:"";
        $res = $this->link->getMyResources($selName,$page);
        echo $this->ajaxSend($res);
    }
}