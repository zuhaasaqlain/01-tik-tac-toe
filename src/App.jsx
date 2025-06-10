import { useState } from "react";
import GameBoard from "./assets/components/GameBoard";
import Player from "./assets/components/Player";
import Log from "./assets/components/Log";
import GameOver from "./assets/components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combination";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function drivedGameBoard(gameBoard) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  // driving state
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function handleDrivedWinner(gameBoard, players) {
  let winner = null;

  for (const combinastion of WINNING_COMBINATIONS) {
    console.log("combinastion", combinastion);

    const firstSqaureSymbol =
      gameBoard[combinastion[0].row][combinastion[0].column];
    const secondSqaureSymbol =
      gameBoard[combinastion[1].row][combinastion[1].column];
    const thirdSqaureSymbol =
      gameBoard[combinastion[2].row][combinastion[2].column];

    if (
      firstSqaureSymbol &&
      firstSqaureSymbol === secondSqaureSymbol &&
      firstSqaureSymbol === thirdSqaureSymbol
    ) {
      winner = players[firstSqaureSymbol];
    }
  }

  return winner;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  let activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = drivedGameBoard(gameTurns);
  const winner = handleDrivedWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      // let currentPlayer = "X";
      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }

      const currentPlayer = deriveActivePlayer(prevTurns);

      let updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
