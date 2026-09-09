console.log("TicTacToe");

function TicTacToe() {
  let p1Name = "player1", p2Name = "player2";
  let board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
  const initGame = () => {
    turn = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = '-';
      }
    }
  }
  const num = {};
  num["-"] = 0;
  num["x"] = 1;
  num["o"] = 2;
  const msg = ["Draw!", "Player1 Win!", "Player2 Win!"];
  const symbol = "-xo";
  const judgeBoard = () => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        const chr = board[i][0];
        if (chr != '-') {
          return num[chr];
        }
      }
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        const chr = board[0][i];
        if (chr != '-') {
          return num[chr];
        }
      }
    }
    {
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        const chr = board[0][0];
        if (chr != '-') {
          return num[chr];
        }
      }
    }
    {
      if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        const chr = board[0][2];
        if (chr != '-') {
          return num[chr];
        }
      }
    }
    return 0;
  }
  const playTurn = (turn) => {
    const p = (turn % 2 === 1 ? 1 : 2);
    while (true) {
      console.log(`player${p} turn`);
      let choice = prompt().split(" ").map(Number);
      if (choice.length === 1) {
        console.log("invalid");
        continue;
      }
      if (!Number.isInteger(choice[0]) || !Number.isInteger(choice[1])) {
        console.log("invalid");
        continue;
      }
      let x = choice[0], y = choice[1];
      if (x < 0 || x >= 3 || y < 0 || y >= 3) {
        console.log("invalid");
        continue;
      }
      if (board[x][y] != '-') {
        console.log("invalid");
        continue;
      }
      board[x][y] = symbol[p];
      break;
    }

  }
  const printDebug = () => {
    console.log(board);
  }
  const playGame = () => {
    initGame();
    printDebug();
    let res = 0;
    for (let turn = 1; turn <= 9; turn++) {
      playTurn(turn);
      printDebug();
      res = judgeBoard();
      if (res != 0) {
        break;
      }
    }
    console.log(res, msg[res]);
  }
  return { playGame }
}

let game = TicTacToe();
game.playGame();
console.log(game.p1Name);