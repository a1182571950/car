<?php
/**
 * Created by PhpStorm.
 * User: 11825
 * Date: 2020/3/24
 * Time: 0:57
 */
class LoginCtrl extends Ctrl{
    private $link;
    public function __construct()
    {
//        require_once './Model/LoginModel.class.php';
        $this->link = new LoginModel();
    }
    //显示登录界面的方法
    public function showLogin(){
//        require_once'./view/Login.php';
        $this->showView("adminLogin");
    }
    //点击登录
    public function doLogin(){
        $name = isset($_POST['adminID'])?$_POST['adminID']:'';
        $pwd = isset($_POST['adminPW'])?$_POST['adminPW']:'';
        $code1 = isset($_POST['adminCode'])?$_POST['adminCode']:'';
        session_start();
        $code = $_SESSION["code"];
        if(strtolower($code1) == strtolower($code)){
            $res = $this->link->doLogin($name,$pwd);
            if($res != null){
                if($res[0]['isLocking'] == '未锁定'){
                    $rid = $res[0]['rid'];
                    $rName = $res[0]['rName'];
                    $sName = $res[0]['sName'];
                    $sid = $res[0]['sid'];
                    $showTime = date("Y-m-d H:i:s");
                    $nowAdmin = ["rid"=>$rid,
                        "rName"=>$rName,
                        "sid"=>$sid,
                        "sName"=>$sName,
                        "showTime"=>$showTime];
                    setcookie('nowAdmin',serialize($nowAdmin),0);
                    echo 1;
                }else{
                    echo 3;
                }
            }else{
                echo 2;
            }
        }else{
            echo 0;
        }

    }
    //点击注销
    public function outLogin(){
        setcookie('nowAdmin','',time()-1);
        echo 1;
    }

}
?>