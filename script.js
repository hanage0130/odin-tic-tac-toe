function gameBoard() {
  const rows = 3, cols = 3;
  let board = [];
  const emptyCell = 0;
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cols; j++) {
      board[i].push(emptyCell);
    }
  }
  const getBoard = () => board;
  const printBoard = () => {
    console.log(board);
  }
  const updateBoard = (row, col, token) => {
    if (board[row][col] != emptyCell || checkBoard()) {
      return false;
    }
    board[row][col] = token;
    return true;
  }
  const checkBoard = () => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] != emptyCell && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return true;
      }
      if (board[0][i] != emptyCell && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return true;
      }
    }
    if (board[0][0] != emptyCell && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return true;
    }
    if (board[0][2] != emptyCell && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return true;
    }
    return false;
  }
  return { getBoard, printBoard, updateBoard, checkBoard };
}
function gameController(p1Name, p2Name) {
  const board = gameBoard();
  const players = [{ name: p1Name, token: 1 }, { name: p2Name, token: 2 }];
  let activePlayer = players[0];
  const switchPlayer = () => activePlayer = (activePlayer === players[0] ? players[1] : players[0]);
  const getActivePlayer = () => activePlayer;
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  }
  const playRound = (row, col) => {
    if (!board.updateBoard(row, col, getActivePlayer().token)) {
      console.log("Invalid!");
      return;
    }
    if (board.checkBoard()) {
      console.log(`${getActivePlayer().name} WIN!`);
      return;
    }
    switchPlayer();
    printNewRound();
  }
  return { playRound, activePlayer };

}
function displayController() {
  let p1Name, p2Name;
  const initGame = () => {
    p1Name = prompt();
    p2Name = prompt();
    newGame();
  }
  const newGame = () => {
    const game = gameController(p1Name, p2Name);
  }
  return { initGame };
}

displayController().initGame();

// function TicTacToe() {
//   let p1Name = "player1", p2Name = "player2";
//   let p1Score = 0, p2Score = 0;
//   let board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
//   let turn = 1;
//   const updateScoreboard = () => {
//     let scoreboard = document.querySelector(".scoreboard");
//     scoreboard.textContent = `${p1Name}:${p1Score} ${p2Name}:${p2Score}`;
//   }
//   const initGame = () => {
//     p1Name = prompt("input player1 name");
//     p2Name = prompt("input player2 name");
//     turn = 1;
//     let container = document.querySelector(".container");
//     container.textContent = "";
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         let btn = document.createElement("button");
//         btn.classList.add(`btn${i}${j}`);
//         btn.style.gridRow = `${i + 1}`;
//         btn.style.gridColumn = `${j + 1}`;
//         // btn.style.backGroundColor = "gray";
//         btn.addEventListener("click", () => {
//           playTurn(i, j);
//         });
//         container.appendChild(btn);
//       }
//     }
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         board[i][j] = '-';
//       }
//     }
//     updateScoreboard();
//     let newgamebtn = document.querySelector(".newgamebtn");
//     newgamebtn.addEventListener("click", newGame);
//   }
//   const newGame = () => {
//     turn = 1;
//     let container = document.querySelector(".container");
//     container.textContent = "";
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         let btn = document.createElement("button");
//         btn.classList.add(`btn${i}${j}`);
//         btn.style.gridRow = `${i + 1}`;
//         btn.style.gridCol = `${j + 1}`;
//         // btn.style.backGroundColor = "gray";
//         btn.addEventListener("click", () => {
//           playTurn(i, j);
//         });
//         container.appendChild(btn);
//       }
//     }
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         board[i][j] = '-';
//       }
//     }
//     let resultmsg = document.querySelector(".resultmsg");
//     resultmsg.textContent = "";
//   }
//   const num = {};
//   num["-"] = 0;
//   num["x"] = 1;
//   num["o"] = 2;
//   const msg = ["Draw!", "Player1 Win!", "Player2 Win!"];
//   const symbol = "-xo";
//   const color = ["gray", "blue", "red"];
//   const judgeBoard = () => {
//     for (let i = 0; i < 3; i++) {
//       if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
//         const chr = board[i][0];
//         if (chr != '-') {
//           return num[chr];
//         }
//       }
//       if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
//         const chr = board[0][i];
//         if (chr != '-') {
//           return num[chr];
//         }
//       }
//     }
//     {
//       if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
//         const chr = board[0][0];
//         if (chr != '-') {
//           return num[chr];
//         }
//       }
//     }
//     {
//       if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
//         const chr = board[0][2];
//         if (chr != '-') {
//           return num[chr];
//         }
//       }
//     }
//     return 0;
//   }
//   const playTurn = (x, y) => {
//     console.log(board[x][y]);
//     console.log(turn, x, y);
//     if (board[x][y] != '-') {
//       return;
//     }
//     if (turn === 10) {
//       return;
//     }
//     let btn = document.querySelector(`.btn${x}${y}`);
//     if (turn % 2 === 1) {
//       board[x][y] = 'x';
//       btn.style.backgroundColor = "blue";
//       btn.textContent = "x";
//     } else {
//       board[x][y] = 'o';
//       btn.style.backgroundColor = "red";
//       btn.textContent = "o";
//     }
//     turn++;
//     let res = judgeBoard();
//     if (res != 0) {
//       if (res === 1) {
//         p1Score++;
//       } else {
//         p2Score++;
//       }
//       turn = 10;
//       updateScoreboard();
//       let resultmsg = document.querySelector(".resultmsg");
//       resultmsg.textContent = `${(res === 1 ? p1Name : p2Name)} win`;
//     }
//     if (res === 0 && turn === 10) {
//       let resultmsg = document.querySelector(".resultmsg");
//       resultmsg.textContent = "Draw";
//     }
//     // const p = (turn % 2 === 1 ? 1 : 2);
//     // while (true) {
//     //   console.log(`player${p} turn`);
//     //   let choice = prompt().split(" ").map(Number);
//     //   if (choice.length === 1) {
//     //     console.log("invalid");
//     //     continue;
//     //   }
//     //   if (!Number.isInteger(choice[0]) || !Number.isInteger(choice[1])) {
//     //     console.log("invalid");
//     //     continue;
//     //   }
//     //   let x = choice[0], y = choice[1];
//     //   if (x < 0 || x >= 3 || y < 0 || y >= 3) {
//     //     console.log("invalid");
//     //     continue;
//     //   }
//     //   if (board[x][y] != '-') {
//     //     console.log("invalid");
//     //     continue;
//     //   }
//     //   board[x][y] = symbol[p];
//     //   break;
//     // }

//   }
//   const printDebug = () => {
//     console.log(board);
//   }
//   // const playGame = () => {
//   //   initGame();
//   //   printDebug();
//   //   // let res = 0;
//   //   // for (let turn = 1; turn <= 9; turn++) {
//   //   //   playTurn(turn);
//   //   //   printDebug();
//   //   //   res = judgeBoard();
//   //   //   if (res != 0) {
//   //   //     break;
//   //   //   }
//   //   // }
//   //   // console.log(res, msg[res]);
//   // }
//   return { initGame }
// }

// let game = TicTacToe();
// game.initGame();