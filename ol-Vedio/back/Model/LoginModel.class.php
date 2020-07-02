<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/3/24
 * Time: 0:58
 */
class LoginModel extends Model{
//    private $link;
//    public function __construct()
//    {
////        require_once './tool/DB.class.php';
//        $this->link = new DB('hf191026');
//    }
    public function doLogin($name,$pwd){
        $sql = "select s.sid,s.sName,s.isLocking,s.rid,r.rName from t_staff s INNER JOIN t_role r ON s.rid = r.rid WHERE  s.sName = '{$name}' AND s.sPassword = MD5('$pwd')";
        $res = $this->dbObj->selectSQL($sql);
        return $res;
    }
}