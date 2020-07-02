<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/4/6
 * Time: 11:47
 */
class PowersModel extends Model{

    //获取角色列表
    public function showPowersG(){
        $res = $this->selectTab("t_role");
        return $res;
    }

    //查询权限
    public function isPowers($rid){
        $sql = "SELECT * FROM t_powers WHERE rid={$rid};";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }

    //修改权限
    public function upPowers($powersArr,$rid){
        $res1 = $this->del("t_powers",'rid',$rid);
        if($res1){
            if($powersArr){
                foreach($powersArr as $key=>$val){
                    $sql = "INSERT INTO t_powers (rid,mid) VALUES ($rid,$val)";
                    $res = $this->dbObj->dealSQL($sql);
                    if($res){
                        $flag = true;
                    }else{
                        $flag = false;
                    }
                }
            }
        }
        return true;
    }

    //添加角色
    public function addRole($rNameVal,$powersArr){
        $flag = false;
        $sql1 = "INSERT INTO t_role (rName) VALUES ('{$rNameVal}');";
        $sql2 = "SELECT rid FROM t_role WHERE rName = '{$rNameVal}';";
        $res1 = $this->dbObj->dealSQL($sql1);
        $rid = 0;
        if($res1){
            $res2 = $this->dbObj->selectSQL($sql2);
            $rid = $res2[0]['rid'];
            if(is_array($powersArr)){
                foreach($powersArr as $key=>$val){
                    $sql3 = "INSERT INTO t_powers (rid,mid) VALUES ({$rid},{$val});";
                    $res3 = $this->dbObj->dealSQL($sql3);
                    if($res3){
                        $flag = true;
                    }else{
                        return false;
                    }
                }
            }
        }
        return ['flag'=>$flag,
                 'rid'=>$rid
            ];
    }

    //修改角色
    public function upRole($rid,$rName){
        $sql = "UPDATE t_role SET rName='{$rName}' WHERE rid={$rid}";
        $res = $this->dbObj->dealSQL($sql);
        return $res;
    }
    //删除角色
    public function delRole($rid){
        $res = $this->del('t_role','rid',$rid);
        return $res;
    }

}