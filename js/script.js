const words = ["alura", "oracle", "figma", "trello", "github", "codear"];

//botones
const btnStart = document.getElementById("btn-start");
const btnWord = document.getElementById("btn-addword");
const btnSavePlay = document.getElementById("btn-save");
const btnCancelWord = document.getElementById("btn-cancel");
const btnNewGame = document.getElementById("btn-newgame");
const btnGiveUp = document.getElementById("btn-giveup");

//textareas
const newWord = document.getElementById("word-input");

//views
const welcome = document.getElementById("welcome");
const input = document.getElementById("input");
const game = document.getElementById("game");

//game
const gameWord = document.getElementById("gameword");

//functions
//change view
function switchdisplay(view) {
  if (view == "welcome") {
    welcome.style.display = "flex";
    input.style.display = "none";
    game.style.display = "none";
  } else if (view == "input") {
    welcome.style.display = "none";
    input.style.display = "flex";
    game.style.display = "none";
  } else if (view == "game") {
    welcome.style.display = "none";
    input.style.display = "none";
    game.style.display = "flex";
  }
}
//random word
function chooseWord() {
  let word = words[Math.floor(Math.random() * words.length)];
  return word;
}

//add word
function addWord(word) {
  words.push(word);
}

function startGame() {
  let word = chooseWord().split("");
  switchdisplay("game");
}

//eventlisteners
btnStart.addEventListener("click", function () {
  startGame();
});

btnWord.addEventListener("click", function () {
  switchdisplay("input");
});

btnSavePlay.addEventListener("click", function () {
  if (newWord.value.length <= 8) {
    addWord(newWord.value);
    switchdisplay("welcome");
    console.log(words);
  } else {
    alert("La palabra no puede tener mas de 8 caracteres");
  }
});

