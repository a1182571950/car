<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/5
 * Time: 13:13
 */

class StaffModel extends Model{
    //数据库获取用户信息
    public function getStaff($nowPage){
        $start = ($nowPage - 1)*5;
        $sql01 = "select COUNT(*) as a from t_staff";
        $sql02 = "SELECT s.sid,s.sName,s.isLocking,s.createTime,r.rName FROM t_staff s INNER JOIN t_role r ON s.rid = r.rid LIMIT $start,5;";
        $res = $this->delPage($sql01,$sql02,$nowPage,$start);
        return $res;
    }
    //获取角色数据
    public function getRole(){
        $res = $this->selectTab("t_role");
        return $res;
    }
    //密码重置
    public function resetPwd($sid){
        $sql = "UPDATE t_staff SET sPassword = MD5('123456') WHERE sid = {$sid};";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }
    //修改用户信息
    public function upStaff($sName,$sRid,$sid){
        $sql = "UPDATE t_staff SET sName = '{$sName}',rid = {$sRid} WHERE sid = {$sid}";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }
    //锁定解锁
    public function isLockingG($sid,$locking){
        $sql = "UPDATE t_staff SET isLocking = '{$locking}' WHERE sid = {$sid};";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }
    //员工搜索
    public function seleStaff($nowPage,$seleVal){
        $start = ($nowPage - 1)*5;
        $sql01 = "SELECT COUNT(*) as a from t_staff WHERE sName LIKE '%{$seleVal}%' ";
        $sql02 = "SELECT s.sid,s.sName,s.isLocking,s.createTime,r.rName FROM t_staff s INNER JOIN t_role r ON s.rid = r.rid WHERE sName LIKE '%{$seleVal}%'LIMIT $start,5;";
        $res = $this->delPage($sql01,$sql02,$nowPage,$start);
        return $res;
    }
    //添加员工
    public function appNewStaff($staffName,$staffPwd,$sRid){
        $sql = "INSERT INTO t_staff (sName,sPassword,rid)VALUES('{$staffName}',MD5('{$staffPwd}'),$sRid);";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }
}


