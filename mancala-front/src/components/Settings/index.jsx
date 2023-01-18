import useGame from "hooks/useGame";
import React from "react";
import { Link } from "react-router-dom";


const Settings = ({open, setOpen}) => {
    const { initGame } = useGame();

    const handleRestart = () => {
        initGame();
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    if (!open) return null;
    return (
        <div className="modalBackground" onClick={handleCancel}>
            
            <div className="modalContainer">
                <div className="title">
                    <h1>Settings</h1>
                </div>
                <div className="body">
                    <button className="cancelBtn" onClick={handleRestart}>
                        Restart
                    </button>
                    <button className="cancelBtn" onClick={handleRestart}>
                        Musique
                    </button>
                    <Link className="cancelBtn" to={"/"}>
                        Back to menu
                    </Link>
                    <button className="cancelBtn" onClick={handleCancel}>
                        cancel
                    </button>
                </div>
            
            </div>
        </div>
    );
};

export default Settings;

/* how to play : 
- The first player chooses a pit on his side of the board and collects all his seeds;
- Counterclockwise, the player places a stone in each pit until they have no more seeds in their hand 
Counterclockwise, the player drops a stone into each pit until they have no more seeds in their hand;
- The player may place a seed in any pit on the board (including his or her 
The player may drop a seed into any pit on the board (including his own store) except the opponent's store;
- If the last seed deposited lands in the player's store, that player may play an 
If the last seed dropped lands in the player's store, that player may play an extra turn;
- If the last seed dropped lands in an empty pit on the player's side, this seed 
and all the seeds in the pit on the opposite side (i.e. an opponent's pit) 
go to that player, and are placed in his store;
- When a player has no more seeds in all the pits on his side, the game ends, and the 
When a player has no more seeds in all the pits on his side, the game ends, and the opposing player can take all the remaining seeds and place them in his 
his own store;
- The player with the most seeds in his or her magazine wins.
*/