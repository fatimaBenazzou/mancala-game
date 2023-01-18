import "./style.scss";
export default function Gem({ type, state }) {
    return <div className={"Gem " + type + " "+ state}></div>;
}
