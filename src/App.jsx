import Player from "./components/Player";

function App() {

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player defaultName="Player 1" playerSymbol="X" />
          <Player defaultName="Player 2" playerSymbol="X" />
        </ol>
        GAME BOARD
      </div>
    </main>
  )
}

export default App
