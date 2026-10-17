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
      genre: ["Фантастика", "Слешер"],
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
  return (
    <main>
      <h1>{title}</h1>
      <p className="desc">Всего фильмов {movieCount}</p>
      {movies.map((movie) => (
        <MovieCard
          onToggleFavorite={handleToggleFavorite}
          movie={movie}
          onDelete={handleDelete}
          key={movie.id}
        />
      ))}
    </main>
  );
}

export default App;
