import "./GameOver.css"

const GameOver = ({ restartGame, score }) => {
  return (
    <div className="game-over">
      <h1>Fim de Jogo!</h1>
      <h2>A sua pontuacao foi : <span>{score}</span></h2>
      <button onClick={restartGame}>Reiniciar Jogo</button>

    </div>
  )
}

export default GameOver;