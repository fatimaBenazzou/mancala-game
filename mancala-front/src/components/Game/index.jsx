import Alert from "components/Alert";
import Board from "components/Board";
import Hud from "components/Hud";
import "./style.scss";

export default function Game() {  
    return (
        <div className="container">
            <Hud />
            <Board />
            <Alert />
        </div>
    );
}
