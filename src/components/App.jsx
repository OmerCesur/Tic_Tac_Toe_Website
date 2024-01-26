import React, { useEffect, useState } from "react";
import Button from "./Button";

function App() {
    const [player, setPlayer] = useState("X");
    const [buttonValues, setButtonValues] = useState(["", "", "", "", "", "", "", "", ""]);
    const [label, setLabel] = useState("");
    const [finishGame, setFinishGame] = useState(false);
    const [drawcount, setDrawCount] = useState(0);


    function winning() {
        const wins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [3, 5, 7], [1, 5, 9]];
        let xcount = 0;
        let ocount = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 3; j++) {
                if (buttonValues[wins[i][j] - 1] === "X") {
                    xcount++;
                } else if (buttonValues[wins[i][j] - 1] === "O")
                    ocount++;
            }
            if (ocount === 3 || xcount === 3) {
                setFinishGame(true);
                break;
            } else {
                ocount = 0;
                xcount = 0;
                setDrawCount(() => {
                    return drawcount + 1
                });
                if (drawcount === 9 && !finishGame) {
                    setLabel("Draw guys! 🤨");
                }
            }
        }
    }

    useEffect(() => {
        if (!finishGame) {
            setLabel("Player " + player + ", it's your turn!");
        } else {
            setLabel("Loser: Player " + player + " 🤏⚙️🧠");
        }
        winning();
    }, [player, finishGame]);


    function handleClick(event) {
        const button = event.target;
        if (!finishGame) {
            setButtonValues(() => {
                return buttonValues.map((item, i) => {
                    if (item === "") {
                        if (button.id == i) {
                            document.getElementById(i).style.border = "2px solid #540375";
                            if (player === "X") {
                                setPlayer("O");
                                return "X";
                            } else if (player === "O") {
                                setPlayer("X");
                                return "O";
                            }
                        } else {
                            return item;
                        }
                    } else {
                        return item;
                    }
                })
            })
        }
    }

    function restart() {
        setButtonValues(["", "", "", "", "", "", "", "", ""]);
        setDrawCount(0);
        for (let i = 0; i < 9; i++) {
            document.getElementsByClassName("gameButton")[i].style.border = "none";
        }
        setFinishGame(false);
        setPlayer("X");
    }


    return <div>
        <div className="label">
            {label}
        </div>
        <div className="game">
            {buttonValues.map((button, x) => {
                return <Button key={x} id={x} onClick={handleClick} value={button} />;
            })}
        </div>
        <div className="restartArea" onClick={restart}><button className="restart">Restart</button></div>
    </div>
}
export default App;