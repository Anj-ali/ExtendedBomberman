let arr = [];
let count = 0;
let flagCount = 10;
let validflagCount = 0;
const bombCount = 10;
const cellCount = 100;
const safeCount = 90;

const corners = [0, 9, 90, 99];
const upperCornerRow = [1, 2, 3, 4, 5, 6, 7, 8];
const lowerCornerRow = [91, 92, 93, 94, 95, 96, 97, 98];
const leftCornerCol = [10, 20, 30, 40, 50, 60, 70, 80];
const rightCornerCol = [19, 29, 39, 49, 59, 69, 79, 89];

function generateBombs() {
  for (let i = 0; i < bombCount; i++) {
    var temp = Math.floor(Math.random() * 99);
    while (arr.includes(temp)) {
      temp = Math.floor(Math.random() * 99);
    }
    arr.push(temp);
  }

  for (let i = 0; i < cellCount; i++) {
    if (arr.includes(i)) {
      document.getElementById(i).classList.add("bomb");
    } else {
      document.getElementById(i).classList.add("valid");
    }

    let b = countBombs(i);
    document.getElementById(i).setAttribute("data", ""+b);
  }
}

for (let i = 0; i < cellCount; i++) {
  var cell = document.createElement("div");
  cell.setAttribute("class", "cell");
  cell.setAttribute("id", i);

  cell.addEventListener("click", leftClicked);
  cell.addEventListener("contextmenu", rightCliked);
  document.getElementById("grid").appendChild(cell);
}

function rightCliked(event) {
  event.preventDefault();
  console.log(event.target);
  let c = Number(event.target.getAttribute("id"));
  if (document.getElementById(c).classList.contains("flag")) {
    document.getElementById(c).style.backgroundImage = "";
    document.getElementById(c).classList.remove("flag");
    document.getElementById(c).addEventListener("click", leftClicked);
    flagCount++;
    if (arr.includes(c)) {
      validflagCount--;
    }
    
  } else {
    if (flagCount != 0) {
      document.getElementById(c).style.backgroundImage =
        "url(https://thumbs.dreamstime.com/z/waving-red-golf-flag-wind-pole-isolated-white-background-35659216.jpg)";
      document.getElementById(c).style.backgroundSize = "cover";
      document.getElementById(c).classList.add("flag");
      flagCount--;
      if (arr.includes(c)) {
        validflagCount++;
      }
    }
  }

  console.log(c);
  
  if (validflagCount == 10) {
    win();
  }

  console.log(validflagCount);

  // console.log(document.getElementById("flagsLeft"));
  document.getElementById("flagsLeft").innerHTML = flagCount;
}

function leftClicked(event) {
  console.log(event.target);
  let c = Number(event.target.getAttribute("id"));
  document.getElementById(c).classList.add("checked");

  var bc = bombClicked(c);
  if (document.getElementById(c).classList.contains("flag")) {
    flagCount++;
    document.getElementById("flagsLeft").innerHTML = flagCount;
    document.getElementById(c).style.backgroundImage = "";
    document.getElementById(c).classList.remove("flag");
  }
  if (bc) {
    lost();
  } else {
    count++;
    document.getElementById(c).innerHTML = document
      .getElementById(c)
      .getAttribute("data");
    cellColorChange(c);
  }

  if (count == safeCount) {
    win();
  }
}

