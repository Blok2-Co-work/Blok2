// declaraties voor spel
let board = new Array();
let score = 0;
let highScore = 0;
let rows;
let columns;
let generateWithTime = new Boolean(true);

//declaraties other elements
const sectionGameRunning = document.querySelector('.gameRunning')
const changeBoardSizeP = document.querySelector(".changeBoardSizeP")
const changeBoardSizeClass = document.querySelector(".changeBoardSize")
const theGameClass = document.querySelector(".theGame")
const highScoreClass = document.querySelector(".highScore")
const highScoreID = document.querySelector("#highscore")
const scoreClass = document.querySelector(".score")
const introClass = document.querySelector(".intro")
const rowSelectorID = document.querySelector("#rowSelector")
const resultID = document.querySelector("#result")
const extra2P = document.querySelector(".extra2P")

//declaraties van buttons
const buttonTryAgain = document.querySelector('.try_again')
const buttonUploadScore = document.querySelector('.uploadScore')
const buttonVoorBoardSize = document.querySelector(".changeBoardSize")
const buttonStart = document.getElementById("buttonForAmount")
const buttonGenerate2 = document.querySelector(".generate2")

//declaraties voor form
const username = document.querySelector('input[name="username"]');
const errusername = document.querySelector('#username-valid');
const form = document.querySelector('form');

//form voor username
console.log(form);
form.addEventListener("submit", e => {
    
    e.preventDefault();

    console.log("form was send but page did not reload yet");
    const isValid = validateForm();
    if(isValid) {
        console.log('form is valid');

        form.style.display = 'none';
        sectionGameRunning.style.visibility = 'visible';

        resetErrors();   
        
    }else {
        console.warn('Form is invalid');
    }

    resetFrom();

})

const validateForm = () => {
    let isValid = true;

    if (username.value === ''){
        setError(errusername,'fill in username')
        isValid = false;
        console.log('username passed')
    }

    return isValid;
};

const resetErrors = () => {
    errusername.style.display = 'none';
}

const resetFrom = () => {
    username.value = '';
}
const setError = (element, message) => {
    element.style.display = 'block';
    element.innerText = message;
}

//----------------------------------------

//send the score to api

function uploadScore(){
    console.log('upload de score')
    //temporary commented cuz no api

        // const asyncFunc1 = async () =>{
        //     const data =  {
        //         //id : null, niet nodig
        //         username : username.value,
        //         score : score.value,
        //         boardSize : boardSize.value,
        //     }

        //     console.log(data);

        //     const wait = await fetch('https://2048/Leaderboards', {
        //         method: "POST",
        //         headers: {        
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },

        //     body: JSON.stringify(data)
            
        //     });

        //     if (wait.ok){
        //         const content = await wait.json();
        //         console.log(content);

        //         //this is a temporary skip cuz no api



        //         //redirect here 
        //         if (content.status === 'succes : '){
        //             window.location.href = '../skinLeaderboards/'
        //         }
        //     }else{
        //         console.log(wait.statusText);

        //     }
        // }
        // asyncFunc1();
}


//----------------------------------------

buttonGenerate2.addEventListener("click", function(){
    if (!generateWithTime) {
        generateWithTime = true;
        buttonGenerate2.innerHTML = "speel zonder extra 2's";
        extra2P.style.display = "block"

    }
    else{
        generateWithTime = false;
        buttonGenerate2.innerHTML = "speel met extra 2's";
        extra2P.style.display = "none"
    }

})


buttonStart.addEventListener("click", function(){

    buttonVoorBoardSize.style.visibility = "hidden";
    changeBoardSizeClass.style.visibility = "hidden";
    changeBoardSizeP.style.visibility = "hidden";

    highScoreClass.style.color = "var(--primairy)"
    score = 0;
    document.getElementById("score").innerHTML = score;
    //make a new board
    const newBoard = document.createElement("div");
    newBoard.setAttribute("id", "board");
    //append the new board to theGame div
    theGameClass.appendChild(newBoard);

    //highScoreClass.style.marginBottom = "10rem"
    //highScoreClass.style.marginTop = "-9rem"

    this.style.visibility = "hidden";
    buttonAmountFunc();
    document.getElementById("board").style.visibility = "visible"
    rowSelectorID.style.visibility = "hidden"

    scoreClass.style.visibility = "visible"
    //introClass.style.visibility = "hidden"
    buttonGenerate2.style.display = "none"
    setGame();
    //disable arrow keys
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
})

