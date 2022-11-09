const boardEl = document.getElementById('board');
const boardChildrenEl = boardEl.children;
const currentTurnEl = document.getElementById('currentTurn');
const gameStatusEl = document.getElementById('gameStatus');
const startGameBtn = document.getElementById('startGameBtn');
const winnerEl = document.getElementById('winnerText');
const whoWonEl = document.getElementById('winnerWho');

const TILE_LISTEN_REMOVE = 'TILE_LISTEN_REMOVE';
const TILE_LISTEN_ADD = 'TILE_LISTEN_ADD';
const MOVE_PLAYER = 'X';
const MOVE_COMPUTER = 'O';
const COMPUTER = 'Computer';
const PLAYER = 'Player';
const GAME_DRAW = 'Draw';
const GAME_STATUS_STARTED = 'Started';
const GAME_STATUS_ENDED = 'Stopped';
const START_BUTTON_RESTART_MSG = 'Restart';
const GAME_TURN_NA = 'N/A';
let lastWinCombo = null;
let activeTurn = GAME_TURN_NA;
let gameStatus = GAME_STATUS_ENDED;

currentTurnEl.textContent = activeTurn;
gameStatusEl.textContent = gameStatus;

let tilesArray = [];
let gameBoardArray = [];

let computerScore = {
  diagOne: [1, 5, 9],
  diagTwo: [3, 5, 7],
  hBottom: [7, 8, 9],
  hMiddle: [4, 5, 6],
  hTop: [1, 2, 3],
  vLeft: [1, 4, 7],
  vMiddle: [2, 5, 8],
  vRight: [3, 6, 9],
};
let playerScore = {
  diagOne: [1, 5, 9],
  diagTwo: [3, 5, 7],
  hBottom: [7, 8, 9],
  hMiddle: [4, 5, 6],
  hTop: [1, 2, 3],
  vLeft: [1, 4, 7],
  vMiddle: [2, 5, 8],
  vRight: [3, 6, 9],
};

const populateTilesArray = () => {
  tilesArray = [];
  for (child of boardChildrenEl) {
    tilesArray.push(child);
  }
};

const populateGameBoardArray = () => {
  gameBoardArray = [];
  for (item of tilesArray) {
    gameBoardArray.push(parseInt(item.id));
  }
};

// Iterating through object and sub-array
// for (const combos in playerScore) {
//   let msg = `combo: ${combos} winning positions: `;
//   for (const positions of playerScore[combos]) {
//     msg += `${positions}`;
//   }
//   console.log(msg);
// }

// Find value in array and replace at index with choiceType (computer or player)
const addChoice = (arr, selectedTilePos, choiceType) => {
  const index = arr.indexOf(selectedTilePos);
  if (index !== -1) {
    arr.splice(index, 1, choiceType);
  }
};

const updateScoreCard = (obj, tileSelection, choiceType) => {
  for (const combos in obj) {
    const arr = obj[combos];
    addChoice(arr, tileSelection, choiceType);
  }
};

// Pass in who won, set all text and stuff
const gameEnd = (winner, winCombo = null) => {
  updateTileListeners(tilesArray, TILE_LISTEN_REMOVE);
  gameStatus = GAME_STATUS_ENDED;
  winnerEl.textContent = 'Winner';
  whoWonEl.textContent = winner;
  gameStatusEl.textContent = gameStatus;
  gameStatusEl.classList.remove('text-green-700');
  gameStatusEl.classList.add('text-orange-700');
  activeTurn = GAME_TURN_NA;
  currentTurnEl.textContent = GAME_TURN_NA;
  // console.log(
  //   `here is the activeTurn: ${activeTurn} and the currentTurnEl.textContent: ${currentTurnEl.textContent}`
  // );

  if (winner === PLAYER) {
    console.log(`${winner} won with the combo: ${winCombo}`);
    lastWinCombo = winCombo;
    document.getElementById(winCombo).style.opacity = '1';
    whoWonEl.classList.add('text-green-700');
  } else if (winner === COMPUTER) {
    document.getElementById(winCombo).style.opacity = '1';
    console.log(`${winner} won with the combo: ${winCombo}`);
    lastWinCombo = winCombo;
    whoWonEl.classList.add('text-red-700');
  } else if (winner === GAME_DRAW) {
    console.log(`Nobody won it was a draw`);
    winnerEl.textContent = 'No Winner';
    whoWonEl.classList.add('text-orange-700');
  }
};

