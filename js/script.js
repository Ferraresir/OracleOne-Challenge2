const words = ["ALURA", "ORACLE", "FIGMA", "TRELLO", "GITHUB", "CODEAR"];

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

//eventlisteners
btnStart.addEventListener("click", function () {
  startGame();
});

btnWord.addEventListener("click", function () {
  newWord.value = "";
  switchdisplay("input");
});

btnSavePlay.addEventListener("click", function () {
  if (newWord.value.length <= 8 && newWord.value.length > 0) {
    addWord(newWord.value);
    words.push(newWord.value);
    switchdisplay("welcome");
  } else {
    alert("La palabra debe tener entre 1 y 8 caracteres");
  }
});

btnGiveUp.addEventListener("click", function () {
  location.reload();
});

btnCancelWord.addEventListener("click", function () {
  location.reload();
});

btnNewGame.addEventListener("click", function () {});

//GAME LOGIC

function startGame() {
  let word = chooseWord().split("");
  let badletters = [];
  let errors = 7;
  let guess = [];
  switchdisplay("game");
  word.map((letter, inx) => {
    console.log(letter);
    gameWord.innerHTML += `<div style="display:flex; flex-direction:column;width: 3rem;">
      <span id="l${inx}" style="font-size:3rem; text-align: center; color: var(--light-blue)">${letter}</span>
      <img class="letter-img" src="assets/Rectangle.png" alt="letter line">
      </div>`;
  });
  addEventListener("keypress", (e) => {
    let key = e.key.toUpperCase();
    if (isFinite(key)) {
      alert("No se admiten numeros");
    } else {
      if (!errors >= 1) {
        alert("Te quedaste sin intentos");
        location.reload();
      } else {
        if (word.includes(key)) {
          word.map((letter, idx) => {
            if (letter === key && !guess.includes(letter)) {
              document.getElementById(`l${idx}`).style.color =
                "var(--dark-blue)";
              guess.splice(idx, 0, letter);
              console.log(word);
              console.log(guess);
              if (guess === word) alert("¡Felicidades! Has ganado");
            }
          });
        } else if (!badletters.includes(key)) {
          document.getElementById(
            "badletters"
          ).innerHTML += `<span style="font-size:2rem;margin-right:1rem">${key}</span>`;
          badletters.push(key);
          errors -= 1;
        }
      }
    }
  });
}
