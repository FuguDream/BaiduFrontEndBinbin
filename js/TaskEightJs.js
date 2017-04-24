/**
 * Created by Administrator on 2017/4/20.
 */
window.onload = function () {
    //颜色显示队列
    var showQueue= [];
    //当前出队元素
    var shiftedEle;
    var timer;

    var DLR = document.getElementById("DLR");
    var root = document.getElementById("one");
    var query = document.getElementById("query");
    var ndQueryInfo = document.getElementById("queryInfo");

    function reset() {
        if(shiftedEle){
            shiftedEle.style.backgroundColor = "white";
            showQueue = [];
            clearTimeout(timer);
        }

    }

    //绘制出展示过程
    function show() {
        //查询到的元素
        var searchedEle = showQueue[showQueue.length-1];
        shiftedEle = showQueue.shift();
        if(shiftedEle){
            if(shiftedEle == searchedEle && ndQueryInfo.value == searchedEle.firstChild.nodeValue.trim()){
                shiftedEle.style.backgroundColor = "darkblue";
                return;
            }
            shiftedEle.style.backgroundColor = "blue";
            timer = setTimeout(function () {
                shiftedEle.style.backgroundColor = "white";
                show();
            },300);
        }else{
            alert("没有找到搜索项");
        }
    }

    //先序遍历
    function DLRType(node) {
        reset();
        (function DLR(node) {
            if(node){
                showQueue.push(node);
                for(let i = 0; i < node.children.length; i++){
                    DLR(node.children[i]);
                }
            }
        })(node);
        show();
    }

    //查询功能
    function queryFun(node,queryInfo) {
        reset();
        var searched = false;
            (function DLR(node) {
                if(node){
                    showQueue.push(node);
                    //找到搜索项就终止遍历
                    if(queryInfo == node.firstChild.nodeValue.trim()){
                        searched = true;
                    }
                    for(let i = 0; i < node.children.length; i++){
                        if(searched){
                            break;
                        }
                        DLR(node.children[i]);
                    }
                }
            })(node);
        show();
    }
    
    DLR.onclick = function () {
        DLRType(root);
    };
    
    query.onclick = function () {
        var queryInfo = ndQueryInfo.value;
        if(queryInfo){
            queryFun(root, queryInfo);
        }
    }
}