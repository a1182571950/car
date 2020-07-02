/**
 * 
 * @param {*} obj 
 * pagination(obj)  JQ分页插件
 * 作者：陈建林
 * 时间：2020-1-11
 * 
 * demo
 * 
 * html : <div id="demo"></div>
 * 
 * js : $('#demo').pagination({
 *      total   : 100,       //必填，数据总共有多少条
 *      doPaging :  function(page,perPage){}, //必填，点击分页后的回调.改回调有2个参数，分别是当前页码和每页数量
 *      perPage: 10 ,   //可选， 每页显示多少条记录, 默认10
 *      showPages : 7 , //可选，总共要显示多少个页码。 默认7
 *      isShowFirstPage : false, //可选，是否显示首页按钮 默认 false
 *      isShowLastPage ： false, //可选，是否显示最后页按钮 默认 false  
 *      isShowTotalNum : false, //可选，是否显示全部数量 默认 false
 *      isShowPageItems : true, //可选，是否显示分页按钮 默认 true
 *      isShowPrev : true,     //可选，是否显示上一页按钮 默认 true
 *      isShowNext :true ,     //可选，是否显示下一页按钮 默认 true
 *      isShowSelect : true    //可选，是否显示页码选择器 默认 true
 * })
 * 
 */
function pagination(obj){
    'use strict';
    var $ = jQuery;
    if(typeof $ !== 'function') throw new Error('分页插件: 本插件依赖于jQuery');
    var dom = $(this).eq(0);
    if(! dom.length)  throw new Error('分页插件：节点'+ dom.prevObject.selector +'不存在');
    if(!obj || !obj.total) throw new Error('分页插件：total属性必须');
  //  if(!obj || !obj.perPage) return console.error('perPage属性必须');
    if(!obj || !obj.doPaging || typeof obj.doPaging !== 'function')  throw new Error('分页插件：doPaging 属性必须是一个函数');  
    
    var     ul = $('<ul class="pagination"></ul>'),
        t = obj.total,
        n = obj.perPage || 10,
        ps = Math.ceil(t/n),
        s = obj.showPages || 7,
        c = 1,
        cb = obj.doPaging,
        IS_SHOW_FIRST_PAGE = obj.isShowFirstPage || false,
        IS_SHOW_LAST_PAGE = obj.isShowLastPage || false,
        IS_SHOW_TOTAL_NUM = obj.isShowTotalNum || false,
        IS_SHOW_PAGE_ITEM = obj.isShowPageItems ===  false ? false : true,
        IS_SHOW_PREV_PAGE = obj.isShowPrev === false ? false : true,
        IS_SHOW_NEXT_PAGE = obj.isShowNext === false ? false : true,
        IS_SHOW_SELECT_ITEM = obj.isShowSelect === false ? false : true
    createPages();
    function createPages(){
        if(ps < 2) return dom.empty();
        ul.empty();
        if(IS_SHOW_FIRST_PAGE) ul.append(htmlFirstPage());
        if(IS_SHOW_PREV_PAGE) ul.append(htmlPrev());
        if(IS_SHOW_PAGE_ITEM) ul.append(htmlLi());
        if(IS_SHOW_NEXT_PAGE) ul.append(htmlNext());
        if(IS_SHOW_SELECT_ITEM)ul.append(htmlSelect())
        if(IS_SHOW_LAST_PAGE) ul.append(htmlLastPage());
        if(IS_SHOW_TOTAL_NUM) ul.append(htmlTotalNum());
        dom.empty().append(ul);
        cb(c,n);
    }



    function createPageArr(){
        var a = [c] , i = 1;
        while(a.length < s  && a.length < ps){
            if( c - i > 0  ) a.push(c-i);
            if( c + i <= ps ) a.push(c+i);
            i++;
        }
        a.sort(function(a,b){ return a-b});
        return a;
    }

    function htmlLi(){
        var li = '',a = createPageArr();
     //   console.log(a);
        a.forEach(function(v){
            li += `<li class="${v==c ? 'active' : 'page'}" ><a href="###" page="${v}">${v}</a></li>`
        });
        return li;
    }


    //上一页
    function htmlPrev(){
        return $(`<li class="${c > 1 ? 'prev-page' : 'disabled'}"><a href="###">上一页</a></li>`)
    }
    //下一页
    function htmlNext(){
        return $(`<li class="${c < ps ? 'next-page' : 'disabled'}"><a href="###">下一页</a></li>`)
    }

    //最后一页
    function htmlFirstPage(){
        return $(`<li class="${c > 1 ? 'first-page' : 'disabled'}"><a href="###">首页</a></li>`)
    }

    //第一页
    function htmlLastPage(){
        return $(`<li class="${c < ps ? 'last-page' : 'disabled'}"><a href="###">最后页</a></li>`)
    }

    function htmlTotalNum(){
        return $(`<li class="disabled">  <a href="###">${c}/${ps}</a></li>`);
    }

    function htmlSelect(){
        var li = $('<li></li>'),
            select = $('<select class="select-page"></select>');
        
        for(var i = 1 ; i <= ps ; i++){
            select.append(`<option value="${i}"  ${ i==c ? 'selected disabled' : '' } >${i}</option>`);
        };
        li.append(select);
        return li;
    }

    dom.on('click','li.page',function(){
        c = +$(this).find('a').attr('page');createPages();
    }).on('click','li.prev-page',function(){
        c --;createPages();
    }).on('click','li.next-page',function(){
        c ++;createPages();
    }).on('click','li.first-page',function(){
        c = 1; createPages();
    }).on('click','li.last-page',function(){
        c = ps;createPages();
    }).on('change','.select-page',function(){
        c = +$(this).val();
        createPages();
    });


    /**CSS代码 */  
var css = ` 
.pagination{display:inline-block;padding-left:0;margin:20px 0;border-radius:4px;font-size:14px;}
.pagination li{display:inline;}
.pagination .active a{z-index:3;color:#fff;cursor:default;background-color:#337ab7;border-color:#337ab7;}
.pagination > li > a{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#337ab7;text-decoration:none;background-color:#fff;border:1px solid #ddd;}
.pagination .select-page{border-left:none;border-color:#ccc;height:34px;padding-left:5px;float:left;cursor:pointer;text-align:center;color:#333}
.pagination > li:first-child > a{margin-left:0;border-top-left-radius:4px;border-bottom-left-radius:4px;}
.pagination > li:last-child > a{border-top-right-radius:4px;border-bottom-right-radius:4px;}
.pagination > .disabled > a,.pagination > .disabled > a:focus,.pagination > .disabled > a:hover{color:#777;cursor:not-allowed;background-color:#fff;border-color:#ddd;}
`,
    style = $('<style name="pagination"></style>');
    if( !$('style[name="pagination"]').length )$('head').append(style.html(css))    
}

try{
    if(typeof $ === 'undefined' && typeof jQuery === 'undefined')  throw new Error('分页插件：本插件依赖于jQuery'); 
    jQuery.prototype.pagination = pagination;
}catch(e){
    console.error(e);
}