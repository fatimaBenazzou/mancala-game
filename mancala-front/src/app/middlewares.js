import { createListenerMiddleware } from "@reduxjs/toolkit";
import { computerTurn } from "fonctions/computer";
import { nextTurn } from "./slices/game";

export const turnMiddleware = createListenerMiddleware();

// gerer l'event de : le tour du computer
turnMiddleware.startListening({
    actionCreator: nextTurn,
    effect: async (action, listenerApi) => {
        const { game } = listenerApi.getState();
        if (game.mode === "CVSC" || (game.mode === "1VSC" && game.turn === 1)) {
            computerTurn(game, listenerApi.dispatch);
        }
    },
});
