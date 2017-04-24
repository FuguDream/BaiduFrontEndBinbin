/**
 * Created by Administrator on 2017/4/20.
 */
window.onload = function () {
    //颜色显示队列
    var showQueue= [];
    //当前出队元素
    var shiftedEle;
    //定时器
    var timer;
    //选中的div
    var electee;
    //判断是否是查询按钮
    var isQuery = false;
    //待搜索信息
    var queryInfo;

    var DLR = document.getElementById("DLR");
    var root = document.getElementById("one");
    var query = document.getElementById("query");
    var del = document.getElementById("del");
    var add = document.getElementById("add");
    var ndQueryInfo = document.getElementById("queryInfo");
    var ndAddInfo = document.getElementById("addInfo");

    //重置图形
    function reset() {
        isQuery = false;
        if(electee){
            electee.style.backgroundColor = "white";
            electee = null;
        }
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
            if(shiftedEle == searchedEle && queryInfo == searchedEle.firstChild.nodeValue.trim()){
                shiftedEle.style.backgroundColor = "darkblue";
                queryInfo = null;
                return;
            }
            shiftedEle.style.backgroundColor = "blue";
            timer = setTimeout(function () {
                shiftedEle.style.backgroundColor = "white";
                show();
            },300);
        }else{
            if(isQuery)
            alert(`没有找到搜索项：${queryInfo}`);
            queryInfo = null;
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
        isQuery = true;
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

    //删除功能
    function delnode(node) {
        if(node){
            node.parentNode.removeChild(node);
        }
    }

    //添加功能
    function addnode(node) {
        var addInfo = ndAddInfo.value;
        if(addInfo){
            var div = document.createElement("div");
            div.textContent = addInfo;
            node.appendChild(div)
        }
    }
    
    root.addEventListener("click",function (e) {
        reset();
        e.stopPropagation();
        electee = e.target;
        electee.style.backgroundColor = "dodgerblue";
    });
    
    query.onclick = function () {
        queryInfo = ndQueryInfo.value;
        if(queryInfo){
            queryFun(root, queryInfo);
        }
    }

    del.onclick = function () {
        delnode(electee);
    }

    add.onclick = function () {
        addnode(electee);
    }
}