buttonVoorBoardSize.addEventListener("click", function() {
    highScore = 0;

    highScoreID.innerHTML = "";

    rowSelectorID.style.visibility = "visible";
    rowSelectorID.style.position = "relative";
    rowSelectorID.style.marginLeft = "auto";
    rowSelectorID.style.marginRight = "auto";

    this.style.visibility = "hidden";
    changeBoardSizeP.style.visibility = "hidden";
    buttonStart.style.marginTop = "1rem";
    buttonGenerate2.style.display = "block";
})

//try again when game is over
buttonTryAgain.addEventListener("click", function(){

    highScoreClass.style.marginBottom = "1rem"
    this.style.visibility = "hidden";
    buttonUploadScore.style.visibility = "hidden";

    changeBoardSizeClass.style.visibility = "visible";
    changeBoardSizeClass.style.display = "flex"
    changeBoardSizeClass.style.marginTop = "4rem";

    changeBoardSizeP.style.visibility = "visible";
    changeBoardSizeP.style.margintop = "2rem";

    buttonStart.textContent = "Play Again !";
    //buttonStart.style.marginLeft = "auto";
    //buttonStart.style.marginTop = "2rem";
    //buttonStart.style.marginBottom = "0";

    //buttonStart.style.marginRight = "auto";
    buttonStart.style.display = "flex";
    buttonStart.style.marginTop = "-4rem"
    buttonStart.style.visibility = "visible";
    
    buttonAmountFunc();
    // document.getElementById("rowSelector").style.visibility = "visible";
    scoreClass.style.visibility = "hidden"
    // document.querySelector(".intro").style.visibility = "visible"
    resultID.innerHTML = "";
    document.getElementById("board").remove();
})

function buttonAmountFunc(){
    rowAndColumnAmount = document.getElementById('rowSelector').value;
    rows = rowAndColumnAmount;
    columns = rowAndColumnAmount;
    console.log(rows);
}

function setGame() {
    //create board
    for (let i = 0; i < rows; i++) {
       board[i]=new Array();
       for (let j = 0; j < columns; j++) {
           board[i][j] = 0;
       } 
    }
    console.log(board);

    boardSize = rows * 100;
    document.getElementById("board").style.width = boardSize + "px";
    document.getElementById("board").style.height = boardSize + "px";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //create 2 to begin the game
    setTwo();
    setTwo();
    document.addEventListener('keyup',control)

}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

//assign keycodes
function control(e){
    if (e.keyCode === 39) {
        keyRight()
        console.log("right key pressed")
    }else if (e.keyCode === 37) {
        keyLeft()
        console.log("left key pressed")
    }else if (e.keyCode === 38) {
        keyUP()
        console.log("up key pressed")
    }else if (e.keyCode === 40) {
        keyDown()
        console.log("down key pressed")
    }
}


function keyRight(){
    slideRight();
    setTwo();
    cantUpdateTileRow();
    cantUpdateTileCol();
    checkForGameOver();
    
}

function keyLeft(){
    slideLeft();
    setTwo();
    cantUpdateTileRow();
    cantUpdateTileCol();
    checkForGameOver();
  
}

function keyDown(){
    slideDown();
    setTwo();
    cantUpdateTileRow();
    cantUpdateTileCol();
    checkForGameOver();
   
}

function keyUP(){
    slideUp();
    setTwo();
    cantUpdateTileRow();
    cantUpdateTileCol();
    checkForGameOver();
}

function filterZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
    //[0, 2, 2, 2] 
    row = filterZero(row); //[2, 2, 2]
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
            document.getElementById('score').innerHTML = score;
            if (score > highScore) {
                highScore = score;
                highScoreID.innerHTML = score;
                highScoreClass.style.color = "var(--accent)";
            }
        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } //[4, 2, 0, 0]
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) { 
        
        let row = [];        
        for (let i = 0; i < rows; i++) {
            row.push(board[i][c]);
            console.log(row);
        }        
        
        row = slide(row);
        
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    } 
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        
        let row = [];        
        for (let i = 0; i < rows; i++) {
            row.push(board[i][c]);
            console.log(row);
        }

        row.reverse();
        row = slide(row);
        row.reverse();

        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    console.log('--------------done')
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
            //console.log(board[r][c])
        }
    }
    return false;
}

