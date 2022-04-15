import React, { useState, useEffect } from "react";
import ScoreContext from "./ScoreContext";

/* eslint-disable react/prop-types */
function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    const storageScore = localStorage.getItem("best score");
    setBestScore(+storageScore);
  }, []);

  useEffect(() => {
    setEnd(false);
    if (score > bestScore && score > 0) {
      setBestScore(bestScore + 1);
      localStorage.setItem("best score", bestScore + 1);
    }
  }, [score]);

  const scoreContext = {
    score,
    bestScore,
    end,
    addScore: () => setScore(score + 1),
    removeScore: () => setScore(0),
    endGame: () => setEnd(true),
  };

  return (
    <ScoreContext.Provider value={scoreContext}>
      <div className="flex flex-col gap-5">{children}</div>
    </ScoreContext.Provider>
  );
}

export default ScoreProvider;
