
//CSS
import './App.css';
//React
import{useCallback,useEffect,useState} from "react";
//DATE
import{ wordsList} from "./data/Words"
//COMPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages =[
  {id:1,name: "start"},
  {id:2,name: "game"},
  {id:3,name: "end"},
]

const guessesqty = 3

function App() {
  const [gameStage,setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList) 

const [pickedWord,setPickedWord] = useState("")
const [pickedCategory,setPickedCategory] = useState("")
const [letters,setLetters] = useState([])

const [guessedLetters,setGuessedLetters] = useState([])
const [wrongLetters,setWrongLetters] = useState([])
const [guesses,setGuesses] = useState(guessesqty)
const [score,setEscore] = useState(0)

const pickWordAndCategory = useCallback(() => {
  
  //pick random category
  const categories = Object.keys(words);
  const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
  console.log(category)

  //pick a random word

  const word = words[category][Math.floor(Math.random() * words[category].length)]
  console.log(word)
  return {word, category}
},[words])

  
  //iniciar o jogo Letra secreta
  const startGame = useCallback(
    
  () => {
    //pick word and pick category
    const{word,category} = pickWordAndCategory();
    //resetar stados
    clearLettersStates()
    
    // creat an array of letters
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l)=>l.toLowerCase())

    console.log(word,category)
    console.log(wordLetters)

    //fill sates
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  },[pickWordAndCategory] )

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    //checar se a letra ja foi utilizada
    if ((guessedLetters.includes(normalizedLetter || wrongLetters.includes(normalizedLetter)))) {
      return
    }
  // adicionando letras  e removendo chances 
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) =>[
        ...actualGuessedLetters, normalizedLetter
      ])
    }else{
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
    
  }

  const clearLettersStates = () => {
    setGuessedLetters([])
    setWrongLetters([])

  }

  useEffect(() => {
    if (guesses<=0) {
      //reset states
      clearLettersStates()

      setGameStage(stages[2].name)
    }
    }, [guesses])
  
   // console.log(guessedLetters)
   // console.log(wrongLetters)
  
    useEffect(() => {
      const uniqueLetters = [...new Set(letters)];
      
      //condicao de vitoria
      if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
        // acicionar score
        setEscore((actualScore) => (actualScore =+ 100))
        
        //reiniciar jogo
        startGame()
      }
      
      
      
    }, [guessedLetters,letters,startGame])
    
  //reiniciar jogo
  const restartGame = () => {
    setEscore(0)
    setGuesses(guessesqty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters} 
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />}
      {gameStage === "end" && <GameOver restartGame={restartGame} score={score}/>}
      
    </div>
  );
}

export default App;
