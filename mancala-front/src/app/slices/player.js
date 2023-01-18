import { createSlice } from "@reduxjs/toolkit";

const initial = (i) => ({
    score: 0,
    name: "Player",
    color: "c" + i,
    points: 0,
});

const createPlayer = (player) =>
    createSlice({
        name: "player" + player,
        initialState: initial(player),
        reducers: {
            setScore: (state, { payload: { score } }) => {
                return { ...state, score };
            },
            setName: (state, { payload: { name } }) => {
                return { ...state, name };
            },
            setColor: (state, { payload: { color } }) => {
                return { ...state, color };
            },
            initScore: (state) => {
                return { ...state, score: initial(player).score };
            },
        },
    });
const players = [createPlayer(1), createPlayer(2)];

export const setScore = (i) => players[i].actions.setScore;
export const initScore = (i) => players[i].actions.initScore;
export const setName = (i) => players[i].actions.setName;
export const setColor = (i) => players[i].actions.setColor;

const reducers = { player1: players[0].reducer, player2: players[1].reducer };
export default reducers;