// TODO: make more dry
const checkForWinner = (who) => {
  let obj = {};
  let whoMark = null;

  if (who === PLAYER) {
    obj = playerScore;
    whoMark = MOVE_PLAYER;
  } else if (who === COMPUTER) {
    obj = computerScore;
    whoMark = MOVE_COMPUTER;
  }

  for (const combo in obj) {
    let winCount = 0;
    const arr = obj[combo];

    for (const item of arr) {
      if (item === whoMark) {
        winCount++;
      }
    }

    if (winCount === 3) {
      gameEnd(who, combo);
      break;
    } else if (gameBoardArray.length === 0 && winCount !== 3) {
      gameEnd(GAME_DRAW);
      break;
    }
  }

  // for (const combo in playerObj) {
  //   let playerWinCount = 0;
  //   const arr = playerObj[combo];

  //   for (const item of arr) {
  //     if (item === MOVE_PLAYER) {
  //       playerWinCount++;
  //     }
  //   }

  //   if (playerWinCount === 3) {
  //     gameEnd(PLAYER, combo);
  //     break;
  //   } else if (gameBoardArray.length === 0 && playerWinCount !== 3) {
  //     gameEnd(GAME_DRAW);
  //     break;
  //   }
  // }

  // for (const combo in computerObj) {
  //   let computerWinCount = 0;
  //   const arr = computerObj[combo];

  //   for (const item of arr) {
  //     if (item === MOVE_COMPUTER) {
  //       computerWinCount++;
  //     }
  //   }

  //   if (computerWinCount === 3) {
  //     gameEnd(COMPUTER);
  //     break;
  //   } else if (gameBoardArray.length === 0 && computerWinCount !== 3) {
  //     gameEnd(GAME_DRAW);
  //     break;
  //   }
  // }

  // const winnerCond = 'XXX';
  // let winnerCount = 0;
  // for (const combo in obj) {
  //   const arr = obj[combo];
  //   console.log(arr);

  //   // if (arr[0] === MOVE_PLAYER) {
  //   //   winnerCount++;
  //   //   break;
  //   // } else if (arr[1] === MOVE_PLAYER) {
  //   //   winnerCount++;
  //   //   break;
  //   // } else if (arr[2] === MOVE_PLAYER) {
  //   //   winnerCount++;
  //   //   break;
  //   // }

  //   // arr.filter((value, index, arr) => {
  //   //   if (value === MOVE_PLAYER) {
  //   //     winnerCount++;
  //   //   }
  //   // });

  //   // if (arr[0] === MOVE_PLAYER) {

  //   // }

  //   // console.log('arr[0]:', arr[0]);

  //   // console.log('----------');
  //   // console.log('combo: ', combo);

  //   // let i = 0;
  //   // for (const position of obj[combo]) {
  //   //   if (position === MOVE_PLAYER) {

  //   //   }
  //   //   i++;
  //   // }

  //   // let winCount = 0;
  //   // arr.forEach((position, index, arr) => {
  //   //   console.log('position: ', position);
  //   //   console.log('index: ', index);
  //   //   // if (position === MOVE_PLAYER && index === 0) {
  //   //   //   console.log(`index: ONE has an X!!`);
  //   //   //   winCount++;
  //   //   // }

  //   //   // if (position === MOVE_PLAYER && index === 1) {
  //   //   //   console.log(`index: TWO has an X!!`);
  //   //   //   winCount++;
  //   //   // }

  //   //   // if (position === MOVE_PLAYER && index === 2) {
  //   //   //   console.log(`index: THREE has an X!!`);
  //   //   //   winCount++;
  //   //   // }
  //   //   if (
  //   //     position === MOVE_PLAYER &&
  //   //     index === 0 &&
  //   //     position === MOVE_PLAYER &&
  //   //     index === 1 &&
  //   //     position === MOVE_PLAYER &&
  //   //     index === 2
  //   //   ) {
  //   //     console.log(`index: ONE has an X!!`);
  //   //     console.log('*****WINNNNERRRRRRRRRR******');
  //   //   }
  //   // });
  //   // if (winCount === 3) {
  //   //   console.log('*****WINNNNERRRRRRRRRR******');
  //   //   break;
  //   // }
  //   // console.log('wincount: ', winCount);
  // }
  // console.log('winnercount: ', winnerCount);
};

// console.log(`tilesArray: ${tilesArray}`);
// console.log(`board: ${board}`);
// console.log(`board children: ${boardChildren}`);

// Could have score objects (one for PC and one for human)
// after each turn check pos for MOVE_PLAYER and 'O' then push those to objects
// if any of the sub-arrays for player have all [X, X, X] or PC have [O, O, O]
// then winner is selected

// Just learned about filter to determine if length of winning combo property has
// a length === 3, then there would be a winner.
// As something additional depending on winning combo, could add class to those ID's
// to make a green border or something, or a circle around to show winning combo?
const addPlayerScore = (playerScore, currTile) => {
  const currTilePos = currTile.id;
  playerScore.push();
};

const changeTurn = (cTurn) => {
  currentTurnEl.textContent = cTurn;
  activeTurn = cTurn;

  if (cTurn === COMPUTER) {
    addComputerChoice();
  }
};

const updateGameBoard = (markedTile) => {
  const index = gameBoardArray.indexOf(parseInt(markedTile));
  // console.log('game board array before: ', gameBoardArray);
  gameBoardArray.splice(index, 1);
  // console.log('marked tile: ', markedTile);
  // console.log('index: ', index);
  // console.log('game board array after: ', gameBoardArray);
};

