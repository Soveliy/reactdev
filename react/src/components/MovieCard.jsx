import useFavorites from "../hooks/useFavorites";
import { Link } from "react-router";
function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((item) => item.id === movie.id);
  return (
    <article className="text-center flex h-full flex-col overflow-hidden rounded-2xl border-state-700 bg-slate-700 text-white">
      <img className="h-80 w-full object-cover" src={movie.image} alt="" />

      <h2 className="movieTitle text-2xl font-bold mb-4"> {movie.title} </h2>
      <p>Год {movie.year}</p>
      <p>Жанр {movie.genre}</p>
      <Link to={`/show/${movie.id}`}>Перейти в карточку фильма</Link>

      <button
        className={isFavorite ? "fav-button fav-button--active" : "fav-button"}
        onClick={() => toggleFavorite(movie)}
      >
        {isFavorite ? "В избранном ★" : "Добавить в избранное ☆"}
      </button>
    </article>
  );
}
export default MovieCard;
