import { createBrowserRouter } from "react-router-dom";
import Menu from "components/Menu";
import Game from "components/Game";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Menu />,
    },
    {
        path: "/game",
        element: <Game />,
    },

]);
export default Router;
