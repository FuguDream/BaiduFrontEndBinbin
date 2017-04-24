/**
 * Created by Administrator on 2017/4/16.
 */
(function (window, undefined) {
    window.onload = function () {
        // 待处理队列
        var queue = [];
        // 存放快照
        var shot = [];
        // 定时器
        var timer;

        var leftInput = document.getElementById("leftInput");
        var rightInput = document.getElementById("rightInput");
        var leftOutput = document.getElementById("leftOutput");
        var rightOutput = document.getElementById("rightOutput");
        var randomQueue = document.getElementById("randomQueue");
        var bubbleSort = document.getElementById("bubbleSort");

        var screen = document.getElementById("screen");
        var stage = document.getElementById("stage");

        //插入兄弟节点
        function insertAfter(newElement, targetElement){
            var parent = targetElement.parentNode;
            if (parent.lastChild == targetElement) {
                // 如果最后的节点是目标元素，则直接添加
                parent.appendChild(newElement);
            } else {
                parent.insertBefore(newElement, targetElement.nextSibling);
                //否则插入到目标元素的下一个兄弟节点之前
            }
        }

        //显示每一步变化
        function showStep() {
            timer = setInterval(function () {
                if (shot.length == 0){
                    clearInterval(timer);
                    return;
                }
                var spanA = document.querySelectorAll("#stage div")[shot.shift()];
                var spanB = document.querySelectorAll("#stage div")[shot.shift()];
                var spanACloned = spanA.cloneNode(true);
                var spanBCloned = spanB.cloneNode(true);
                insertAfter(spanACloned,spanB);
                insertAfter(spanBCloned,spanA);
                stage.removeChild(spanA);
                stage.removeChild(spanB);
            },50);
        }

        //将数据可视化显示出来
        function showData() {
            //stage.textContent = queue;
            stage.innerHTML = "";
            var len = queue.length;
            for(let i = 0; i < len; i++){
                let div = document.createElement("div");
                div.className = "orange";
                div.style.height = queue[i]*5 + "px";
                stage.appendChild(div);
            }
        }

        //检测数值是否合理
        function checkData(value) {
            if(queue.length > 60){
                alert("队列元素最多为60个");
                return false;
            }
            if(value < 10 || value > 100){
                alert("输入值范围是0--100");
                return false;
            }
            return true;
        }

        //左侧进入队列
        function unshiftQueue() {
            var value = screen.value;
            if(checkData(value)){
                queue.unshift(value);
                showData();
            }
        }

        //右侧进入队列
        function pushQueue() {
            var value = screen.value;
            if(checkData(value)){
                queue.push(value);
                showData();
            }
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
            if(queue.pop()){
                showData();
            }else {
                alert("队列为空");
            }
        }

        //创建一组随机数据
        function randQueue() {
            queue = [];
            for(let i = 0; i < 40; i++){
                queue.push(10 + Math.floor(Math.random()*91));
            }
            showData();
        }

        //数组元素交换
        function swap(i,j,array){
            var temp = array[j];
            array[j] = array[i];
            array[i] = temp;
        }

        //冒泡排序
        function bubble() {
            shot = [];
            for(let i = 0; i < queue.length; i++){
                let isSwap = false;
                for(let j = 0; j < queue.length - i - 1 ;j++){
                    if(queue[j+1] < queue[j]){
                        shot.push(j, j+1);
                        swap(j,j+1,queue);
                        isSwap = true;
                    }
                }
                if(!isSwap){
                    break;
                }
            }
            showStep();
            //showData();
        }

        leftInput.onclick = unshiftQueue;
        rightInput.onclick = pushQueue;
        leftOutput.onclick = shiftQueue;
        rightOutput.onclick = popQueue;
        randomQueue.onclick = randQueue;
        bubbleSort.onclick = bubble;
    };
})(window);