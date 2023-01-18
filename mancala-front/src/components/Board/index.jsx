import React from "react";
import Pocket from "./Pocket";
import "./style.scss";
const pocketsP1 = [0, 1, 2, 3, 4, 5];
const pocketsP2 = [7, 8, 9, 10, 11, 12];
const Board = () => {
    return (
        <div className="board">
            <div className="side-pocket-container">
                <Pocket player={1} id={13} />
            </div>
            <div className="pocket-container">
                <div className="pocket-sub-container">
                    {pocketsP2.map((pocket, i) => (
                        <Pocket key={pocket} id={pocket} player={1} />
                    ))}
                </div>
                <div className="pocket-sub-container">
                    {pocketsP1.map((pocket, i) => (
                        <Pocket key={pocket} id={pocket} player={0} />
                    ))}
                </div>
            </div>
            <div className="side-pocket-container">
                <Pocket id={6} />
            </div>
        </div>
    );
};
export default Board;
