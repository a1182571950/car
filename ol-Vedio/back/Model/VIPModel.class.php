<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/1
 * Time: 11:41
 */
class VIPModel extends Model{

    //数据库获取主页 菜单
    public function getVIP(){
        $res = $this->selectTab("t_vip");
        return $res;
    }
    //添加VIP等级
    public function addVIP($vipName,$vipTime,$vipPrice){
        $sql = "INSERT INTO t_vip (vName,vTime,vPrice)VALUES('{$vipName}','{$vipTime}','{$vipPrice}');";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }
    //修改VIP等级
    public function upVIP($vipName,$vipPrice,$vipTime,$vid){
        $sql = "UPDATE t_vip SET vName='{$vipName}',vPrice={$vipPrice},vTime={$vipTime} WHERE vid= {$vid};";
        $res = $this->dbObj->dealSQL($sql);
        //var_dump($sql);
        return $res;
    }
    //删除VIP等级
    public function delVIP($vid){
        $res = $this->del('t_vip','vid',$vid);
        return $res;
    }
}