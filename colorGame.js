//var that contain the number of squares we will play with - easy mode 3, hard mode 6(squaresArr.length)
numOfSquares = 6;
//random color that will be the right color to guess in the game
var pickedColor;
//var with the index of the random square that contain the color the user need to guess 
var pickedColorSquareIndex;

//array with all the divs that will be our different color squares
var squaresArr = document.querySelectorAll(".square");
//var for the header display of the game
var colorDisplay = document.querySelector("#colorDisplay");
//var for the massege the player if he gussed  right color
var msg = document.querySelector("#msg");
//vars for the game mode an restart buttons in the game nav bar
var gameModes = document.querySelectorAll(".mode");
var restart = document.querySelector("#restart");

//initalize the game for playing
init();

//function that initalize the game for playing
function init() {
    setSquares();
    setBtns();
    setGame();
}

//set for each square his click event
function setSquares() {
    squaresArr.forEach(function (square, i) {

        //click event that check if the square that was picked is with the right color
        square.addEventListener("click", function () {
            if (this.style.backgroundColor === pickedColor) {

                //massege the user he guessed the correct color
                msg.textContent = "Correct!!";
                //change all the squares background and header of the game background to the pickedColor
                rightGuess(pickedColor);
                //change the text in the restart btn to "play again?"
                restart.textContent = "PLAY AGIAN?";
            }
            else {
                //massege the user he guessed the worng color
                msg.textContent = "Try again";

                //the square "disapear" = change color of the square with the color of the body element
                this.style.backgroundColor = "rgb(23, 23, 23)";
            }
        });
    }); 
}

//add click events to the game mode and restart btns
function setBtns() {
    //add click events to the game mode btns
    gameModes.forEach(function (mode) {
        mode.addEventListener("click", function name() {
            //remove css class .selected from the nodes btn
            gameModes[0].classList.remove("selected");
            gameModes[1].classList.remove("selected");

            //add css class .selected to this btn
            this.classList.add("selected");

            //change the number of playable squares to 3 or 6 - depand on the game mode
            this.textContent === "EASY" ? numOfSquares = 3 : numOfSquares = squaresArr.length;

            //reset the game
            setGame();
        });
    });

    //add click events to the restart btn
    restart.addEventListener("click", function name() {
        //reset the game
        setGame();
    }); 
}

//function that set the game for playing
function setGame() {
    //clear msg and header color
    document.querySelector("h1").style.backgroundColor = "rgb(70, 130, 180)";
    msg.textContent = "";
    //change the text in the restart btn to "NEW COLORS"
    restart.textContent = "NEW COLORS";

    //set the picked color 
    pickedColor = pickRandomColor();
    //set the index of the square with the color the user need to guess
    pickedColorSquareIndex = pickSquareIndex();
    //change the h1 content with the RGB color the player need to guess
    colorDisplay.textContent = pickedColor;

    //set each square background color to different color (according to game mode - easy = 3 squares, hard = 6 )
    // only the square that have index the same as pickedColorSquareIndex will contain the pickedColor
    squaresArr.forEach(function (square, i) {
        //first we anable the square to be playable
        square.style.display = "block";

        if (i === pickedColorSquareIndex) {//set the aquare with the color the user need to guess
            square.style.backgroundColor = pickedColor;
        }
        else if (i < numOfSquares) {//set the aquare we use in the game
            square.style.backgroundColor = pickRandomColor();
        }
        else {//"remove" the aquare we don't use in the game
            square.style.display = "none";
        }
    });
    
}
//change all the playable squares background and header of the game background to the same color
function rightGuess(color) {
    for (let i = 0; i < numOfSquares; i++) {
        squaresArr[i].style.backgroundColor = color;  
    }

    document.querySelector("h1").style.backgroundColor = color;
}

//the function return a string that represent in css a color - return random color each call 
function pickRandomColor() {
    //colord rang 0-255
    //Math.random() * (max - min) + min;
    var red = Math.round(Math.random() * 255);
    var green = Math.round(Math.random() * 255);
    var blue = Math.round(Math.random() * 255);
    //string to return - "rgb(red, green, blue)"
    var color = "rgb(" + red + ", " + green + ", " + blue + ")";
    return color;
}

//the function return a random number that will be the index of the 
//square that will contain the color the user need to guess
function pickSquareIndex() {
    //easy mode - index rang 0 - numOfSquares-1
    //harde mode - index rang 0 - squaresArr.length-1
    //Math.random() * (max - min) + min;
    return Math.round(Math.random() * (numOfSquares-1));
}