const addPlayerChoice = (selectedTile) => {
  if (
    selectedTile.textContent !== '' ||
    activeTurn === COMPUTER ||
    gameStatus === GAME_STATUS_ENDED
  ) {
    return;
  }
  selectedTile.textContent = MOVE_PLAYER;
  const selectedTileID = selectedTile.id;
  console.log(`tile with id of: ${selectedTileID} an ${MOVE_PLAYER} was added`);
  updateGameBoard(selectedTileID);
  updateScoreCard(playerScore, +selectedTileID, MOVE_PLAYER);
  // console.log(playerScore, computerScore);
  checkForWinner(PLAYER);
  if (gameStatus !== GAME_STATUS_ENDED) {
    changeTurn(COMPUTER);
  }
};

const addComputerChoice = () => {
  if (gameStatus === GAME_STATUS_ENDED) {
    return;
  }
  // First version. Make a random choice
  // Check groups for at least 2 player marks
  // If one group contains 2 player marks, put cpu mark in that array
  // If groups with 2 player marks > 1 make a random choice between those two
  // Else make a random choice

  // Get random number
  const getRandomComputerChoice = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  let computerChoice = getRandomComputerChoice(1, 9);
  // console.log('computer choice: ', computerChoice);

  // Check game board if choice is already marked, if marked generate another random choice
  while (gameBoardArray.length > 0) {
    // console.log('computer choice: ', computerChoice);
    let foundIt = gameBoardArray.indexOf(computerChoice);
    if (foundIt !== -1) {
      // remove computer choice to array board
      // console.log('valid choice exists on board. Removing tile... ');
      // console.log('game board array: ', gameBoardArray);
      const selectedTile = document.getElementById(computerChoice);
      selectedTile.textContent = MOVE_COMPUTER;
      updateGameBoard(computerChoice);
      updateScoreCard(computerScore, computerChoice, MOVE_COMPUTER);
      // console.log(playerScore, computerScore);
      checkForWinner(COMPUTER);
      if (gameStatus !== GAME_STATUS_ENDED) {
        changeTurn(PLAYER);
      }
      break;
    } else {
      // guess again
      // console.log(
      //   'computer chose already removed tile from gameboard. Guessing again...'
      // );
      computerChoice = getRandomComputerChoice(1, 9);
      // console.log('game board array: ', gameBoardArray);
      // console.log('game board array length: ', gameBoardArray.length);
      // console.log('game status: ', gameStatus);
      // console.log('found it: ', foundIt);
    }
  }
};

const updateTileListeners = (action) => {
  if (action === TILE_LISTEN_ADD) {
    for (const tile of tilesArray) {
      tile.addEventListener('click', addPlayerChoice.bind(this, tile));
    }
    console.log('tile listeners added');
  } else if (action === TILE_LISTEN_REMOVE) {
    for (const tile of tilesArray) {
      tile.removeEventListener('click', addPlayerChoice.bind(this, tile));
    }
    console.log('tile listeners removed');
  }
};

const startGameMessages = () => {
  gameStatus = GAME_STATUS_STARTED;
  gameStatusEl.classList.remove('text-orange-700');
  gameStatusEl.classList.add('text-green-700');
  gameStatusEl.textContent = GAME_STATUS_STARTED;
  console.log('game was started');
  startGameBtn.textContent = START_BUTTON_RESTART_MSG;
};

const resetTileText = () => {
  for (tile of boardChildrenEl) {
    tile.textContent = '';
  }
};

const resetGame = () => {
  gameStatus = GAME_STATUS_ENDED;
  updateTileListeners(TILE_LISTEN_REMOVE);
  resetTileText();
  document.getElementById(lastWinCombo).style.opacity = '0';
  gameStatusEl.classList.remove('text-green-700');
  gameStatusEl.classList.add('text-orange-700');
  whoWonEl.classList.remove('text-red-700');
  whoWonEl.classList.remove('text-green-700');
  console.log('game was reset');
  gameStatusEl.textContent = GAME_STATUS_ENDED;
  winnerEl.textContent = '';
  whoWonEl.textContent = '';

  computerScore = {
    diagOne: [1, 5, 9],
    diagTwo: [3, 5, 7],
    hBottom: [7, 8, 9],
    hMiddle: [4, 5, 6],
    hTop: [1, 2, 3],
    vLeft: [1, 4, 7],
    vMiddle: [2, 5, 8],
    vRight: [3, 6, 9],
  };
  playerScore = {
    diagOne: [1, 5, 9],
    diagTwo: [3, 5, 7],
    hBottom: [7, 8, 9],
    hMiddle: [4, 5, 6],
    hTop: [1, 2, 3],
    vLeft: [1, 4, 7],
    vMiddle: [2, 5, 8],
    vRight: [3, 6, 9],
  };

  startGame();
};

const startGame = () => {
  if (gameStatus === GAME_STATUS_STARTED) {
    return;
  }
  populateTilesArray();
  populateGameBoardArray();
  startGameMessages();
  changeTurn(PLAYER);
  updateTileListeners(TILE_LISTEN_ADD);

  startGameBtn.addEventListener('click', resetGame);
};

startGameBtn.addEventListener('click', startGame);
