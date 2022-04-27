import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { setCharacters } from "./redux/characters";
import { setMovies } from "./redux/movies";
import Loading from './components/Loading/Loading';
import fetchData from "./functions/fetchData";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const { characters } = useSelector((state) => state.characters);
  const { movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(async () => {
    const allCharacters = await initialGetCharacters();
    dispatch(setCharacters(allCharacters));
    setLoading(false);
  }, []);

  const initialGetCharacters = async () => {
    const characters = await fetchData("https://swapi.dev/api/people/");

    return characters.results.map((character) => ({
      name: character.name,
      url: character.url,
    }));
  };

  const [activeCharacter, setActiveCharacter] = useState(null);

  const [loading, setLoading] = useState(true);

  if (loading && !characters) {
    return (
      <Loading />
    )
  }

  return (
    <React.Fragment>
      <div className={"p-3 border-bottom"}>
        {characters && (
          <DropdownButton
            id="test-dropdown"
            title={activeCharacter ? activeCharacter.name : characters[0].name}
          >
            {characters.map((character) => (
              <Dropdown.Item
                href="#"
                key={uuid()}
                onClick={async () => {
                  setActiveCharacter(character);
                  setLoading(true);
                  const activeCharacterInfo = await fetchData(character.url);
                  const filmURLs = activeCharacterInfo.films;

                  const films = async () =>
                    await Promise.all(
                      filmURLs.map(async (url) => {
                        const film = await fetchData(url);
                        return film;
                      })
                    );

                  const setFilms = async () => {
                    let m = await films();
                    dispatch(setMovies(m));
                    setLoading(false);
                  };

                  setFilms();
                }}
              >
                {character.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        )}
      </div>
      <div className="position-relative main-info">
        {loading  && <Loading />}
        {movies && !loading && (
          <React.Fragment>
            <ul className="mt-3">
              {movies &&
                movies.map((movie) => <li key={uuid()}>{movie.title}</li>)}
            </ul>
            <div className="my-3 p-3 border-top">Last Apperance: {movies[movies.length - 1].title} / {movies[movies.length - 1].release_date}</div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
