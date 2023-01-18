import GameRules from "components/GameRules";
import Settings from "components/Settings";
import { usePlayer } from "hooks";
import useGame from "hooks/useGame";
import { useState } from "react";
import "./style.scss";

const Player = ({ i, player, active }) => {
    return (
        <div className={`player ${player.color} ${active ? "active" : ""}`}>
            <p>
                {player.name} ({i})
            </p>
            <p>{player.score}</p>
        </div>
    );
};
const Progress = ({ i, player, active, total }) => {
    return (
        <div
            className={`prog ${player.color} ${active ? "active" : ""}`}
            style={{ width: `${((player.score + 1) / total) * 100}%` }}
        ></div>
    );
};

export default function Hud() {
    const [open, setOpen] = useState(false);
    const [openRules, setOpenRules] = useState(false);
    const { players } = usePlayer();
    const { turn } = useGame();


    const handlePause = () => {
        setOpen(true);
    };
    const handleRules = () => {
        setOpenRules(true);
    };

    const total = players.reduce((acc, p) => acc + p.score, 2);
    return (
        <div className="Hud">
            <Settings open={open} setOpen={setOpen} />
            <GameRules open={openRules} setOpen={setOpenRules} />

            <h3>-- MANCALA --</h3>
            <div className="players">
                <Player i={1} player={players[0]} active={turn === 0} />
                <button onClick={handlePause}>Settings</button>
                <button onClick={handleRules}>Rules</button>
                <Player i={2} player={players[1]} active={turn === 1} />
            </div>
            <div className="progress ">
                {players.map((p, i) => (
                    <Progress key={i} i={i + 1} player={p} active={turn === i} total={total} />
                ))}
            </div>
        </div>
    );
}
