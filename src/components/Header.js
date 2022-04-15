import React, { useContext } from "react";
import ScoreContext from "../score/ScoreContext";
import styles from "./Header.module.css";

function Header() {
  const scoreCtx = useContext(ScoreContext);
  return (
    <header className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center md:text-xl">
        Click That Pokemon!
      </h1>
      <div className="flex justify-between gap-32">
        <div className={styles["score-container"]}>
          <h2>Score </h2>
          <h2>{scoreCtx.score}</h2>
        </div>
        <div className={styles["score-container"]}>
          <h2>Best Score </h2>
          <h2>{scoreCtx.bestScore}</h2>
        </div>
      </div>
      <h2 className="text-lg text-center sm:text-sm">
        Click the pokemon you haven&apos;t seen yet!
      </h2>
    </header>
  );
}

export default Header;
