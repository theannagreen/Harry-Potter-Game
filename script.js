/*----- constants -----*/
const words = ['Quidditch', 'Hogwarts', 'Hufflepuff', 'Gryffindor', 'Wand', 'Ravenclaw', 'Slytherin', 'Dumbledore', 'Muggle', 'Snape', 'Voldamort', 'Patronus', 'Sectumsempra', 'Hagrid', 'Harry'];
const maxWrong = 6;

/*----- state variables -----*/
let wrongLetters;
let correctLetters;
let win;
let guesses;
let word;
let wrongGuesses = 0;

/*----- cached elements  -----*/
let letterButtons = document.querySelectorAll('.letter-button');
const letterButtonsContainer = document.getElementById('letters');
const wordContainer = document.querySelector('.word-container');
const hangmanImage = document.getElementById('hangman-img-hidden');
const hangmanImageContainer = document.getElementById('hangman-img-container');

/*----- event listeners -----*/
document.addEventListener('DOMContentLoaded', function () {
  console.log('content loaded');
  const newGameButton = document.getElementById('replay-button');
  newGameButton.addEventListener('click', startNewGame);

  // Generate letter buttons and then Initialize the Game
  generateLetterButtons();
  init();

});
/*----- functions -----*/
function init() {
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  displayWord(word);
  letterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      console.log('Button clicked!');
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
}

function startNewGame() {
  // reset game state   
  guesses = [];
  wrongLetters = [];
  lives = maxWrong;
  win = null;
  wrongGuesses = 0;

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
  letterSpans.forEach(function (span) {
    if (span.dataset.letter === letter.toUpperCase()) {
      span.textContent = letter.toUpperCase();
      span.classList.add('revealed');
    }
  });
  checkWin();
}

function incorrectGuesses() {
  console.log('Before calling updateHarryImage');
  console.log('Wrong guesses count:', wrongGuesses);
  // livesElement.textContent = parseInt(livesElement.textContent) - 1;
  wrongGuesses++; //increment wrong guesses 
  renderImage();
  // updateHarryImage();
  //check if the player has lost 
  // if (parseInt(livesElement.textContent) === 0) {
  //   // update the lost state variable 
  //   lost = true;
  //   // end the game if player hass no lives left 
  //   endGame(`You lost! The word was ${word}.`);
  // }
}
function updateHarryImage() {
  if (wrongGuesses < harryImages.length) {
    const imagePath = harryImages[wrongGuesses];
    console.log('Updating Harry image to:', imagePath);
    hangmanImage.src = harryImages[wrongGuesses];
  }
}
// render the game 
function generateLetterButtons() {
  console.log('buttons generated');
  letterButtonsContainer.innerHTML = ''; //clearing any existing content
  // generate a new set of letter buttons 
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < letters.length; i++) {
    const buttons = document.createElement('button');
    buttons.classList.add('letter-button');
    // the text content of the button is set to a letter 
    buttons.textContent = letters.charAt(i);
    // added an event listener to each button 
    buttons.addEventListener('click', function () {
      // when the letter button is clicked, revel the letter in the word
      revealLetter(buttons.textContent);
      //remove the letter button 
      this.parentElement.removeChild(this);
    });
    letterButtonsContainer.appendChild(buttons);
  }
  letterButtons = document.querySelectorAll('.letter-button');
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

function endGame(message) {
  alert(message);
}
function renderImage() {
  hangmanImageContainer.src = `./imgs/harry img wrong ${wrongGuesses}.jpg`;
}
function checkWin() {
  const revealedLetters = document.querySelectorAll('.word-container span.revealed');
  if (revealedLetters.length === word.length) {
    endGame('Congratulations! You win!');
  }
}