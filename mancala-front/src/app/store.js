import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { game, player } from "./slices";
import { turnMiddleware } from "./middlewares";

const store = configureStore({
    reducer: {
           game,
        ...player,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (defaultMiddleware) =>
        defaultMiddleware().concat(turnMiddleware.middleware),
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export default store;
