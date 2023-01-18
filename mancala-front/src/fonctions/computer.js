import { distribute } from "./distribute";

export const computerTurn = (game, dispatch) => {
    const wait = new Promise((resolve, reject) =>
        setTimeout(() => {
            resolve();
        }, 800)
    );

    // fetcher du backend : envoyer l'etat du board, recevoir les mouvements a executé
    Promise.all([
        wait,
        fetch("http://localhost:5000/negamax", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                turn: game.turn,
                pockets: game.pockets.map((pocket) => pocket.gems.length),
            }),
        })
            .then((data) => {
                return data.json();
            })
            .catch((err) => console.error(err)),
    ]).then((data) => {
        console.log(data[1]);
        distribute(game, dispatch, data[1].pocket);
    });
};
