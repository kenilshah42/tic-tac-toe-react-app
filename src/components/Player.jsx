import { useState } from "react";

export default function Player({defaultName, playerSymbol}) {
    const [playerName, setPlayerName] = useState(defaultName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditing(){
        setIsEditing((editing) => !editing);
    }

    function handlePlayerNameChange(event){
        setPlayerName(event.target.value);
    }

    let editedPlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing){
        editedPlayerName = <input type="text" required value={playerName} onChange={handlePlayerNameChange} />;
    }
 
    return (
        <li>
            <span className="player">
                {editedPlayerName}
                <span className="player-symbol">{playerSymbol}</span>
            </span>
            <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}