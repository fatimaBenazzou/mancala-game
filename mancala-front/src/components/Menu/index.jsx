import { usePlayer } from "hooks";
import useGame from "hooks/useGame";
import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const colors = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];

const Menu = () => {
    const { setName, players, setColor } = usePlayer();
    const { initTurn, setTurn, setMode, nextTurn } = useGame();

    const handleChange = (i) => (e) => {
        e.preventDefault();
        setName(i, e.target.value);
        return false;
    };

    const handleMode = (mode) => () => {
        console.log({mode})
        setMode(mode);
        nextTurn();
        return false;
    };

    const handleChangeColor = (i, color) => (e) => {
        e.preventDefault();
        if (players[(i + 1) % 2].color !== color) setColor(i, color);
        return false;
    };
    
    const handleToggle = (e) => {
        e.preventDefault();
        setTurn(e.target.checked ? 1 : 0);
        return false;
    };

    return (
        <div className="menu">
            <h1>MACALA</h1>
            <div className="links">
                <Link to={"/game"} onClick={handleMode("1VS1")}>One vs One</Link>
                <Link to={"/game"} onClick={handleMode("1VSC")}>One vs Computer</Link>
                <Link to={"/game"} onClick={handleMode("CVSC")}>Computer vs Computer</Link>
            </div>

            <div className="properties">
                <div className="player">
                    <input
                        type="text"
                        onChange={handleChange(0)}
                        defaultValue={
                            players[0].name + (players[0].name === "player" ? " name" : "")
                        }
                    />
                    <div>
                        {colors.map((elm) => (
                            <div
                                key={elm}
                                onClick={handleChangeColor(0, elm)}
                                className={[
                                    "color",
                                    elm,
                                    players[0].color === elm ? "active" : "",
                                ].join(" ")}
                            ></div>
                        ))}
                    </div>
                </div>
                <div>
                    <p>Turn</p>
                    <label className="switch" htmlFor="switcher">
                        <input
                            id="switcher"
                            type="checkbox"
                            checked={initTurn === 1}
                            onChange={handleToggle}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="player">
                    <input
                        type="text"
                        onChange={handleChange(1)}
                        defaultValue={
                            players[1].name + (players[1].name === "player" ? " name" : "")
                        }
                    />
                    <div>
                        {colors.map((elm) => (
                            <div
                                key={elm}
                                onClick={handleChangeColor(1, elm)}
                                className={[
                                    "color",
                                    elm,
                                    players[1].color === elm ? "active" : "",
                                ].join(" ")}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            <p>
                by <span>Benazzou Fatima</span>, <span>Brahimi Rodaina</span>
            </p>
        </div>
    );
};

export default Menu;
