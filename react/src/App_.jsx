import MovieCard from "./components/MovieCard";
import { useState } from "react";
function App() {
  const title = "Мой каталог фильмов";
  const movieCount = 3;

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Матрица",
      year: 1997,
      genre: "Фантастика",
      isFavorite: false,
    },
    {
      id: 2,
      title: "Властелин колец",
      year: 2001,
      genre: "Фантастика",
      isFavorite: true,
    },
    {
      id: 3,
      title: "Эффект бабочки",
      year: 2005,
      genre: "Фантастика",
      isFavorite: false,
    },
  ]);
  function handleToggleFavorite(id) {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie,
      ),
    );
  }
  function handleDelete(id) {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  }

  // const input = document.querySelector("#input");
  // input.addEventListener("input", () => {
  //   console.log(input.value);
  // });
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [yearRange, setYearRange] = useState("all");
  function handleChange(event) {
    setSearch(event.target.value);
  }
  const [genre, setGenre] = useState("all");

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.trim().toLocaleLowerCase());

    const matchesGenre = genre === "all" || movie.genre === genre;

    const matchesFav = !favoritesOnly || movie.isFavorite;

    return matchesSearch && matchesGenre && matchesFav;
  });

  return (
    <main>
      <h1>{title}</h1>
      <p className="desc">Всего фильмов {movieCount}</p>
      <input type="text" id="search" value={search} onChange={handleChange} />
      <select
        id="genre"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
      >
        <option value="all">Все жанры</option>
        <option value="Фантастика">Фантастика</option>
        <option value="Боевик">Боевик</option>
        <option value="Триллер">Триллер</option>
      </select>
      <select
        value={yearRange}
        onChange={(event) => setYearRange(event.target.value)}
      >
        <option value="all">Все годы</option>
        <option value="2000-2010">00x</option>
        <option value="2011-2020">10x</option>
        <option value="2021-2030">20x</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={favoritesOnly}
          onChange={(event) => setFavoritesOnly(event.target.checked)}
        />
        Только избранные
      </label>
      <hr />

      {filteredMovies.map((movie) => (
        <MovieCard
          onToggleFavorite={handleToggleFavorite}
          movie={movie}
          onDelete={handleDelete}
          key={movie.id}
        />
      ))}
      <hr />
    </main>
  );
}

export default App;
