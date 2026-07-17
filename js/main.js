let area = document.querySelector('.area-wrapper');
let newBodySegment;
let flyMouseInner;
let flyMouse;
let score = 0;
const scoreDOM = document.querySelector('.snake__score-number')
const contentWrapper = document.getElementById('content');
const modalResult = document.querySelector('.modal-result-wrapper');
const overlay = document.getElementById('overlay');
const btnStart = document.querySelector('.startGame');
const snake = document.querySelector('.snake');
const snakeHead = document.querySelector('.snake__head');
const snakeHeadInner = document.querySelector('.snake__headWrapper');
const snakeSecond = document.querySelector('.snake__body-crocodily');
const snakeSegments = snake.querySelectorAll('.snake__body');
let firstPause = false;
let snakeArray = []
let X, Y;
let firstMove = true;
let snakeLength = snakeArray.length;
let cycleGame = false;
let positionX = 0;
let positionY = 0;
let incrementX = 25;
let rotX, rotY;
const snakeSize = 25;
let positionXhead = 175;
let positionYhead = 50;

snakeHead.style.top = positionYhead
snakeHead.style.left = positionXhead

snakeHead.style.transform = 'rotate(90deg)'

    snakeSegments.forEach((item, index)=>{
        
        snakeArray.push(item)
        
    })

console.log(snakeArray)
let direction = 'R';
let keyPress = '';
snakeSegments.forEach((item, index) =>{
	item.style.left = `${positionXhead - (index * 25)}px`
	item.style.top = `${positionYhead}px`
})



const closeModal = () => {
 
    modalResult.classList.add("hidden");
 
    clearInterval(intervalBegin);
 
    cycleGame = true;
 
    moveSnake(score);
 
};


let intervalBegin;
let intervalHead;

function moveDown(head){
    segmentHeadY = head.style.top
    segmentHeadY = parseInt(segmentHeadY.match(/\d+/))
    segmentHeadY += 25
    head.style.top = `${segmentHeadY}px`;
    
}

function moveUp(head){
    segmentHeadY = head.style.top
    segmentHeadY = parseInt(segmentHeadY.match(/\d+/))
    segmentHeadY -= 25
    head.style.top = `${segmentHeadY}px`;
}
function moveLeft(head){
    segmentHeadX = head.style.left
    segmentHeadX = parseInt(segmentHeadX.match(/\d+/))
    segmentHeadX -= 25
    /*
    if(segmentHeadX <= 0){
        //segmentHeadX -= 25
        if(segmentHeadX == leftBorder){
            prepareResult(score)
        }
        head.style.left = `${segmentHeadX}px`;
        
    }else{
        
    }
    */
    head.style.left = `${segmentHeadX}px`;
    
    
}


function setColor(element){
	const color = getRandomColor();
	
	element.style.background = color;

}

