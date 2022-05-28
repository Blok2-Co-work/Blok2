let board = new Array();
let score = 0;
let highScore = 0;
let rows;
let columns;

buttonStart = document.getElementById("buttonForAmount")
buttonStart.addEventListener("click", function(){

    document.querySelector(".changeBoardSize").style.visibility = "hidden";
    document.querySelector(".changeBoardSizeP").style.visibility = "hidden";


    document.querySelector(".highScore").style.color = "var(--primairy)"
    score = 0;
    document.getElementById("score").innerHTML = score;
    //make a new board
    const newBoard = document.createElement("div");
    newBoard.setAttribute("id", "board");
    //append the new board to theGame div
    document.querySelector(".theGame").appendChild(newBoard);
    document.querySelector(".highScore").style.marginBottom = "10rem"
    document.querySelector(".highScore").style.marginTop = "-9rem"

    this.style.visibility = "hidden";
    buttonAmountFunc();
    document.getElementById("board").style.visibility = "visible"
    document.getElementById("rowSelector").style.visibility = "hidden"
    document.querySelector(".score").style.visibility = "visible"
    document.querySelector(".intro").style.visibility = "hidden"
    setGame();
    //disable arrow keys
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
})

document.querySelector(".changeBoardSize").addEventListener("click", function() {
    highScore = 0;

    document.querySelector("#highscore").innerHTML = "";

    document.getElementById("rowSelector").style.visibility = "visible";
    document.getElementById("rowSelector").style.position = "relative";
    document.getElementById("rowSelector").style.marginLeft = "auto";
    document.getElementById("rowSelector").style.marginRight = "auto";


    this.style.visibility = "hidden";
    document.querySelector(".changeBoardSizeP").style.visibility = "hidden";
})

//try again when game is over
document.querySelector(".try_again").addEventListener("click", function(){
    document.querySelector(".highScore").style.marginBottom = "1rem"
    this.style.visibility = "hidden";

    document.querySelector(".changeBoardSize").style.visibility = "visible";
    document.querySelector(".changeBoardSize").style.marginTop = "4rem";

    document.querySelector(".changeBoardSizeP").style.visibility = "visible";
    document.querySelector(".changeBoardSizeP").style.margintop = "2rem";

    buttonStart.textContent = "Play Again !";
    buttonStart.style.marginLeft = "auto";
    buttonStart.style.marginTop = "2rem";
    buttonStart.style.marginBottom = "0";

    buttonStart.style.marginRight = "auto";
    buttonStart.style.display = "flex";
    buttonStart.style.visibility = "visible";
    
    buttonAmountFunc();
    // document.getElementById("rowSelector").style.visibility = "visible";
    document.querySelector(".score").style.visibility = "hidden"
    // document.querySelector(".intro").style.visibility = "visible"
    document.querySelector("#result").innerHTML = "";
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
                document.getElementById("highscore").innerHTML = score;
                document.querySelector(".highScore").style.color = "var(--accent)";
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
            console.log(board[r][c])
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
    setTwo();
    if (!hasEmptyTile) {
        clearInterval(interval)
        console.log("statement reached")
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
        
        if(row.includes()){
            document.getElementById('result').innerHTML = "you won";
            console.log("you won")
            console.log("here")
            document.querySelector('.try_again').style.visibility = 'visible';

            break;
        }
        else if (row.includes(4096)){
            document.getElementById('result').innerHTML = "you won";
            console.log("you won")
            console.log("here1")
            document.querySelector('.try_again').style.visibility = 'visible';

            break;
        }
        else if(row.includes(8192)){
            document.getElementById('result').innerHTML = "you won";
            console.log("you won")
            console.log("here2")
            document.querySelector('.try_again').style.visibility = 'visible';


            break;
        }
        else {
            document.getElementById('result').innerHTML = "you lost";
            console.log("you lost")
            console.log("here3")
            document.querySelector('.try_again').style.visibility = 'visible';

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





