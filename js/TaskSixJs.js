/**
 * Created by Administrator on 2017/4/18.
 */
window.onload = function () {
    // 待处理队列
    var queue = [];

    var leftInput = document.getElementById("leftInput");
    var rightInput = document.getElementById("rightInput");
    var leftOutput = document.getElementById("leftOutput");
    var rightOutput = document.getElementById("rightOutput");
    var searchbtn = document.getElementById("searchbtn");

    var screen = document.getElementById("screen");
    var search = document.getElementById("search");
    var stage = document.getElementById("stage");

    //处理批量输入数据
    function batchDateHandle(value){
        var regex = /[\s,，、]+/g;
        return value.split(regex);
    }

    //展示数据
    function showData(){
        stage.innerHTML = "";
        for(let i = 0; i < queue.length; i++){
            var span = document.createElement("span");
            span.className = "red";
            span.textContent = queue[i];
            stage.appendChild(span);
        }
    }

    //左侧进入队列
    function unshiftQueue() {
        var value = screen.value;
        var values = batchDateHandle(value);
        queue.unshift(...values);
        showData();
    }

    //右侧进入队列
    function pushQueue() {
        var value = screen.value;
        var values = batchDateHandle(value);
        queue.push(...values);
        showData();
    }

    //左侧移出队列
    function shiftQueue() {
        if(queue.shift()){
            showData();
        }else {
            alert("队列为空");
        }
    }

    //右侧移出队列
    function popQueue() {
        if (queue.pop()) {
            showData();
        } else {
            alert("队列为空");
        }
    }
    
    function searchQueue() {
        showData();
        var searchInfo = search.value;
        var regex = new RegExp(searchInfo, "");
        for(let i = 0; i < queue.length; i++){
            if(regex.test(queue[i])){
                var span = document.querySelectorAll("#stage span")[i];
                span.style.backgroundColor = "orangered";
            }
        }
    }

    leftInput.onclick = unshiftQueue;
    rightInput.onclick = pushQueue;
    leftOutput.onclick = shiftQueue;
    rightOutput.onclick = popQueue;
    searchbtn.onclick = searchQueue;
}
