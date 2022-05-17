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

//add word
function addWord(word) {
  words.push(word.touperCase());
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
  } else {
    alert("La palabra no puede tener mas de 8 caracteres");
  }
});

btnGiveUp.addEventListener("click", function () {
  location.reload();
});

//GAME LOGIC

function startGame() {
  let word = chooseWord().split("");
  let badletters = [];
  let errors = 7;
  let okletters = 0;
  switchdisplay("game");
  word.map((letter, inx) => {
    gameWord.innerHTML += `<div style="display:flex; flex-direction:column;">
      <span id="l${inx}" style="font-size:3rem; text-align: center; color: var(--light-blue)">${letter}</span>
      <img class="letter-img" src="assets/Rectangle.png" alt="letter line">
      </div>`;
  });
  addEventListener("keypress", (e) => {
    console.log(typeof e.key);
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
            if (letter === key) {
              document.getElementById(`l${idx}`).style.color =
                "var(--dark-blue)";
              okletters++;
              if (okletters == word.length) {
                alert("¡Felicidades! Has ganado");
                location.reload();
              }
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
