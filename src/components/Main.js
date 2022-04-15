import React, { useState, useEffect, useContext, useReducer } from "react";
import ScoreContext from "../score/ScoreContext";
import EndGame from "./EndGame";
import styles from "./Main.module.css";

const initialState = { name: "", index: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "end":
      return {
        name: action.name,
        index: action.index,
        image: action.image,
      };
    default:
      return state;
  }
}

function Main() {
  const [pokemons, setPokemons] = useState([]);
  const [seenPokemons, setSeenPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastSeenPokemon, dispatchLastSeenPokemon] = useReducer(
    reducer,
    initialState
  );
  const scoreCtx = useContext(ScoreContext);

  useEffect(() => {
    setLoading(true);

    async function fetchPokemon() {
      const newPokemons = [];
      const nums = [];
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < 4; i++) {
        let randomNum = Math.floor(Math.random() * 500) + 1;
        if (nums.includes(randomNum)) {
          randomNum += 1;
        }
        nums.push(randomNum);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomNum}`
        );
        const { sprites, name } = await response.json();
        const image = sprites.front_default;
        newPokemons.push({ image, name });
      }

      setPokemons(newPokemons);
      setLoading(false);
    }

    fetchPokemon();
  }, [seenPokemons]);

  const endGame = (pokemonName, pokemonImage) => {
    const index = seenPokemons
      .map((pokemon) => pokemon.name)
      .indexOf(pokemonName);

    dispatchLastSeenPokemon({
      type: "end",
      index: scoreCtx.score - index,
      name: pokemonName,
      image: pokemonImage,
    });

    scoreCtx.endGame();
  };

  const checkGameCondition = (event) => {
    const pokemonName = event.target.children[0].alt;
    const pokemonImage = event.target.children[0].src;

    const isDuplicate = seenPokemons.some((pokemon) => {
      return pokemon.name === pokemonName;
    });

    if (isDuplicate) {
      endGame(pokemonName, pokemonImage);
    } else {
      scoreCtx.addScore();
      setSeenPokemons((state) => [
        ...state,
        { name: pokemonName, image: pokemonImage },
      ]);
    }
  };

  const playAgainHandler = () => {
    scoreCtx.removeScore();
    setSeenPokemons([]);
  };

  if (loading) {
    return <h2 className="text-center font-bold text-3xl pt-10">Loading...</h2>;
  }

  return (
    <main>
      {scoreCtx.end && (
        <EndGame pokemon={lastSeenPokemon} playAgain={playAgainHandler} />
      )}
      <div className={styles.cards}>
        {pokemons.map((el, index) => {
          return (
            <div key={index} onClick={(e) => checkGameCondition(e)}>
              <img src={el.image} alt={el.name} />
              <h2>{el.name}</h2>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Main;
