<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/3
 * Time: 9:46
 */
class CustomerModel extends Model{
    //数据库获取用户信息
    public function getCustomer($nowPage){
        $start = ($nowPage - 1)*5;
        $sql01 = "select COUNT(*) as a from t_customer";
        $sql02 = "SELECT c.cid,c.cName,c.money,c.isLocking,c.loginTime,c.vipExTime,c.createTime,v.vName FROM t_customer c INNER JOIN t_vip v ON c.vid = v.vid LIMIT $start,5;";
        $res = $this->delPage($sql01,$sql02,$nowPage,$start);
        return $res;
    }

    //重置用户密码
    public function resetPwd($cid){
        $sql = "UPDATE t_customer SET cPassword = MD5('123456') WHERE cid = {$cid};";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }

    //锁定解锁
    public function isLockingG($cid,$locking){
        $sql = "UPDATE t_customer SET isLocking = '{$locking}' WHERE cid = {$cid};";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }

    //用户搜索
    public function seleCustomer($nowPage,$seleVal){
        $start = ($nowPage - 1)*5;
        $sql01 = "select COUNT(*) as a from t_customer WHERE cName LIKE '%{$seleVal}%' ";
        $sql02 = "SELECT c.cid,c.cName,c.money,c.isLocking,c.loginTime,c.vipExTime,c.createTime,v.vName FROM t_customer c INNER JOIN t_vip v ON c.vid = v.vid WHERE cName LIKE '%{$seleVal}%'LIMIT $start,5;";
        $res = $this->delPage($sql01,$sql02,$nowPage,$start);
        return $res;
    }

    //查询用户注册数据
    public function queryCustomer($startTime,$endTime){
        $sql = "SELECT count(cid) num,DATE_FORMAT(createTime,'%Y-%m') M FROM t_customer WHERE createTime >= '{$startTime}' AND createTime <= '{$endTime}' GROUP BY M;";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }
}