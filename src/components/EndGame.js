import React from "react";
import ReactDOM from "react-dom";
import styles from "./EndGame.module.css";

/* eslint-disable react/prop-types */
function EndGame({ pokemon: { image, name, index }, playAgain }) {
  return ReactDOM.createPortal(
    <React.Fragment>
      <div className={styles.backdrop}></div>
      <div className={styles["end-game"]}>
        <h2>The last pokemon you clicked was</h2>
        <img src={image} alt={name} />
        <h2 className="font-bold text-2xl">{name}</h2>
        <h2>You&apos;ve clicked the pokemon {index} clicks ago</h2>
        <button
          className="bg-[#333] text-white shadow-md p-2 rounded hover:opacity-90"
          onClick={playAgain}
        >
          Play again
        </button>
      </div>
    </React.Fragment>,
    document.getElementById("end-game-modal")
  );
}

export default EndGame;
