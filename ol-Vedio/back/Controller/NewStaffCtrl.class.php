<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/5
 * Time: 23:40
 */
class NewStaffCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
        $this->link = new NewStaffModel();
    }
    //显示客户管理界面的方法
    public function showNewStaff(){
        $this->showView("NewStaff");
    }

}