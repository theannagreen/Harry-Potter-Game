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
let lives = maxWrong;

/*----- cached elements  -----*/
let letterButtons = document.querySelectorAll('.letter-button');
const letterButtonsContainer = document.getElementById('letters');
const wordContainer = document.querySelector('.word-container');
const hangmanImageContainer = document.getElementById('hangman-img-container');
const audio = document.getElementById('audio');

/*----- event listeners -----*/
document.addEventListener('DOMContentLoaded', function () {
  const newGameButton = document.getElementById('replay-button');
  newGameButton.addEventListener('click', startNewGame);

  // Generate letter buttons and then Initialize the Game
  generateLetterButtons();
  init();

  // play audio after DOM content is loaded 
  audio.volume = .29
  audio.play();
});

/*----- functions -----*/
function init() {
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  displayWord(word);
  letterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const letter = button.textContent;
      if (word.includes(letter.toUpperCase())) {
        revealLetter(letter);
      } else {
        incorrectGuesses(letter);
      }
      console.log('incorrect guesses are working', button);
    });
  });
}

function startNewGame() { 
  guesses = [];
  wrongLetters = [];
  lives = maxWrong;
  win = null;
  wrongGuesses = 0;
  lives = maxWrong;
 
  if (wordContainer) {
    wordContainer.innerHTML = '';
    generateLetterButtons();
    init();
    renderImage();
  } else {
    console.error('Word container not found');
  }
}

function revealLetter(letter) {
  const letterSpans = document.querySelectorAll('.word-container span');
  letterSpans.forEach(function (span) {
    if (span.dataset.letter === letter.toUpperCase()) {
      span.textContent = letter.toUpperCase();
      span.classList.add('revealed');
    }
  });
  checkWin();
}

function incorrectGuesses(letter) {
  if (!word.includes(letter)) {

    wrongGuesses++; 
    lives --;
    renderImage();
  }
    checkLose();
}

function updateHarryImage() {
  if (wrongGuesses < harryImages.length) {
    const imagePath = harryImages[wrongGuesses];
    console.log('Updating Harry image to:', imagePath);
    hangmanImage.src = harryImages[wrongGuesses];
  }
}
function generateLetterButtons() {
  letterButtonsContainer.innerHTML = ''; 
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < letters.length; i++) {
    const buttons = document.createElement('button');
    buttons.classList.add('letter-button');
    buttons.textContent = letters.charAt(i);
    buttons.addEventListener('click', function () {
      revealLetter(buttons.textContent);
      this.parentElement.removeChild(this);
    });
    letterButtonsContainer.appendChild(buttons);
  }
  letterButtons = document.querySelectorAll('.letter-button');
}

function displayWord(word) {
  if (wordContainer) {
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
function checkLose() {
  if (lives === 0) {
    endGame('Sorry! You lose.The correct word was: '+ word);
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