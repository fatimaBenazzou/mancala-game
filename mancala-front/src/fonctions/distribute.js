import {
    activatePocket,
    addPocket,
    emptyPocket,
    gameOver,
    nextTurn,
    setCantPlay,
    switchTurn,
} from "app/slices/game";

const addPocketAsync = async (i, stone, timeout, dispatch) => {
    // creer une promesse qui sera resolue a la fin du Timeout
    return new Promise((resolve) => {
        setTimeout(() => { // creer un timeout pour le delay d'animation
            dispatch(addPocket({ id: i, elm: stone })); // ajout des pierres dans les fausses

            setTimeout(() => { // reeinitialiser les etat des pierres a non active
                dispatch(activatePocket({ id: i, type: "" }));
            }, 1500);

            resolve();
        }, timeout * 100);
    });
};

export const distribute = (state, dispatch, id) => {
    // si id n'existe pas => fin de la partie
    if (id === undefined || id === null) dispatch(gameOver());

    // si le joueur ne peut pas jouer alors ne rien faire
    if (!state.canPlay || state.endGame) return;
    
    dispatch(setCantPlay({ canPlay: false })); // retirer la main au joueur jusqu'a la fin de l'animation
    var pockets = state.pockets.map((socket) => socket.gems.map((gem) => gem)); // copie sur letat des fausse
    let free = [...pockets[id]]; 
    dispatch(emptyPocket({ id })); // vider la fausse

    let i = id; 
    var promises = [], // pour asynchroniser les animations
        counter = 0; // delay

    while (free.length > 0) {
        i = i + 1 < 14 ? i + 1 : 0;
        if (state.turn === 0 && i === 13) i = 0;
        else if (state.turn === 1 && i === 6) i = 7;

        let stone = { ...free.pop() };
        stone.state = "active"; // animation
        promises.push(addPocketAsync(i, stone, counter, dispatch)); // ajouter les pierres dans les fausses
        counter++;
    }

    const final = i;
    Promise.all(promises).then(() => { // apres la fin des animations
        dispatch(switchTurn({ final })); // changer de joueur
        dispatch(gameOver()); // verifie si la fin du jeu
        dispatch(nextTurn()); // Computer or Human (1vsC/CvsC or 1vs1) 
    })
};
