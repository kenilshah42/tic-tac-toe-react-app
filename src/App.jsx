import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer,setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex){
    setActivePlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
        let currentPlayer = 'X';

        if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
          currentPlayer = 'O';
        }

        const editedTurns = [
            {
              square : {row : rowIndex, col: colIndex},
              player : currentPlayer
            },
            ...prevTurns,
        ];

        return editedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player defaultName="Player 1" playerSymbol="X" isActive={activePlayer === 'X'}/>
          <Player defaultName="Player 2" playerSymbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSqaure = {handleSelectSquare} turns = {gameTurns} />
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
