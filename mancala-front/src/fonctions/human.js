import { distribute } from "./distribute";

// verifier si la fausse est cliquable
const AllowedToClick = ({ mode, player, turn, id }) => {
    if (id === 6 || id === 13 || mode === "CVSC") return false;
    if (mode === "1VSC" && id > 6) return false;
    if (turn === player) return true;
    return false;
};

export const onHumanClick =
    ({ game, player, id, dispatch, pocket }) =>
    (e) => {
        e.preventDefault();
        if (
            AllowedToClick({ mode: game.mode, player, turn: game.turn, id }) &&
            pocket.gems.length > 0
        ) {
            distribute(game, dispatch, id);
        }
        return false;
    };
