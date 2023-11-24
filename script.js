const container = document.querySelector('.container');
const start = document.querySelector('#start');
// const pause = document.querySelector('#pause');
const score = document.querySelector('#score');
const timeLeft = document.querySelector('#time-left');
let timer;
let point = 0;
// 困難度
let level = 2
// 透明度
let opacity = 0.6;
// 錯誤次數
let err = 0;

start.addEventListener( 'click', () => {
    // 按下start 按鈕後，等級、透明度、錯誤次數也要重設
    let time = 20;
    point = 0;
    level = 2;
    opacity = 0.6
    err = 0;
    timeLeft.innerHTML = '剩餘時間：' + time;
    score.innerHTML = '分數：' + point;
    //清除計時器，避免每點擊一次就增加一次計數器，造成bug
    clearInterval(timer);
    
    // 設定倒數計時器
    timer = setInterval( () => {
        time--;
        timeLeft.innerHTML = '剩餘時間：' + time;
        if (time == 0) {
            // 時間計時結束
            clearInterval(timer);
            // 清空畫面
            container.innerHTML = '';
            // 提示遊戲結束並顯示分數
            alert('時間到，你的分數為' + point);
        }
    }, 1000);

    startGame();
});

// pause.addEventListener('click', () => {
//     let flag = 1
//     if ( flag == 1 ) {
//         clearInterval(timer);
//         flag = 0;
//         console.log(flag);
//     }else if ( flag == 0 ){
//         setInterval(timer);
//         flag = 1
//         console.log(flag);
//     }
// });

// box的尺寸大小公式，求出一邊個尺寸就行
function boxWidth(level){
    return ((700 - (level * 20))/level);
};
// function boxHeight(level){
//     return ((700 - (level * 20))/level);
// };

function startGame(){
    // 產生隨機亂數，注意方法的括號不要忘了加上
    // Math.random()因為是隨機給予0.1~0.9之間的數字，乘上一個數字，可以讓隨機的數字介於在該數字的範圍內
    let ans = Math.floor(Math.random() * (level ** 2));
    // console.log(ans);

    // 清空上一次的方塊，不然會累積在畫面上
    container.innerHTML = '';

    // 用js隨機亂數產生RGB 顏色
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // 增加container 的寬度，以容納更多方塊
    // container.style.width = (level * 106) + 'px';

    // 產生方塊
    for (let index = 0; index < (level ** 2); index++) {
        if (index == ans){
            container.innerHTML += '<div class="box" style="width:'+ boxWidth(level) +'px; height:'+ boxWidth(level) +'px;background-color: rgb('+ r +', '+ g +', '+ b +'); opacity:' + opacity +';"></div>';
        }else{
            container.innerHTML += '<div class="box" style="width:'+ boxWidth(level) +'px; height:'+ boxWidth(level) +'px; background-color: rgb('+ r +', '+ g +', '+ b +');"></div>';
            // 用樣板字樣的方式
            // container.innerHTML += `<div class="box" style="background-color: rgb(${r},$(g),$(b));"></div>`;
        }
    }
    // const box = document.querySelector('.box');
    // box.style.width = ((700-(level*20))/level + 1) +'px';
    // box.style.hight = ((700-(level*20))/level + 1) +'px';
    // console.log(hight);
    // 當點擊到正確答案
    const blocks = document.querySelectorAll('.box');
    for (let index = 0; index < (level ** 2); index++) {
        if (index == ans){
            // blocks 因為是 array 所以要加上index 當索引值，才能找到指定的對象
            blocks[index].addEventListener('click', () => {
                point++;
                score.innerHTML = '分數：' + point;
                //分數達到一個程度，可以上升或下降一個等級
                if ( point <= 2){
                    level = 2;
                }else if( point <= 6){
                    level = 3;
                }else if( point <= 9){
                    level = 4;
                    opacity = 0.7;
                }else if( point <= 12){
                    level = 5;
                }else if( point <= 15){
                    level = 6;
                    opacity = 0.8;
                }else{
                    level = 8;
                }
                startGame(); 
            });
        }else{
            blocks[index].addEventListener('click', () =>{
                // 錯誤三次，遊戲提前結束，計算的次數要在判斷式前，因為超過三次就會停止
                // 如果放在判斷式後，會完成四次錯誤，才會停止程式
                err ++;
                if ( err < 3){
                    alert('再猜看看！');
                    point--;
                    score.innerHTML = '分數：' + point;
                    if ( point <= 2){
                        level = 2;
                    }else if( point <= 6){
                        level = 3;
                    }else if( point <= 9){
                        level = 4;
                        opacity = 0.7;
                    }else if( point <= 12){
                        level = 5;
                    }else if( point <= 15){
                        level = 6;
                        opacity = 0.8;
                    }else{
                        level = 8;
                    }
                    startGame();   

                }else{
                    clearInterval(timer);
                    container.innerHTML = '';
                    alert('錯誤三次，遊戲提前結束，你的分數為' + point);
                }
            });
        }
    }
}