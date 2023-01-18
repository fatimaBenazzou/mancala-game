import useGame from "hooks/useGame";
import React from "react";
import "./style.scss";

const Rules = [
    "The first player chooses a pit on his side of the board and collects all his seeds ",
    "Counterclockwise, the player places a stone in each pit until they have no more seeds in their hand. pit until they have no more seeds in their hand",
    "The player may place a seed in any pit on the board (including his own store) except for the opponent's store;",
    "Si la dernière graine déposée atterrit dans le magasin du joueur, ce joueur peut jouer un tour supplémentaire ;",
    "Si la dernière graine déposée atterrit dans une fosse vide du côté du joueur, cette graine et toutes les graines dans la fosse du côté opposé (c'est-à-dire une fosse de l'adversaire) vont à ce joueur, et sont placées dans son magasin ;",
    "Lorsqu'un joueur n'a plus de graines dans toutes les fosses de son côté, la partie se termine, et le joueur adverse peut prendre toutes les graines restantes et les placer dans son propre magasin ;",
    "Le joueur avec le plus de graines dans son magasin, gagne.",
];

const GameRules = ({ open, setOpen }) => {
    const handleCancel = () => {
        setOpen(false);
    };

    if (!open) return null;
    return (
        <div className="modalBackground" onClick={handleCancel}>
            <div className="RulesContainer">
                <div className="Rtitle">
                    <h1>How to Play ?</h1>
                </div>
                <div className="Rbody">
                    <ul className="list">
                        {Rules.map((rule,i) => (

                        <li key={i}>{rule}</li>
                        ))}
                    </ul>
                </div>
                <div className="Rfooter">
                    <button className="cancelBtn" onClick={handleCancel}>
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameRules;

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
