function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner & <p>{winner} won!</p>}
      {!winner & <p>it&apos;s a draw</p>}
      <p>
        <button onClick={onRestart}>rematch!</button>
      </p>
    </div>
  );
}

export default GameOver;
