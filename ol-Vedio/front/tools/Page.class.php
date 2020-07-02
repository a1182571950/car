<?php
class Page
{
    private $totalRow;//总条数
    private  $evenyRow;//每页的条数 传递
    private $nowPage;//当前页 GET
    private $starRow;//计算 limit $starRow,
    private $lastPage;//上一页
    private $nextPage;//下一页
    private $totalpage;//总页数

    public function __construct($totalRow,$everyRow)
    {
        $this->totalRow = $totalRow;
        $this->evenyRow = $everyRow;
        $this->nowPage = $_GET['page'];
        //总条数
        $this->starRow = ($this->nowPage-1) * $this->evenyRow;
        //上一页
        $this->lastPage = $this->nowPage>1?$this->nowPage-1:1;
        //总页数
        $this->totalpage = ceil($this->totalRow/$this->evenyRow);
        //下一页 根据总页数来限制
        $this->nextPage = $this->nowPage<$this->totalpage?$this->nowPage+1:$this->totalpage;
    }
    //SQL
    public function getStarRow(){
        return$this->starRow;//私有属性 所以要有一个返回方法
    }
    public function getPageInfo(){
        return  [
            'next'=>(int)$this->nextPage,
            'last'=>(int)$this->lastPage,
            'total'=>(int)$this->totalpage,
            'now'=>(int)$this->nowPage
        ];//需要的分页数据
    }

}
