function gameBoard() {
  const rows = 3, cols = 3;
  let board = [];
  const isEmptyCell = 0;
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cols; j++) {
      board[i].push(isEmptyCell);
    }
  }
  const getBoardArray = () => board;
  const printBoard = () => {
    console.log(board);
  }
  const updateBoard = (row, col, token) => {
    if (board[row][col] != isEmptyCell || checkBoard()) {
      return false;
    }
    board[row][col] = token;
    return true;
  }
  const hasWinner = 1, isDraw = 0, isPlaying = -1;
  let gameState = isPlaying;
  const checkBoard = () => {
    for (let i = 0; i < rows; i++) {
      if (board[i][0] != isEmptyCell && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        gameState = hasWinner;
        return;
      }
    }
    for (let i = 0; i < cols; i++) {
      if (board[0][i] != isEmptyCell && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        gameState = hasWinner;
        return;
      }
    }
    if (board[0][0] != isEmptyCell && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      gameState = hasWinner;
      return;
    }
    if (board[0][2] != isEmptyCell && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      gameState = hasWinner;
      return;
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j] === isEmptyCell) {
          return;
        }
      }
    }
    gameState = isDraw;
  }
  const getGameState = () => gameState;
  return { getBoardArray, printBoard, updateBoard, checkBoard, getGameState, rows, cols, isEmptyCell, hasWinner, isDraw, isPlaying };
}
function gameController(p1Name, p2Name) {
  const board = gameBoard();
  const players = [{ name: "dummy", token: 0, symbol: "-" }, { name: p1Name, token: 1, symbol: "x" }, { name: p2Name, token: 2, symbol: "o" }];
  let activePlayer = players[1];
  const switchPlayer = () => activePlayer = (activePlayer === players[1] ? players[2] : players[1]);
  const getActivePlayer = () => activePlayer;
  const printNewRound = () => {
    board.printBoard();
    // console.log(`${getActivePlayer().name}'s turn.`);
  }
  let gameWinner = players[0];
  const playRound = (row, col) => {
    if (!board.updateBoard(row, col, getActivePlayer().token) || board.getGameState() != board.isPlaying) {
      // console.log("Invalid!");
      return false;
    }
    board.checkBoard();
    if (board.getGameState() === board.hasWinner) {
      // console.log(`${getActivePlayer().name} WIN!`)
      // console.log(activePlayer);
      gameWinner = activePlayer;
      return true;
    }
    switchPlayer();
    // printNewRound();
    return true;
  }
  const getBoard = () => board;
  const getGameWinner = () => gameWinner;
  return { playRound, getBoard, getActivePlayer, getGameWinner, players };

}
function displayController() {
  let p1Name, p2Name;
  const initGame = () => {
    p1Name = prompt();
    p2Name = prompt();
    initDisplay();
    newGame();
  }
  const newGame = () => {
    const game = gameController(p1Name, p2Name);
    const board = document.querySelector(".board");
    board.textContent = "";
    const messageElement = document.querySelector(".message-element");
    messageElement.textContent = "";
    for (let i = 0; i < game.getBoard().rows; i++) {
      for (let j = 0; j < game.getBoard().cols; j++) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.classList.add(`cell-${i}-${j}`);
        cell.classList.add("player-0");
        board.appendChild(cell);
        cell.addEventListener("click", () => {
          if (game.playRound(i, j)) {
            updateDisplay(game);
          }
        });
      }
    }
    updateDisplay(game);
  }
  const initDisplay = () => {
    const container = document.querySelector(".container");
    const controls = document.createElement("div");
    controls.classList.add("controls");
    const newGameButton = document.createElement("button");
    newGameButton.classList.add("new-game-button");
    newGameButton.textContent = "New Game";
    newGameButton.addEventListener("click", newGame);
    controls.appendChild(newGameButton);
    container.appendChild(controls);
    const board = document.createElement("div");
    board.classList.add("board");
    container.appendChild(board);
    const messageElement = document.createElement("div");
    messageElement.classList.add("message-element");
    container.appendChild(messageElement);
  }
  const updateDisplay = (game) => {
    for (let i = 0; i < game.getBoard().rows; i++) {
      for (let j = 0; j < game.getBoard().cols; j++) {
        const cell = document.querySelector(`.cell-${i}-${j}`);
        const token = game.getBoard().getBoardArray()[i][j];
        const symbol = game.players[token].symbol;
        // console.log(token, symbol);
        cell.textContent = symbol;
        for (let k = 0; k <= 2; k++) {
          cell.classList.remove(`player-${k}`);
        }
        cell.classList.add(`player-${token}`);
      }
    }
    const gameState = game.getBoard().getGameState();
    const messageElement = document.querySelector(".message-element");
    if (gameState === game.getBoard().isDraw) {
      messageElement.textContent = "Draw";
    } else if (gameState === game.getBoard().hasWinner) {
      messageElement.textContent = `${game.getGameWinner().name} WIN!`;
    } else {
      messageElement.textContent = `${game.getActivePlayer().name}'s turn!`;
    }
  }
  return { initGame };
}

const game = displayController().initGame();

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