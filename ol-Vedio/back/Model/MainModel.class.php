<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/3/24
 * Time: 0:59
 */
class MainModel extends Model{
    //数据库获取主页 菜单
    public function getMenu(){
        $res = $this->selectTab("t_menu");
        return $res;
    }

    //查询权限
    public function isPowers($rid,$mid){
        $sql = "SELECT * FROM t_powers WHERE rid={$rid} AND mid={$mid}";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }
}