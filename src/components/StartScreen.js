import "./StartScreen.css"

const StartScreen = ({startGame}) => {
  return (
    <div className="start ">
      <div className="card">
      
        <div className="word">
          
          <div className="card1"><h2>SECRET</h2></div>
          <h1>WORD</h1>
        </div>
      </div>
      <button onClick={startGame}>Iniciar Jogo</button>
    
      
    </div>
  )
}

export default StartScreen