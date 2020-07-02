<?php
class Ctrl{
    public function __construct()
    {
        if( !session_id() ){
            session_start();
        }
    }

    //显示界面
    public function showView($viewName){
        //验证是否登录
        if(!isset($_COOKIE['nowAdmin'])){
            require "./View/adminLogin.php";
            return;
        }
        //检查文件夹是否存在
        $viewPath = "./View/{$viewName}.php";
        if(file_exists($viewPath)){
            require_once $viewPath;
        }else{
            require_once "./View/view404.php";
        }

    }
    //返回数据到前端
    public function ajaxSend($data=[],$code=1,$msg="success"){
        $ajaxData = [
            "data"=>$data,
            "code"=>$code,
            "msg"=>$msg
        ];
        $res = json_encode($ajaxData,JSON_UNESCAPED_UNICODE);
        return $res;
    }
}
