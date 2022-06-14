import "./Game.css"
import { useState, useRef } from "react"

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

  const letterInputRef = useRef(null)
  const [letter, setLetter] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("")

    letterInputRef.current.focus()
  }

  return (

    <div className="game card">
      <p className="points">
        <span>Pontuacao: {score}</span>
      </p>
      <h1>Adivinhe a Palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Voce ainda tem {guesses} tentativas</p>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhas uma letra da palavra:</p>

        {/*input letter */}
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength={1} required
            onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
          <button>Jogar!</button>
        </form>
      </div>

      <div className="wrogLettersContainer">
        <p>Letras ja utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}> {letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game