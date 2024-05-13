import { useState } from "react";

export default function Player({defaultName, playerSymbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(defaultName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditing(){
        setIsEditing((editing) => !editing);
        if(isEditing){
            onChangeName(playerSymbol, playerName);
        }
    }

    function handlePlayerNameChange(event){
        setPlayerName(event.target.value);
    }

    let editedPlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing){
        editedPlayerName = <input type="text" required value={playerName} onChange={handlePlayerNameChange} />;
    }
 
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editedPlayerName}
                <span className="player-symbol">{playerSymbol}</span>
            </span>
            <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}