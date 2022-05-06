document.addEventListener('DOMContentLoaded', ()=>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares= []
    let score = 0;
    


    function colors() {
        for(let i=0; i < squares.length; i++){
            if (squares[i].innerHTML == 2) {
                console.log("kleur grijs")
                console.log()
                document.querySelector('.grid div').style.backgroundColor = "grey";
            }
        }
    }

    //om de 2 seconden een nieuw getal toevoegen aan het bord, als je verloren bent er er geen nullen meer te zien zijn stopt de timer
    var interval = setInterval(function() {
        lostBoolean = checkForGameOver()
        let zeros = checkForGameOver()
        console.log("there are " + zeros + " zeros in this function")
        generate()
        colors()
        if (zeros <= 1 ) {
            clearInterval(interval)
            console.log("statement reached")
        }
    },2000);


    //create a playing board
    function createBoard(){
        for(let i =0 ; i < width*width ; i++){
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()

    

    //generate random number
    function generate(){
        randomNumer = Math.floor(Math.random() * squares.length)
        if(squares[randomNumer].innerHTML == 0){
            squares[randomNumer].innerHTML = 2
            checkForGameOver()
        }else generate()
    }

    //swipe right
    function moveright(){
        for(let i = 0 ; i  < 16; i++){
            if (i % 4 ===0 ) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalTree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                //parseInt omdat er anders strings uit komen
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalTree),parseInt(totalFour)]
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]

            }
        }
    }

    //swipe left
    function moveLeft(){
        for(let i = 0 ; i  < 16; i++){
            if (i % 4 ===0 ) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalTree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                //parseInt omdat er anders strings uit komen
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalTree),parseInt(totalFour)]
                
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]

            }
        }
    }

    //swipe down
    function moveDown(){
        for(let i = 0 ; i < 4; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalTree = squares[i + (width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalTree),parseInt(totalFour)]
            
            let filteredCulumn = column.filter(num => num)
            let missing = 4 - filteredCulumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredCulumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i + (width*2)].innerHTML = newColumn[2]
            squares[i + (width*3)].innerHTML = newColumn[3]

        }
    }
    
    //swipe up
    function moveUp(){
        for(let i = 0 ; i < 4; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalTree = squares[i + (width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalTree),parseInt(totalFour)]
            
            let filteredCulumn = column.filter(num => num)
            let missing = 4 - filteredCulumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredCulumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i + (width*2)].innerHTML = newColumn[2]
            squares[i + (width*3)].innerHTML = newColumn[3]
        }
    }

    function combineRow(){
        for (let i = 0 ; i < 15; i++){
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
        colors()
    }

    function combineColumn(){
        for (let i = 0 ; i < 12; i++){
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
        colors()
    }

    //assign keycodes
    function control(e){
        if (e.keyCode === 39) {
            keyRight()
        }else if (e.keyCode === 37) {
            keyLeft()
        }else if (e.keyCode === 38) {
            keyUP()
        }else if (e.keyCode === 40) {
            keyDown()
        }
    }
    document.addEventListener('keyup',control)

    function keyRight(){
        moveright()
        combineRow()
        moveright()
        generate()
        
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
      
    }

    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
       
    }

    function keyUP(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
        
    }

    //check gor the number 2048 in the squares to win
    function checkForWin(){
        for(let i=0; i < squares.length; i++){
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You Win!"
                document.removeEventListener('keyup',control)
            }
        }
    }

    //check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0;
        for(let i=0; i < squares.length; i++){
            if (squares[i].innerHTML == 0) {
                zeros++
                console.log(squares[i])
            }
        }
        if (zeros === 0) {
            console.log("u lost")
            resultDisplay.innerHTML = 'You lose'
            document.removeEventListener('keyup',control)
        }
        return zeros;
    }
    
})