function cantUpdateTileRow(row) {
    for(let r = 0; r < rows; r++){
        row = board[r];
        row = filterZero(row);
        //console.log("dit is de rownummer")
        //console.log(r)
        //console.log("dit is de row")
        //console.log(row)
        for (let i = 0; i < row.length-1; i++){
            if (row[i] == row[i+1]) {
                //console.log("er kan een combinatie gemaakt worden")
                //console.log("")
                return false;
            }
        } 
        //console.log("er kan geen combinatie gemaakt worden")
        //console.log("")
        
    }
    //console.log("-------------------row")
    return true;
    
}

function cantUpdateTileCol() {
    for(let c = 0; c < columns; c++){
        //row van getallen in een collom
        let row = [];        
        for (let i = 0; i < rows; i++) {
            row.push(board[i][c]);
            console.log(row);
        }  
        row = filterZero(row);
        //console.log("dit is de collomnummer")
        //console.log(c)
        //console.log("dit is de row van getallen in een collom")
        //console.log(row)
        for (let i = 0; i < row.length-1; i++) {
            if (row[i] == row[i+1]) {
                //console.log("er is een combinatie mogelijk")
                //console.log("")
                return false;
            }
            //console.log("er kan geen combinatie gemaakt worden")
            //console.log("")
        }
    }
    //console.log("-------------------col")
    return true;
}

//om de 2 seconden een nieuw getal toevoegen aan het bord, als je verloren bent er er geen nullen meer te zien zijn stopt de timer
let interval = setInterval(function() {

    if (generateWithTime) {
        setTwo();
        if (!hasEmptyTile) {
            clearInterval(interval)
            console.log("statement reached")
        }
    }
},2000);

function WonOrLost() {
    for(let c = 0; c < columns; c++){
        //row van getallen in een collom
        let row = [];        
        for (let i = 0; i < rows; i++) {
            row.push(board[i][c]);
            console.log(row);
        }        
        console.log("dit is de collomnummer")
        console.log(c)
        console.log("dit is de row van getallen in een collom")
        console.log(row)

        //document.getElementById('result').innerHTML = "you lost";
        
        if(row.includes(2048)){
            document.getElementById('result').innerHTML = "you won";
            console.log("you won")
            console.log("here")

            buttonUploadScore.style.visibility = "visible";
            buttonUploadScore.addEventListener("click",uploadScore)

            buttonTryAgain.style.visibility = 'visible';
            buttonTryAgain.style.marginTop = "-10rem"
            break;
        }
        else if (row.includes(4096)){
            document.getElementById('result').innerHTML = "you won";
            console.log("you won")
            console.log("here1")

            buttonUploadScore.style.visibility = "visible";
            buttonUploadScore.addEventListener("click",uploadScore)
            
            buttonTryAgain.style.visibility = 'visible';
            buttonTryAgain.style.marginTop = "-10rem"

            break;
        }
        else if(row.includes(8192)){
            document.getElementById('result').innerHTML = "you won";
            console.log("you won")
            console.log("here2")

            buttonUploadScore.style.visibility = "visible";
            buttonUploadScore.addEventListener("click",uploadScore)
            
            buttonTryAgain.style.visibility = 'visible';
            buttonTryAgain.style.marginTop = "-10rem"
            break;
        }
        else {
            document.getElementById('result').innerHTML = "you lost";
            console.log("you lost")
            console.log("here3")

            buttonUploadScore.style.visibility = "visible";
            buttonUploadScore.addEventListener("click",uploadScore)
            
            buttonTryAgain.style.visibility = 'visible';
            buttonTryAgain.style.marginTop = "-10rem"

        }
    }
    console.log("-------------------winOrLost")
    return true;
}

function checkForGameOver(row){
    if (!hasEmptyTile() && cantUpdateTileRow(row) && cantUpdateTileCol()) {
        console.log("game over")
        document.removeEventListener('keyup',control);
        console.log(score)
        WonOrLost();
        return true;
    }
    return false;
}





