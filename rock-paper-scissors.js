let computer = "";
let compNumber;
score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  loses: 0,
  tie: 0,
};

function decide() {
  compNumber = Math.random();
  return compNumber;
}

document.querySelector(".rock-button").addEventListener("click", () => {
  guess("rock");
});

document.querySelector(".paper-button").addEventListener("click", () => {
  guess("paper");
});

document.querySelector(".scissors-button").addEventListener("click", () => {
  guess("scissors");
});
function guess(youChoose) {
  compNumber = decide();
  let compElement;
  let playerElement;
  let computer;
  if (compNumber >= 0 && compNumber <= 1 / 3) {
    computer = "rock";
    compElement =
      '<i class="fa-solid fa-hand-fist" style="color: #ffffff;transform: scale(1.6);margin-left: 10px;"></i>';
  } else if (compNumber >= 1 / 3 && compNumber <= 2 / 3) {
    computer = "paper";
    compElement =
      '<i class="fa-solid fa-hand" style="color: #ffffff;transform: scale(1.6);margin-left: 10px;"></i>';
  } else if (compNumber >= 2 / 3 && compNumber < 1) {
    computer = "scissors";
    compElement =
      '<i class="fa-solid fa-hand-scissors" style="color: #ffffff;transform: scale(1.6);margin-left: 10px;"></i>';
  }

  if (computer === youChoose) {
    msg = "Tie";
  } else if (
    (computer === "rock" && youChoose === "paper") ||
    (computer === "paper" && youChoose === "scissors") ||
    (computer === "scissors" && youChoose === "rock")
  ) {
    msg = "You win";
  } else {
    msg = "You lose";
  }
  if (msg === "You win") {
    score.win++;
  } else if (msg === "You lose") {
    score.loses++;
  } else if (msg === "Tie") {
    score.tie++;
  }

  if (youChoose === "rock") {
    playerElement =
      '<i class="fa-solid fa-hand-fist" style="color: #ffffff;transform: scale(1.6);margin: 10px;"></i>';
  } else if (youChoose === "paper") {
    playerElement =
      '<i class="fa-solid fa-hand" style="color: #ffffff;transform: scale(1.6);margin: 10px;"></i>';
  } else if (youChoose === "scissors") {
    playerElement =
      '<i class="fa-solid fa-hand-scissors" style="color: #ffffff;transform: scale(1.6);margin: 10px;"></i>';
  }
  document.querySelector(
    ".scoreBoard"
  ).innerHTML = `Win: ${score.win} \nlose: ${score.loses} \ntie: ${score.tie}`;

  document.querySelector(".scoreResult").innerHTML = `${msg}`;

  document.querySelector(
    ".scoreMove"
  ).innerHTML = `You ${playerElement}  computer ${compElement}`;
  computer = "";
  localStorage.setItem("score", JSON.stringify(score));
}
document.querySelector(".Ingamebutton").addEventListener("click", () => {
  areYouSure();
});
function resetScore() {
  score.win = 0;
  score.loses = 0;
  score.tie = 0;
  document.querySelector(
    ".scoreBoard"
  ).innerHTML = `Win: ${score.win} lose: ${score.loses} tie: ${score.tie}`;

  document.querySelector(".scoreResult").innerHTML = ``;

  document.querySelector(".scoreMove").innerHTML = ``;
  localStorage.removeItem("score");
}

let isAutoPlaying = false;
let playInterval;
document.querySelector(".autoPlay").addEventListener("click", () => {
  autoplay();

  document.querySelector(".rock-button").removeEventListener("click", () => {
    guess("rock");
  });

  document.querySelector(".paper-button").removeEventListener("click", () => {
    guess("paper");
  });

  document
    .querySelector(".scissors-button")
    .removeEventListener("click", () => {
      guess("scissors");
    });
});
function autoplay() {
  const playButton = document.querySelector(".autoPlay");
  if (!isAutoPlaying) {
    playButton.innerHTML = "Stop play";
    isAutoPlaying = true;
    playInterval = setInterval(function () {
      compNumber = decide();
      let compElement;
      let youChoose;
      if (compNumber >= 0 && compNumber <= 1 / 3) {
        youChoose = "rock";
      } else if (compNumber >= 1 / 3 && compNumber <= 2 / 3) {
        youChoose = "paper";
      } else if (compNumber >= 2 / 3 && compNumber < 1) {
        youChoose = "scissors";
      }

      guess(youChoose);
    }, 1000);
  } else if (isAutoPlaying) {
    playButton.innerHTML = "Auto play";
    isAutoPlaying = false;
    clearInterval(playInterval);
  }
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    guess("rock");
  } else if (event.key === "p") {
    guess("paper");
  } else if (event.key === "s") {
    guess("scissors");
  } else if (event.key === "a") {
    autoplay();
  } else if (event.key === "Backspace") {
    areYouSure();
  }
  console.log(event.key);
});

function areYouSure() {
  document.querySelector(".js-reset").innerHTML =
    '<p class = "areYouSure">Are you sure you want to reset the score?</p><button class="yesReset">Yes</button><button class="reset noReset">No</button>';
  document.querySelector(".yesReset").addEventListener("click", () => {
    resetScore();
    document.querySelector(".js-reset").innerHTML = "";
  });

  document.querySelector(".noReset").addEventListener("click", () => {
    document.querySelector(".js-reset").innerHTML = "";
  });
}
