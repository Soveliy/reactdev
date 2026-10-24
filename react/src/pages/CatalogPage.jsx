import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { searchShows } from "../api/api";
function CatalogPage() {
  // Данные с сервера
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("Star");
  const [shows, setShows] = useState([]);
  // Состояния загрузки

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Локальные значения

  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [genre, setGenre] = useState("all");

  useEffect(() => {
    const controller = new AbortController();
    const query = search.trim();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchShows(query, controller.signal);
        if (!controller.signal.aborted) {
          //   setShows(data);
          setMovies(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 1000);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [search]);

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
  //   useEffect(() => {
  //     const controller = new AbortController();
  //     async function loadMovies() {
  //       try {
  //         setLoading(true);
  //         setError(null);
  //         const response = await fetch(
  //           "https://api.tvmaze.com/search/shows?q=star",
  //           {
  //             signal: controller.signal,
  //           },
  //         );

  //         if (!response.ok) {
  //           throw new Error(response.status);
  //         }

  //         console.log("test");

  //         const data = await response.json();
  //         console.log(data);
  //         const normallizeMovies = data.map(normallizeMovie);

  //         if (!controller.signal.aborted) {
  //           setMovies(normallizeMovies);
  //         }
  //       } catch (error) {
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //     loadMovies();
  //     return () => {
  //       controller.abort();
  //     };
  //   }, []);

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
      {!search.trim() && <b>Введите название сериала</b>}
      {search.trim() && loading && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
          <path
            fill="none"
            stroke="#FF156D"
            stroke-width="15"
            stroke-linecap="round"
            stroke-dasharray="300 385"
            stroke-dashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animate>
          </path>
        </svg>
      )}
      {filteredMovies.length === 0 ? (
        <b>Ничего не найдено</b>
      ) : (
        <div>
          {filteredMovies.map((movie) => (
            <MovieCard
              onToggleFavorite={handleToggleFavorite}
              movie={movie}
              onDelete={handleDelete}
              key={movie.id}
            />
          ))}
        </div>
      )}

      <hr />
    </main>
  );
}
export default CatalogPage;
