// assign intial value of win and loss 
var wins = 0;
var losses = 0;

// assign word options
var words = ["bella", "arial", "cinderalla", "elsa", "jasmine", "rapunzal", "snowwhite", "sofia"];

//all audio files, including a title audio and all answers' audio files
var arielAudio = new Audio('assests/audio/ariel.mp3');
var bellaAudio = new Audio('assests/audio/bella.mp3');
var cinderallaAudio = new Audio('assets/audio/cinderalla.mp3');
var elsaAudio = new Audio('assets/audio/elsa.mp3');
var jasmineAudio = new Audio('assets/audio/jasmine.mp3');
var rapunzelAudio = new Audio('assets/audio/rapunzel.mp3');
var snowWhiteAudio = new Audio('assets/audio/snow-white.mp3');
var sofiaAudio = new Audio('assets/audio/sofia.wav');
var gameAudio = new Audio('assets/audio/gameover.mp3');

//Empty variables to store values later
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;

// game function
function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}

// call image using query selector
let imageItem = document.querySelector("img");

// audio function
function audio() {
    switch (randomWord) {
        case "bella":
            imageItem.innerHTML = "<img src='assests/images/bella.gif>";
            bellaAudio.play();
            break;
        case "ariel":
            imageItem.innerHTML = "<img src='assests/images/ariel.gif>";
            arielAudio.play();
            break;
        case "cinderalla":
            imageItem.innerHTML = "<img src='assests/images/cinderalla.gif>";
            cinderaalaAudio.play();
            break;
        case "elsa":
            imageItem.innerHTML = "<img src='assests/images/elsa.gif>";
            elsaAudio.play();
            break;
        case "jasmine":
            imageItem.innerHTML = "<img src='assests/images/jasmine.gif>";
            jasmineAudio.play();
            break;
        case "rupunzel":
            imageItem.innerHTML = "<img src='assests/images/rupunzel.gif>";
            rupunzelAudio.play();
            break;
        case "snowwhite":
            imageItem.innerHTML = "<img src='assests/images/snow-white.gif>";
            snowWhiteAudio.play();
            break;
        case "sofia":
            imageItem.innerHTML = "<img src='assests/images/sofia.gif>";
            sofiaAudio.play();
            break;
    }
}
// check the the letter is match with random word or not
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;

    }
    console.log(blanksAndCorrect);
}
//function reset automatically
function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//add win and loss coding in function
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        aud()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST, then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/try-again.png"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}
// call all function to start the game 
Game()
// finally adding a key event 
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(guesses);
    complete();
    console.log(guesses);
    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}

// change the baclground color using mousemove event
let divItem = document.querySelector("div");
divItem.addEventListener('mousemove', function (e) {
    document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`;
});