function countBombs(c) {
  var bombCount = 0;
  if (corners.includes(c)) {
    if (c == 0) {
      if (arr.includes(c + 1)) {
        bombCount++;
      }

      if (arr.includes(c + 10)) {
        bombCount++;
      }

      if (arr.includes(c + 11)) {
        bombCount++;
      }
    }

    if (c == 9) {
      if (arr.includes(c - 1)) {
        bombCount++;
      }

      if (arr.includes(c + 9)) {
        bombCount++;
      }

      if (arr.includes(c + 10)) {
        bombCount++;
      }
    }

    if (c == 90) {
      if (arr.includes(c - 10)) {
        bombCount++;
      }

      if (arr.includes(c - 9)) {
        bombCount++;
      }

      if (arr.includes(c + 1)) {
        bombCount++;
      }
    }

    if (c == 99) {
      if (arr.includes(c - 10)) {
        console.log(c-10)
        bombCount++;
      }

      if (arr.includes(c - 11)) {
        console.log(c-11)
        bombCount++;
      }

      if (arr.includes(c - 1)) {
        console.log(c-1)
        bombCount++;
      }
    }
  } else if (upperCornerRow.includes(c)) {
    if (arr.includes(c + 1)) {
      bombCount++;
    }

    if (arr.includes(c - 1)) {
      bombCount++;
    }

    if (arr.includes(c + 10)) {
      bombCount++;
    }

    if (arr.includes(c + 9)) {
      bombCount++;
    }

    if (arr.includes(c + 11)) {
      bombCount++;
    }
  } else if (lowerCornerRow.includes(c)) {
    if (arr.includes(c + 1)) {
      bombCount++;
    }

    if (arr.includes(c - 1)) {
      bombCount++;
    }

    if (arr.includes(c - 10)) {
      bombCount++;
    }

    if (arr.includes(c - 9)) {
      bombCount++;
    }

    if (arr.includes(c - 11)) {
      bombCount++;
    }
  } else if (leftCornerCol.includes(c)) {
    if (arr.includes(c + 10)) {
      bombCount++;
    }

    if (arr.includes(c - 10)) {
      bombCount++;
    }

    if (arr.includes(c - 9)) {
      bombCount++;
    }

    if (arr.includes(c + 11)) {
      bombCount++;
    }

    if (arr.includes(c + 1)) {
      bombCount++;
    }
  } else if (rightCornerCol.includes(c)) {
    if (arr.includes(c + 10)) {
      bombCount++;
    }

    if (arr.includes(c - 10)) {
      bombCount++;
    }

    if (arr.includes(c + 9)) {
      bombCount++;
    }

    if (arr.includes(c - 1)) {
      bombCount++;
    }

    if (arr.includes(c - 11)) {
      bombCount++;
    }
  } else {
    if (arr.includes(c + 10)) {
      bombCount++;
    }

    if (arr.includes(c - 10)) {
      bombCount++;
    }
    if (arr.includes(c - 11)) {
      bombCount++;
    }

    if (arr.includes(c - 9)) {
      bombCount++;
    }

    if (arr.includes(c + 9)) {
      bombCount++;
    }

    if (arr.includes(c + 11)) {
      bombCount++;
    }

    if (arr.includes(c + 1)) {
      bombCount++;
    }
    if (arr.includes(c - 1)) {
      bombCount++;
    }
  }

  return bombCount;
}

function bombClicked(num) {
  if (arr.includes(num)) {
    return true;
  }

  return false;
}

function lost() {
  //resetCell();
  add_Checked_class();
  removeEL();
  showBomb();
  document.getElementById("result").innerText = "YOU LOSE!";
}

function add_Checked_class(){
  for (let i = 0; i < bombCount; i++) {
    document.getElementById(arr[i]).classList.add("checked");
  }
}

function win() {
  removeEL();
  // showBomb();
  add_Checked_class
  document.getElementById("result").innerText = "YOU WIN!";
}

function removeEL() {
  for (let i = 0; i < cellCount; i++) {
    document.getElementById(i).removeEventListener("click", leftClicked);
    document.getElementById(i).removeEventListener("contextmenu", rightCliked);
  }
}

function showBomb() {
  for (let i = 0; i < bombCount; i++) {
    document.getElementById(arr[i]).style.backgroundImage =
      "url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)";
    document.getElementById(arr[i]).style.backgroundSize = "cover";
    document.getElementById(arr[i]).style.backgroundColor = "rgb(255, 0, 0)";
    //document.getElementById(i).classList.add("checked");
  }
}

function cellColorChange(c) {
  document.getElementById(c).style["background-color"] = "rgb(66, 230, 26)";
  document.getElementById(c).removeEventListener("click", leftClicked);
  document.getElementById(c).removeEventListener("contextmenu", rightCliked);
}

function reset() {
    resetCell();
    scoreReset();
    addListner();
    document.getElementById("resultDisplay").innerText = "";
}

function resetCell() {
  for (let i = 0; i < cellCount; i++) {
    document.getElementById(i).style.backgroundImage = "";
    document.getElementById(i).removeAttribute("style");
    document.getElementById(i).innerHTML = "";
  }

  while(arr.length>0){
      arr.pop();
  }

  count = 0;
  generateBombs();

  console.log(arr);
}

function scoreReset() {
    validFlagCount=0;
    flagCount = 10;
    var score = document.getElementById("flagsLeft").innerHTML = 10;
}

function addListner() {
    for (let i = 1; i <= cellCount; i++) {
        var cell = document.getElementById(i);
        cell.addEventListener("click", leftClicked);
        cell.addEventListener("contextmenu", rightCliked)
    }
}

generateBombs();

console.log(arr);
