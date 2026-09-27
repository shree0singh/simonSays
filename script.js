//variable
let correctOrder = [];
let firstTime;
let index = 0;
let userScore;
let highScore = 0;
let gameStarted = false;

//global HTML elements
const startGameBtn = document.querySelector(".new_game_button");
const boxParent = document.querySelector(".box_container");
const startInstruction = document.querySelector(".start_instruction");
const scoreArea = document.querySelector('.score_area');
const yourScore = document.querySelector('.the_score');
const theHighScore = document.querySelector('.the_high_score');
const gameOverElem = document.querySelector('.game_over');




function pageRefresh() {
    //this is function will run when the page is refreshed
    console.log('inside page refresh');
    highScore = 0;
    gameOverElem.classList.add('hidden');
    scoreArea.classList.add('hidden');
}
pageRefresh();


function startGame() {
    gameStarted = true;
    firstTime = true;
    userScore = 0;
    gameOverElem.classList.add('hidden');
    yourScore.innerHTML = userScore;
    theHighScore.innerHTML = highScore;
    scoreArea.classList.remove('hidden');
    console.log("game_started");
    correctOrder = [];
    startInstruction.classList.remove("hidden");
    index = 0;

}

function userActivity(event){
    const boxContainer = document.querySelector('.box_container');
    if(gameStarted && event.target && boxParent.contains(event.target)){
        const boxClicked = event.target;
        // const boxClass = boxClicked.classList[0];
        
        if (firstTime) {
            console.log("inside if");
            console.log("went to blink")
            blink(boxClicked);
            console.log("came from blink")
            startInstruction.classList.add('hidden');
            addCorrectOrder(boxClicked);
            firstTime = false;
        }
        else {
            console.log("inside else")
            blink(boxClicked);
            crossCheck(boxClicked);
        }
    }
}

function blink(box) {
    box.classList.add("no_color");
    setTimeout(function () {
        box.classList.remove("no_color");
    }, 200);
}


function addCorrectOrder(box) {
    
    correctOrder.push(box);

    blink(box);

}

function new_box() {
    // index = 0;
    const id = Math.ceil(Math.random() * 4);
    let element;
    switch (id){
        case 1:
            element = document.querySelector('.red');
            break;
        case 2:
            element = document.querySelector('.blue');
            break;
        case 3:
            element = document.querySelector('.green');
            break;
        case 4:
            element = document.querySelector('.yellow');
            break;
    }
    addCorrectOrder(element);
}

function gameOver(){
    gameStarted = false;
    gameOverElem.classList.remove('hidden');
    //game over functions

}

function levelUp(){
    userScore++;
    highScore = Math.max(userScore, highScore);
    console.log(userScore, highScore);
    index = 0;
    new_box();
    yourScore.innerHTML = userScore;
    theHighScore.innerHTML = highScore;
    //levelUp functions for displaying current score
}

function crossCheck(userInput){
    if(userInput != correctOrder[index])
    {
        gameOver();
        return;
    }
    index++;
    if(index == correctOrder.length){
        setTimeout(() => {
            levelUp();
        }, 400);
    }
}



//global eventListners
startGameBtn.addEventListener("click", startGame);
boxParent.addEventListener("click", userActivity);