function moveRight(head, score){
    
    segmentHeadX = head.style.left 
    segmentHeadX = parseInt(segmentHeadX.match(/\d+/))
    segmentHeadX += 25
    head.style.left = `${segmentHeadX}px`;
    //console.log(segmentHeadX, rightBorder)
    
}
const createSegment =(snakeHead)=>{
    firstMove = false
    //newBodySegment = document.createElement('div')
    //newBodySegment.classList.add('snake__segment', 'snake__body')
    snakeSecond.classList.add('snake__body-crocodily--visible')
    
    
}
function getRandomNumber(min, max) {
    // Округляем min и max до ближайших значений, кратных 25
    min = Math.ceil(min / 25) * 25; // Округляем вверх
    max = Math.floor(max / 25) * 25; // Округляем вниз
  
    // Генерируем случайное число кратное 25
    return Math.floor(Math.random() * ((max - min) / 25 + 1)) * 25 + min;
}
function createRandomFood(){
	flyMouseInner = document.createElement('div');
    flyMouse = document.createElement('img');
    
    function getRandom1or2() {
        return Math.floor(Math.random() * 2) + 1;  // Умножаем на 2 и добавляем 1
    }
    
    // Пример использования
    const randomNum = getRandom1or2();
    if(randomNum === 1){
        flyMouse.src="images/flyMouse.gif"
    }else{
        flyMouse.src="images/apple.png"
    }
	const size = 25
	const {width, height} = area.getBoundingClientRect();
	X = Math.floor(getRandomNumber(0, width - 25)/ 25)*25;
	Y = Math.floor(getRandomNumber(0, width - 25)/ 25)*25;
	Y = 25 + Y
    if(Y >= 275){
        Y = Y - 250
    }
	flyMouseInner.classList.add('food');
	flyMouse.style.width =`${size}px`;
	flyMouse.style.height =`${size}px`;
	flyMouseInner.style.top = `${Y}px`;
	flyMouseInner.style.left = `${X}px`;

	
	area.append(flyMouseInner)
    flyMouseInner.append(flyMouse)
    
}
const createSegmentIntheEndSnake=(snakeHead)=>{
    const headRect = snakeHead.getBoundingClientRect();
    const snakeRect = snakeSecond.getBoundingClientRect();
    const newBodysnakeSegment = document.createElement('div')
    newBodysnakeSegment.classList.add('snake__segment', 'snake__body', 'snake__body--eating')
    setTimeout(()=>{
        newBodysnakeSegment.classList.add('snake__body--eatingVisible')
    }, 300)
    //newBodysnakeSegment.style.left = `${(headRect.x - snakeRect.x)}px`
    //newBodysnakeSegment.style.top = `${headRect.y - snakeRect.y}px`
    snakeArray.push(newBodysnakeSegment)
    snake.append(newBodysnakeSegment)

}
const examinationOnFoodEating =(score, X, Y) =>{
    let snakeHeadXposition = snakeHead.style.left
    
    snakeHeadXposition = parseInt(snakeHeadXposition.match(/\d+/))
    let snakeHeadYposition = snakeHead.style.top
    snakeHeadYposition = parseInt(snakeHeadYposition.match(/\d+/))
    
    if(snakeHeadXposition === X && snakeHeadYposition === Y){
        
        
        createSegmentIntheEndSnake(snakeHead)
        flyMouseInner.remove()
        createRandomFood(score)
        score += 1
        
        
    }
    return {score, snakeHeadXposition, snakeHeadYposition}    
}
const prepareResult = (score, intervalBegin) =>{
    modalResult.classList.remove('hidden');
    contentWrapper.textContent = 'Game over! \nScore: ' + score;
	
    
    contentWrapper.style.fontSize = '24px'
    btnStart.textContent = 'Начать новую игру'
    btnStart.addEventListener('click',()=>{
        
        
        location.reload();
        //modalResult.classList.add('hidden');
    })
    cycleGame = false
    
}
const examinationOnCollision=(positionHeadX, positionHeadY, score, intervalBegin)=>{
    positionHeadX = parseInt(positionHeadX.match(/\d+/))
    positionHeadY = parseInt(positionHeadY.match(/\d+/))
       
    for(let i = 2; i < snakeArray.length; i++){
         
        let positionSegmentX = snakeArray[i].style.left
        let positionSegmentY = snakeArray[i].style.top
        positionSegmentX = parseInt(positionSegmentX.match(/\d+/))
        positionSegmentY = parseInt(positionSegmentY.match(/\d+/))
        //console.log(positionSegmentX, positionSegmentY)
        if(positionHeadX != 25 && positionHeadX != 0 && ((positionHeadX === positionSegmentX && positionHeadY === positionSegmentY)&&snakeArray.length>5)){
                console.log(snakeArray[i])
                prepareResult(score, intervalBegin);
                snakeArray[i].style.background = 'red'
                //console.log(`Collision detected with segment ${i}: (${positionSegmentX}, ${positionSegmentY})`);
                
                break;
        }
        
    }
    
}
const checkBorder = (head) => {

    const field = area.getBoundingClientRect();

    const x = parseInt(head.style.left);
    const y = parseInt(head.style.top);

    if(
        x < 0 ||
        y < 0 ||
        x >= field.width - snakeSize ||
        y >= field.height - snakeSize
    ){

        prepareResult(score, intervalBegin);

    }

};
document.addEventListener('keydown',e=>{
    if(e.key === "Escape"){
        cycleGame = false;
        modalResult.classList.remove('hidden');
        contentWrapper.textContent = "Игра приостановлена";
        btnStart.textContent = "Продолжить";
        firstPause = true
        
        btnStart.addEventListener('click',()=>{
            clearInterval(intervalBegin)
            
            moveSnake(score)
            modalResult.classList.add('hidden');
        })
        clearInterval(intervalBegin)            
    }else if(e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
        e.preventDefault()
        keyPress = e.key  

    }
    
});
const moveSnake = (score) => {
    console.log("змея ЛЕТИ")
    if(!firstPause){
        createRandomFood();
        
    }
    
    

    intervalBegin = setInterval(()=>{
        let segmentX;
            let segmentY;
        
        const logicMove = (prevX, prevY, score, intervalBegin) =>{
            snakeArray.forEach((el, i) =>{
                snakeLength = snakeArray.length;
                currentX = el.style.left;
                currentY = el.style.top;
                el.style.left = prevX;
                el.style.top = prevY;
                prevX = currentX;
                prevY = currentY; 
                
                if(i === 0){
                    console.log(snakeArray, currentX, currentY)
                    examinationOnCollision(currentX, currentY, score, intervalBegin)
                }

                
            })
            
           
            
        }
        if(cycleGame){
            
            
            
            //snakeHead.style.left = `${snakeHead.style.left + 25}px`;
            let prevX = snakeHead.style.left;
            let prevY = snakeHead.style.top;

            let prev2X, prev2Y;
            let mapingObject = examinationOnFoodEating(score, X, Y)
            score = mapingObject.score;
            logicMove(prevX, prevY, score, intervalBegin) 
            
            checkBorder(snakeHead)
            
            
            scoreDOM.innerHTML=`${score}`
            snakeSegments.forEach((item,index)=>{
                
                //const {width, height} = item.getBoundingClientRect();
                
                
                // Save the current coordinates of the snake's head
                let segmentHeadX, segmentHeadY;
                
                // Movement of the snake's head depending on the direction
                if(index === 0 ){
                   
                    
                    switch (keyPress) {
                        

                        case 'ArrowUp':

                            if(direction !== 'D'){

                                if(firstMove === true){
                                    createSegment(item)
                                }

                                moveUp(item);

                                item.style.transform = 'rotate(360deg)';
                                direction = 'U';
                            }

                            break;
                        case 'ArrowDown':

                            if(direction !== 'U'){
                        
                                if(firstMove === true){
                                    createSegment(item)
                                }
                        
                                moveDown(item);
                        
                                item.style.transform = 'rotate(180deg)';
                                direction = 'D';
                            }
                        
                        break;
                        case 'ArrowLeft':
                                if(firstMove === true){
                                    
                                    createSegment(item)
                                }
                                if(direction != 'Rr'){
                                    moveLeft(item)
                                    item.style.transform = 'rotate(270deg)'
                                    direction = 'L'
                                }else if (direction == 'Rr') {
                                    moveRight(item, score)
                                }
                                break;
                        case 'ArrowRight':
                                
                                if(firstMove == true){
                                    createSegment(item)
                                    
                                }    
                                    //
                                    
                                   // 
                                
                                if(direction != 'L'){
                                    moveRight(item, score)
                                    item.style.transform = 'rotate(450deg)'
                                    direction = 'Rr'
                                }else if (direction == 'L') {
                                    moveLeft(item)
                                }
                                break;
                    }
                }else{
                    if (direction == 'R') {
                        segmentX = item.style.left
                        segmentX = parseInt(segmentX.match(/\d+/))
                        item.style.left = `${segmentX + incrementX}px`
                            
                    }
                }
            
                
            })               
          }
            

    }, 300)
    
}

document.querySelectorAll(".mobile-controls button").forEach(btn => {
 
    btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyPress = btn.dataset.dir;
    }, { passive: false });
 
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        keyPress = btn.dataset.dir;
    });
 
});
const initGame =() => {
    
    
    moveSnake(score);
    

}
btnStart.addEventListener('click', closeModal);

