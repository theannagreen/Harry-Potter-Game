/*----- constants -----*/
const words = ['Quidditch', 'Hogwarts', 'Hufflepuff', 'Gryffindor', 'Wand', 'Ravenclaw', 'Slytherin', 'Dumbledore', 'Muggle', 'Snape', 'Voldamort', 'Patronus', 'Sectumsempra', 'Hagrid', 'Harry'];
const maxWrong = 8;

/*----- state variables -----*/
let wrongLetters;
let correctLetters;
let lives;
let win;
let guesses;
let word;


/*----- cached elements  -----*/
const livesElement = document.getElementById('lives'); 
const letterButtons = document.querySelectorAll('#letters button');
const letterButtonsContainer = document.getElementById('letters');
const wordContainer = document.querySelector('.word-container');
const harryImg = document.getElementById('harry-img-hidden')

const harryImages = [
"imgs/harry-img-00.png", // full image 
"img/harry-img-01.jpg", // 1st wrong answer image
"img/harry-img-02.jpg",
"img/harry-img-03.jpg",
"img/harry-img-04.jpg",
"img/harry-img-05.jpg",
"img/harry-img-06.jpg", // 6th wrong answer image 
];


/*----- event listeners -----*/
document.addEventListener('DOMContentLoaded', function() {
const newGameButton = document.getElementById('replay-button');
newGameButton.addEventListener('click', startNewGame);

// Generate letter buttons and then Initialize the Game
generateLetterButtons();
init();

letterButtons.forEach(function(button) {
 button.addEventListener('click', function() {
  //get the letter the player clicked on
  const letter = button.textContent;
  if (word.includes(letter)) {
    // update the display word
    revealLetter(letter);
  } else {
    //decrease the number of remaining guesses 
    incorrectGuesses();
    }
   });
 });
});
/*----- functions -----*/
function init() {
word = words[Math.floor(Math.random() * words.length)].toUpperCase();
displayWord(word);
}

function startNewGame() {
// reset game state   
guesses = [];
wrongLetters = [];
lives =  maxWrong;
win = null;

// clear the displayed word 
if (wordContainer) {
  wordContainer.innerHTML = '';
// reset hangman image 
renderImage();
// clear the guessed letters
generateLetterButtons();
// start new game 
init();
// reset Harry Potter img
  showHarryImage();
} else {
  console.error('Word container not found');
}
}

// reveal a letter in the word 
function revealLetter(letter) {
// find all the spans representing letters in the word container
const letterSpans = document.querySelectorAll('.word-container span');
letterSpans.forEach(function(span) {
  if (span.dataset.letter === letter.toUpperCase()) {
    span.textContent = letter.toUpperCase();
    span.classList.add('revealed');
  }
});
checkWin();
}

