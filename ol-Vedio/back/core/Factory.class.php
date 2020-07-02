<?php
/**
 * Created by PhpStorm.
 * User: Maibenben
 * Date: 2020/3/23
 * Time: 18:36
 */

class Factory{

    private static $fObj;
    public static function createFactory(){
        if( is_null(self::$fObj) ){
            self::$fObj = new Factory();
        }
        return self::$fObj;
    }
    private function __construct()
    {
        require_once "./core/Model.class.php";      //引入模型层的类（父类）
        require_once "./core/Ctrl.class.php";      //引入控制层的类（父类）
        //魔术方法引入类
        spl_autoload_register( [__CLASS__,"LoadCtrl"] );
        spl_autoload_register( [__CLASS__,"LoadModel"] );
        spl_autoload_register( [__CLASS__,"LoadTool"] );
    }

    //实例化未知类名时候触发
    public function LoadCtrl($className){
        $path = "./Controller/{$className}.class.php";
        if(file_exists($path)){
            require_once $path;
        }
    }
    public function LoadModel($className){
        $path = "./Model/{$className}.class.php";
        if(file_exists($path)){
            require_once $path;
        }
    }
    public function LoadTool($className){
        $path = "./tools/{$className}.class.php";
        if(file_exists($path)){
            require_once $path;
        }else{
            require_once "./view/view404.php";
        }
    }

    public function run(){
        $ctrlName = isset($_GET['ctrl'])? $_GET['ctrl']:'LoginCtrl';
        $do = isset($_GET['do'])? $_GET['do']:'showLogin';

//        if(file_exists("./Controller/{$ctrlName}.class.php")){
//            require_once "./Controller/{$ctrlName}.class.php";
//        }

        $ctrObj = @( new $ctrlName() );      //实例化控制层
        if( method_exists($ctrObj,$do) ){
            $ctrObj->$do();      //存在的话调用do方法
        }else{
            echo "{$do}方法不存在";
        }
    }
}

