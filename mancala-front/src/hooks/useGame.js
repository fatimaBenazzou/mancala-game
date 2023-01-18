import { initGame, setTurn, setMode, nextTurn } from "app/slices/game";
import {useAppDispatch, useAppSelector } from "app/store";

export default function useGame() {
    const dispatch = useAppDispatch();

    return {
        game: useAppSelector((state) => state.game),
        turn: useAppSelector((state) => state.game).turn,
        initTurn: useAppSelector((state) => state.game).initTurn,
        endGame: useAppSelector((state) => state.game).endGame,
        mode: useAppSelector((state) => state.game).mode,
        canPlay: useAppSelector((state) => state.game).canPlay,
        dispatch,
        initGame: () => {
            dispatch(initGame());
        },
        setTurn: (turn) => {
            dispatch(setTurn({turn}));
        },
        setMode: (mode) => {
            dispatch(setMode({mode}));
        },
        nextTurn: () => {
            dispatch(nextTurn());
        }
    };
}