function incorrectGuesses() {
livesElement.textContent = parseInt(livesElement.textContent) -1;
updateHarryImage();
//check if the player has lost 
if (parseInt(livesElement.textContent) === 0) {
  // update the lost state variable 
  lost = true;
  // end the game if player hass no lives left 
  endGame(`You lost! The word was ${word}.`);
}
function updateHarryImage() {
const imgPath = `imgs/harry-img-0${wrongGuesses}.jpg`;
harryImg.src = imgPath;
}
// render the game 
function generateLetterButtons() {
letterButtonsContainer.innerHTML = ''; //clearing any existing content
// generate a new set of letter buttons 
const letters = 'abcdefghijklmnopqrstuvwxyz';
for (let i = 0; i < letters.length; i++) {
const buttons = document.createElement('button');
// the text content of the button is set to a letter 
buttons.textContent = letters.charAt(i);
// added an event listener to each button 
buttons.addEventListener('click', function() {
  // when the letter button is clicked, revel the letter in the word
  revealLetter(buttons.textContent);
  //remove the letter button 
  this.parentElement.removeChild(this);
});
letterButtonsContainer.appendChild(buttons); 
}
}

function displayWord(word) {
if (wordContainer) { 
 // iterate over each letter in the word and create spans
    for (let i = 0; i < word.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = '_'; 
        letterSpan.dataset.letter = word.charAt(i).toUpperCase();
        wordContainer.appendChild(letterSpan);
    }
} else {
 console.log('Word container not found!')
}
}
function hideHarryImage() {
harryImg.classList.add('harry-img-hidden');
}
function showHarryImage() {
harryImg.classList.remove('harry-img-hidden');
}

function endGame(message) {
alert(message);
}

function renderImage() {
const hangmanImage = document.getElementById('hangman-image');
hangmanImage.src = `https://i.imgur.com/1ys7mEZ.png`;
hangmanImage.style.opacity = 1;
}
function updateHarryImage() {
const wrongGuesses = maxWrong - parseInt(livesElement.textContent);
if (wrongGuesses < harryImages.length) {
harryImg.src = harryImages[wrongGuesses];
}
}



/*----- event listeners -----*/
document.addEventListener('DOMContentLoaded', function() {
const newGameButton = document.getElementById('replay-button');
newGameButton.addEventListener('click', startNewGame);

// Generate letter buttons and then Initialize the Game
generateLetterButtons();
init();

letterButtons.forEach(function(button) {
 button.addEventListener('click', function() {
  //get the letter the player clicked on
  const letter = button.textContent;
  if (word.includes(letter)) {
    // update the display word
    revealLetter(letter);
  } else {
    //decrease the number of remaining guesses 
    incorrectGuesses();
    }
   });
 });
});
/*----- functions -----*/
function init() {
word = words[Math.floor(Math.random() * words.length)].toUpperCase();
displayWord(word);
}

function startNewGame() {
// reset game state   
guesses = [];
wrongLetters = [];
lives =  maxWrong;
win = null;

// clear the displayed word 
if (wordContainer) {
  wordContainer.innerHTML = '';
// reset hangman image 
renderImage();
// clear the guessed letters
generateLetterButtons();
// start new game 
init();
// reset Harry Potter img
  showHarryImage();
} else {
  console.error('Word container not found');
}
}

// reveal a letter in the word 
function revealLetter(letter) {
// find all the spans representing letters in the word container
const letterSpans = document.querySelectorAll('.word-container span');
letterSpans.forEach(function(span) {
  if (span.dataset.letter === letter.toUpperCase()) {
    span.textContent = letter.toUpperCase();
    span.classList.add('revealed');
  }
});
checkWin();
}

function incorrectGuesses() {
livesElement.textContent = parseInt(livesElement.textContent) -1;
updateHarryImage();
//check if the player has lost 
if (parseInt(livesElement.textContent) === 0) {
  // update the lost state variable 
  lost = true;
  // end the game if player hass no lives left 
  endGame(`You lost! The word was ${word}.`);
}
}
function updateHarryImage() {
const imgPath = `imgs/harry-img-0${wrongGuesses}.jpg`;
harryImg.src = imgPath;
}
// render the game 
function generateLetterButtons() {
letterButtonsContainer.innerHTML = ''; //clearing any existing content
// generate a new set of letter buttons 
const letters = 'abcdefghijklmnopqrstuvwxyz';
for (let i = 0; i < letters.length; i++) {
const buttons = document.createElement('button');
// the text content of the button is set to a letter 
buttons.textContent = letters.charAt(i);
// added an event listener to each button 
buttons.addEventListener('click', function() {
  // when the letter button is clicked, revel the letter in the word
  revealLetter(buttons.textContent);
  //remove the letter button 
  this.parentElement.removeChild(this);
});
letterButtonsContainer.appendChild(buttons); 
}
}

function displayWord(word) {
if (wordContainer) { 
 // iterate over each letter in the word and create spans
    for (let i = 0; i < word.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = '_'; 
        letterSpan.dataset.letter = word.charAt(i).toUpperCase();
        wordContainer.appendChild(letterSpan);
    }
} else {
 console.log('Word container not found!')
}
}
function hideHarryImage() {
harryImg.classList.add('harry-img-hidden');
}
function showHarryImage() {
harryImg.classList.remove('harry-img-hidden');
}

function endGame(message) {
alert(message);
}

}
function updateHarryImage() {
  const wrongGuesses = maxWrong - parseInt(livesElement.textContent);
  if (wrongGuesses < harryImages.length) {
    harryImg.src = harryImages[wrongGuesses];
  }
  function renderImage() {
  const hangmanImage = document.getElementById('hangman-image');
  hangmanImage.src = `img/harry-img-00.png`;
  hangmanImage.style.opacity = 1;
}
