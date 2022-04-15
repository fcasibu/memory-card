import React from "react";

const ScoreContext = React.createContext({
  score: 0,
  bestScore: 0,
  end: false,
  addScore: () => {},
  removeScore: () => {},
});

export default ScoreContext;
