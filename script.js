  "use strict";

const input1 = document.getElementById("input1");
const outputScore = document.querySelector(".score");
const Retry = document.getElementById("Retry");
const HTP = document.querySelector(".howToPlay");
const overlay = document.querySelector(".overlay");
const reInput = document.querySelectorAll(".guess-number");
const lines = document.querySelectorAll(".line");
const rNlist = document.querySelectorAll(".rN");
const rPlist = document.querySelectorAll(".rP");
const highScore = document.querySelector(".highScore");
const heading = document.getElementById("heading");

let highScoreValue = 0;
let checkLine = 1;
let mode = 5;
let score = 50;
let number = [];
let guess = [];
if (mode == 10) {
  for (let i = 0; i < 4; i++) {
    number[i] = Math.trunc(Math.random() * 9) + 1;
  }
} else if (mode == 5) {
  let checknumber = [];
  while (number.length < 4) {
    const randomNumber = Math.trunc(Math.random() * 9) + 1;
    if (!checknumber.includes(randomNumber)) {
      number.push(randomNumber);
      checknumber.push(randomNumber);
    }
  }

}
lines.forEach((line) => {
  line.classList.add("hidden");
  line.classList.remove("right-Number");
  line.classList.remove("right-Position");
});
document.querySelector(".main-board").classList.add("hidden");
document.querySelector("#mode").textContent =
  mode == 5 ? "Easy mode" : "Hard mode";
rNlist.forEach((each) => {
  each.classList.add("hidden");
});
rPlist.forEach((each) => {
  each.classList.add("hidden");
});

//////
//////
// reset function
const begin = function () {
  checkLine = 1;
  score = 50;
  number = [];
  guess = [];

  heading.textContent = "Guess the number";
  document.querySelector("#mode").textContent =
    mode == 5 ? "Easy mode" : "Hard mode";
  // reset answer line, but i don't think it's necessary;
  if (mode == 10) {
    for (let i = 0; i < 4; i++) {
      number[i] = Math.trunc(Math.random() * 9) + 1;
    }
  } else if (mode == 5) {
    let checknumber = [];
    while (number.length < 4) {
      const randomNumber = Math.trunc(Math.random() * 9) + 1;
      if (!checknumber.includes(randomNumber)) {
        number.push(randomNumber);
        checknumber.push(randomNumber);
      }
    }
  }
  for (let x = 0; x <= 10; x++) {
    for (let i = 0; i < 4; i++) {
      document.getElementById(`${x}.${i + 1}`).textContent = "?";
      document
        .getElementById(`${x}.${i + 1}`)
        .classList.remove("right-Position");
      document.getElementById(`${x}.${i + 1}`).classList.remove("right-Number");
    }
  }
  lines.forEach((line) => {
    line.classList.add("hidden");
  });
  document.querySelector(".main-board").classList.add("hidden");
  document.querySelector("#mode").textContent =
    mode == 5 ? "Easy mode" : "Hard mode";
  // display input
  reInput.forEach((input) => {
    input.classList.remove("hidden");
    input.value = "";
  });
  outputScore.textContent = `Score: ${score}`;
  rNlist.forEach((each) => {
    each.classList.add("hidden");
  });
  rPlist.forEach((each) => {
    each.classList.add("hidden");
  });
};
Retry.addEventListener("click", begin);
/////////
/////////
// checkResult function
const checkResult = function () {
  let rN = 0;
  let rP = 0;
  let checkWin = 0; 
  let checkUni = [];

  if (checkLine <= mode) {
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`${checkLine}.${i}`).textContent = guess[i - 1];
    }
    document.getElementById(`${checkLine}`).classList.remove("hidden");
    for (let i = 0; i < number.length; i++) {
      ////if the number is right
      if (number.includes(parseInt(guess[i]))) {
        if (mode == 10 && !checkUni.includes(guess[i])) {
          checkUni.push(guess[i]);
          rN++;
        }
        document
          .getElementById(`${checkLine}.${i + 1}`)
          .classList.add("right-Number");
      }
      /////if the number in the correct position
      if (parseInt(guess[i]) == number[i]) {
        if (mode == 10) {
          rP++;
        }
        document
          .getElementById(`${checkLine}.${i + 1}`)
          .classList.add("right-Position");
        checkWin++;
      }
      if (mode == 10) {
        document.getElementById(`${checkLine}.0`).textContent = rN;
        document.getElementById(`${checkLine}.0`).classList.remove("hidden");
        document.getElementById(`${checkLine}.5`).textContent = rP;
        document.getElementById(`${checkLine}.5`).classList.remove("hidden");
      }
      const clearInput = document.querySelectorAll(".guess-number");
      clearInput.forEach((input) => {
        input.value = "";
      });
      document.getElementById("input1").focus();
    }
  }
  checkLine++;
  ////if win
  if (checkWin == 4 || checkLine > mode) {
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`0.${i}`).textContent = number[i - 1];
      document.getElementById(`0.${i}`).classList.add("right-Position");
    }
    reInput.forEach((input) => {
      input.classList.add("hidden");
    });
    document.querySelector(".main-board").classList.remove("hidden");
    if (score >= highScoreValue && checkWin == 4) {
      highScoreValue = score;
      highScore.textContent = `High score: ${highScoreValue}`;
    }
    heading.textContent = checkWin == 4 ? "Congratulation!!" : "Ga vai loz";
  }

  if (checkWin == 4) {
    score = mode == 5 ? score - 10 : score - checkLine + 1;
    if (score <= 0) {
      score = 0;
    }
  }
  outputScore.textContent = `Score: ${score}`;
  guess = [];
};
document.getElementById("Check").addEventListener("click", checkResult);
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    checkResult();
  }
});
///////
///////
////Introduction
document.getElementById("question").addEventListener("click", function () {
  HTP.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
//////
//////
/////exit introduction
const exitHTP = function () {
  HTP.classList.add("hidden");
  overlay.classList.add("hidden");
};
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    console.log(e.key);
    exitHTP();
  }
});
document.querySelector(".close-howToPlay").addEventListener("click", exitHTP);
//////
//////
/// Guess a number
for (let i = 1; i <= 4; i++) {
  document.getElementById(`input${i}`).addEventListener("input", function () {
    let guessValue = document.getElementById(`input${i}`).value;
    guess[i - 1] = guessValue;
    if (i < 4) {
      if (guessValue.length >= input1.maxLength) {
        document.getElementById(`input${i + 1}`).focus();
      }
    }
  });
}

document.getElementById("easyMode").addEventListener("click", function () {
  mode = 5;
  exitHTP();
  document.querySelector("#mode").textContent =
    mode == 5 ? "Easy mode" : "Hard mode";
  begin();
});
document.getElementById("hardMode").addEventListener("click", function () {
  mode = 10;
  exitHTP();
  document.querySelector("#mode").textContent =
    mode == 5 ? "Easy mode" : "Hard mode";
  begin();
});
