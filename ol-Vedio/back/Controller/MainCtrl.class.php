<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/3/24
 * Time: 0:57
 */
class MainCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new MainModel();
    }
    //显示管理界面的方法
    public function showMain(){
        $this->showView("main");
    }
    //显示主页面内容（菜单）
    public function showMainMenu(){
        $res = $this->link->getMenu();
        echo $this->ajaxSend($res);
    }
    //查看是否有权限
    public function isPowers(){
        $rid = isset($_POST['rid'])?$_POST['rid']:"";
        $mid = isset($_POST['mid'])?$_POST['mid']:"";
        $res = $this->link->isPowers($rid,$mid);
        if($res){
            echo 1;
        }else{
            echo 2;
        }
    }

}