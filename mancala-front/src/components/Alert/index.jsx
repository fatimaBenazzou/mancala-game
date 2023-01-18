import { usePlayer } from "hooks";
import useGame from "hooks/useGame";
import React from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./style.scss";

const Alert = () => {
    const { width, height } = useWindowSize();
    const { endGame } = useGame();
    const { players } = usePlayer();
    const winner = players[0].score >= players[1].score ? 0 : 1;
    const tie = players[0].score === players[1].score;

    if (!endGame) return null;
    return (
        <div className="modalBackground">
            <Confetti width={width} height={height} />
            <div className="modalContainer">
                <div className="title">
                    <h1>Partie Terminé !</h1>
                    {tie ? (
                        <h2 className="etat">Match null</h2>
                    ) : (
                        <h2>player {winner + 1} est le vainqueur</h2>
                    )}
                </div>
                <div className="body">
                    <p>
                        player 1 : <span className="etat">{players[0].score}</span>
                    </p>
                    <p>
                        Player 2 : <span className="etat">{players[1].score}</span>
                    </p>
                </div>
                <div className="footer">
                    <Link className="cancelBtn" to={"/"}>
                        Back to menu
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Alert;
