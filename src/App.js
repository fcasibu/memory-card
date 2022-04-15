import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import ScoreProvider from "./score/ScoreProvider";

function App() {
  return (
    <ScoreProvider>
      <Header />
      <Main />
    </ScoreProvider>
  );
}

export default App;
