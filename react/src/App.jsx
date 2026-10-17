import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";
function App() {
  // Данные с сервера
  const [movies, setMovies] = useState([]);

  // Состояния загрузки

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Локальные значения
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [genre, setGenre] = useState("all");

  function normallizeMovie(item) {
    const show = item.show;
    return {
      id: show.id,
      title: show.name,
      genres: show.genres ?? [],
      rating: show.rating?.average ?? null,
      image: show.image?.medium ?? null,
      isFavotire: false,
    };
  }
  useEffect(() => {
    const controller = new AbortController();
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=star",
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(response.status);
        }

        console.log("test");

        const data = await response.json();
        console.log(data);
        const normallizeMovies = data.map(normallizeMovie);

        if (!controller.signal.aborted) {
          setMovies(normallizeMovies);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
    return () => {
      controller.abort();
    };
  }, []);

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
  function handleChange(event) {
    setSearch(event.target.value);
  }

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
