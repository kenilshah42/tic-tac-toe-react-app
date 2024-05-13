import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveCurrentPlayer(gameTurns) {
    let currentPlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X : 'Player 1',
    O : 'Player 2'
  });

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveCurrentPlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

  for(const turn of gameTurns){
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && (firstSquareSymbol === secondSquareSymbol) && (firstSquareSymbol === thirdSquareSymbol)){
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns((prevTurns) => {
        const currentPlayer = deriveCurrentPlayer(prevTurns);
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

  function handleReset(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player defaultName="Player 1" playerSymbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player defaultName="Player 2" playerSymbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleReset}/> }
        <GameBoard onSelectSqaure = {handleSelectSquare} board = {gameBoard} />
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
