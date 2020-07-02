<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/17
 * Time: 0:24
 */
class PersonalModel extends Model{
    //充值金额
    public function upMoney($cid,$money){
        $sql = "UPDATE t_customer SET money = money+{$money} WHERE cid = {$cid};";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }

    //查询用户信息
    public function getUser($cid){
        $sql = "SELECT c.cid,c.cName,c.money,c.isLocking,c.vipExTime,v.vName,c.vid FROM t_customer c INNER JOIN t_vip v ON c.vid = v.vid
                WHERE c.cid = {$cid}";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //查询vip
    public function getVIP(){
        $res = $this->selectTab("t_vip");
        return $res;
    }


    //VIP订单
    public function upVIP($cid,$vid,$money,$time){
        $sql="INSERT INTO t_order (cid,vid,money,`time`) VALUES ({$cid},{$vid},{$money},{$time});";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }
    //升级vip
    public function buyOrder($cid,$vid,$money,$time){
        $sql2 = "select DATE_ADD(vipExTime,INTERVAL {$time} MONTH) a from t_customer WHERE cid={$cid};";
        $res2 = $this->dbObj->selectSQL($sql2);
        $sql = "UPDATE t_customer SET vid = {$vid},money = money-{$money},vipExTime = '{$res2[0]['a']}'  WHERE cid = {$cid};";
        $res = $this->dbObj->dealSQL($sql);
        $sql1 = "SELECT c.cid,c.cName,c.money,c.isLocking,c.vipExTime,v.vName,c.vid FROM t_customer c INNER JOIN t_vip v ON c.vid = v.vid
                WHERE c.cid = {$cid};";
        if($res){
            $res1 = $this->dbObj->selectSQL($sql1);
        }
        return $res1;
    }

    //全部订单查询
    public function allOrder($page){
        $start = ($page - 1)*10;
        $sql01 = "select COUNT(*) as a from t_order";
        $sql02 = "SELECT o.oid,o.cid,o.vid,o.money,o.time,o.createTime,o.isPay,v.vName FROM t_order o INNER JOIN t_customer c ON o.cid = c.cid INNER JOIN t_vip v ON v.vid = o.vid ORDER BY o.createTime DESC  LIMIT $start,10;";
        $res = $this->delPage($sql01,$sql02,$page,$start);
        return $res;
    }

    //payOrder
    public function payOrder($page){
        $start = ($page - 1)*10;
        $sql01 = "select COUNT(*) as a from t_order WHERE isPay = '已支付'";
        $sql02 = "SELECT o.oid,o.cid,o.vid,o.money,o.time,o.createTime,o.isPay,v.vName FROM t_order o INNER JOIN t_customer c ON o.cid = c.cid INNER JOIN t_vip v ON v.vid = o.vid  WHERE o.isPay = '已支付' ORDER BY o.createTime DESC  LIMIT $start,10;";
        $res = $this->delPage($sql01,$sql02,$page,$start);
        return $res;
    }

    //noPayOrder
    public function noPayOrder($page){
        $start = ($page - 1)*10;
        $sql01 = "select COUNT(*) as a from t_order WHERE isPay = '未支付'";
        $sql02 = "SELECT o.oid,o.cid,o.vid,o.money,o.time,o.createTime,o.isPay,v.vName FROM t_order o INNER JOIN t_customer c ON o.cid = c.cid INNER JOIN t_vip v ON v.vid = o.vid  WHERE o.isPay = '未支付' ORDER BY o.createTime DESC  LIMIT $start,10;";
        $res = $this->delPage($sql01,$sql02,$page,$start);
        return $res;
    }

    //升级vip
    public function payVIP($cid,$vid,$money,$time,$oid){
        $sql2 = "select DATE_ADD(vipExTime,INTERVAL {$time} MONTH) a from t_customer WHERE cid={$cid};";
        $res2 = $this->dbObj->selectSQL($sql2);
        $sql = "UPDATE t_customer SET vid = {$vid},money = money-{$money},vipExTime = '{$res2[0]['a']}'  WHERE cid = {$cid};";
        $res = $this->dbObj->dealSQL($sql);
        $sql3 = "UPDATE t_order SET isPay = '已支付'  WHERE oid = {$oid};";
        $res3 = $this->dbObj->dealSQL($sql3);
        $sql1 = "SELECT c.cid,c.cName,c.money,c.isLocking,c.vipExTime,v.vName,c.vid FROM t_customer c INNER JOIN t_vip v ON c.vid = v.vid
                WHERE c.cid = {$cid};";
        if($res){
            $res1 = $this->dbObj->selectSQL($sql1);
        }
        return $res1;
    }

    //播放记录查询
    public function getPlayvedio($page,$cid){
        $start = ($page - 1)*6;
        $sql01 = "select COUNT(*) as a from t_playvedio WHERE cid ={$cid}";
        $sql02 = "SELECT pl.plid,pl.reid,pl.playTime,re.reName,re.covers FROM t_playvedio pl INNER JOIN t_resources re ON pl.reid = re.reid   WHERE pl.cid ={$cid}  ORDER BY pl.playTime DESC LIMIT $start,6;";
        $res = $this->delPage($sql01,$sql02,$page,$start);
        return $res;
    }
}