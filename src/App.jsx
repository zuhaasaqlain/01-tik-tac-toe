import { useState } from "react";
import GameBoard from "./assets/components/GameBoard";
import Player from "./assets/components/Player";
import Log from "./assets/components/Log";
import GameOver from "./assets/components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combination";

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

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");

  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = deriveActivePlayer(gameTurns);
  console.log("game turns", gameTurns);

  let gameBoard = initialGameBoard;
  // driving state
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

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
      winner = firstSqaureSymbol;
    }
  }

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
        {(winner || hasDraw) && <GameOver winner={winner} />}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
