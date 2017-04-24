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

    function reset() {
        if(shiftedEle){
            shiftedEle.style.backgroundColor = "white";
            showQueue = [];
            clearTimeout(timer);
        }

    }

    function show() {
        shiftedEle = showQueue.shift();
        if(shiftedEle){
            shiftedEle.style.backgroundColor = "blue";
            timer = setTimeout(function () {
                shiftedEle.style.backgroundColor = "white";
                show();
            },500);
        }
    }

    //先序遍历
    function DLRType(node) {
        reset();
        (function DLR(node) {
            if(node){
                showQueue.push(node);
                DLR(node.firstElementChild);
                DLR(node.lastElementChild);
            }
        })(node);
        show();
    }
    
    DLR.onclick = function () {
        DLRType(root);
    };
}