<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/14
 * Time: 2:30
 */
class HomeCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new HomeModel();
    }

    //显示主页
    public function showHome(){
        $this->showView("Home");
    }
}