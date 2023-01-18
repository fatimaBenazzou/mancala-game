import Gem from "components/Gem";
import { onHumanClick } from "fonctions/human";
import { usePlayer, usePocket } from "hooks";
import useGame from "hooks/useGame";
import React, { useEffect } from "react";

export default function Pocket({ id, player = 0 }) {
    const { pocket } = usePocket(id);
    const { players } = usePlayer();
    const { turn, game, dispatch } = useGame();
    const className = [
        "pocket",
        pocket.state,
        (turn === 0 && id < 7) || (turn === 1 && id > 6) ? "active" : "",
        players[player].color,
    ].join(" ");

    const { setScore } = usePlayer();
    useEffect(() => {
        if (pocket) {
            if (id === 6) {
                setScore(0, pocket.gems?.length);
            } else if (id === 13) {
                setScore(1, pocket.gems?.length);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, pocket]);

   

    return (
        <div className={className} onClick={onHumanClick({game, player, id, pocket, dispatch})}>
            <div className="counter">
                {pocket.gems?.length ?? 0} / {id}
            </div>
            {pocket.gems?.map((gem, i) => (
                <Gem key={i} type={gem.elm} state={gem.state} />
            ))}
        </div>
    );
}
