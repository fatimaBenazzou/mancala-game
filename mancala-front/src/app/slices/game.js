import { createSlice } from "@reduxjs/toolkit";

const types = ["p1", "p2", "p3"]; // type de pierres (couleurs)

// initialiser l'etat du jeu
const initial = (turn, mode) => ({
    pockets: [
        ...Array(6) // les premieres fausses du 1er joueur
            .fill(0)
            .map(() => ({
                gems: Array(4)
                    .fill(0)
                    .map(() => ({
                        elm: types[Math.floor(Math.random() * types.length)],
                        state: "",
                    })),
                state: "",
            })),
        { gems: [], state: "" }, // son store

        ...Array(6) // les fausses du 2eme joueur
            .fill(0)
            .map(() => ({
                gems: Array(4)
                    .fill(0)
                    .map(() => ({
                        elm: types[Math.floor(Math.random() * types.length)],
                        state: "",
                    })),
                state: "",
            })),
        { gems: [], state: "" }, // 2eme store
    ],
    turn, // current player
    initTurn: turn, // from the menu
    canPlay: true, // donner la main au joueur / or not
    endGame: false, // fin de jeu
    mode, // from the menu
});

const game = createSlice({
    name: "game",
    initialState: initial(0, "1VS1"),
    reducers: {
        setCantPlay: (state) => {
            state.canPlay = false;
        },

        // verifier si au moins un coté est a 0 si c le cas alors ajouter tt les pierres restantes au store du joueur en qst
        gameOver: (state) => {
            var endGame = false;
            for (let j = 0; j < 2 && !endGame; j++) {
                endGame = true;
                for (let i = j * 7; i < 6 + j * 7 && endGame; i++) {
                    if (state.pockets[i].gems.length > 0) endGame = false;
                }
            }

            if (endGame) {
                for (let adversaire = 0; adversaire < 2; adversaire++) {
                    // ramasser les gems restante
                    for (let i = adversaire * 7; i < 6 + adversaire * 7; i++) {
                        let gems = state.pockets[i].gems.map((gem) => ({
                            ...gem,
                            state: "active",
                        }));
                        state.pockets[i].gems = [];
                        state.pockets[adversaire === 0 ? 6 : 13].gems = [
                            ...state.pockets[adversaire === 0 ? 6 : 13].gems,
                            ...gems,
                        ];
                    }
                }
            }
            state.endGame = endGame;
            state.canPlay = !endGame;
        },

        switchTurn: (state, { payload: { final } }) => {
            // derniere gem ne c pas arreter au store
            if (final !== 13 && final !== 6) {
                if ((state.turn === 0 && final < 6) || (state.turn === 1 && final > 6)) {
                    // s'il s'arrete dans une fausse vide on recupere les pierres en face (12 - i)

                    if (state.pockets[final].gems.length === 1) {
                        let gems = state.pockets[12 - final].gems.map((gem) => ({
                            ...gem,
                            state: "active",
                        }));
                        state.pockets[12 - final].gems = [];
                        state.pockets[12 - final].state = "steal";
                        state.pockets[final].state = "zero";
                        state.pockets[state.turn === 0 ? 6 : 13].gems = [
                            ...state.pockets[state.turn === 0 ? 6 : 13].gems,
                            ...gems,
                        ];
                    }
                }
                state.turn = (state.turn + 1) % 2;
            }
        },

        addPocket: (state, { payload: { id, elm } }) => {
            state.pockets[id].gems.push(elm);
            if (id === 6 || id === 13) {
                state.pockets[id].state = "extra"; // animation storre
            }
        },

        emptyPocket: (state, { payload: { id } }) => {
            state.pockets[id].gems = [];
        },

        setTurn: (state, { payload: { turn } }) => {
            state.initTurn = turn;
        },

        nextTurn: (state) => {
            return state;
        },

        setMode: (state, { payload: { mode } }) => {
            return initial(state.initTurn, mode);
        },

        activatePocket: (state, { payload: { id, type } }) => {
            state.pockets[id].state = type;
        },

        initGame: (state) => {
            return initial(state.initTurn, state.mode);
        },
    },
});

export const {
    setCantPlay,
    initGame,
    setTurn,
    addPocket,
    emptyPocket,
    switchTurn,
    activatePocket,
    setMode,
    nextTurn,
    gameOver,
} = game.actions;

export default game.reducer;
