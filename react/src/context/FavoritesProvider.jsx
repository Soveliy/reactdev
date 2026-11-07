import { useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
const STORAGE_KEY = "favorites";
function loadFavorites() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return [];
    }
    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {}
}
export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {}
  }, [favorites]);
  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const exist = prev.some((item) => item.id === movie.id);
      if (exist) {
        console.log("удален");
        return prev.filter((item) => item.id !== movie.id);
      }
      console.log("добавлен");
      return [...prev, movie];
    });
  }
  function clearFavorites() {
    setFavorites([]);
  }
  const value = {
    favorites,
    toggleFavorite,
    clearFavorites,
  };
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
