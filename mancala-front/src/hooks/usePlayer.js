import { initScore, setColor, setName, setScore } from "app/slices/player";
import { useAppDispatch, useAppSelector } from "app/store";

export default function usePlayer() {
    const dispatch = useAppDispatch();
    const players = [
        useAppSelector((state) => state["player1"]),
        useAppSelector((state) => state["player2"]),
    ];
    return {
        players,
        setScore: (index, score) => {
            dispatch(setScore(index)({ score }));
        },
        setName: (index, name) => {
            dispatch(setName(index)({ name }));
        },
        setColor: (index, color) => {
            dispatch(setColor(index)({ color }));
        },
        initScore: (index) => {
            dispatch(initScore(index)());
        },
    };
}
