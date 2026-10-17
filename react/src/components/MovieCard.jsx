function MovieCard({ movie, onDelete, onToggleFavorite }) {
  return (
    <article className="movie">
      <img src={movie.image} alt="" />

      <h2 className="movieTitle"> {movie.title} </h2>
      <p>Год {movie.year}</p>
      <p>Жанр {movie.genre}</p>
      <button onClick={() => onDelete(movie.id)}>Удалить</button>

      <button
        className={
          movie.isFavorite ? "fav-button fav-button--active" : "fav-button"
        }
        onClick={() => onToggleFavorite(movie.id)}
      >
        {movie.isFavorite ? "В избранном ★" : "Добавить в избранное ☆"}
      </button>
    </article>
  );
}
export default MovieCard;
