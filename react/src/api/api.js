const API_URL = "https://api.tvmaze.com/search/shows";

export async function searchShows(query, signal) {
  const params = new URLSearchParams({
    q: query,
  });

  const response = await fetch(`${API_URL}?${params}`, { signal });
  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  return data.map(({ show }) => ({
    id: show.id,
    title: show.name,
    genres: show.genres ?? [],
    rating: show.rating?.average ?? null,
    image: show.image?.medium ?? null,
    url: show.url ?? null,
  }));
}

export async function getShowById(id, signal) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`, {
    signal,
  });

  const data = await response.json();
  console.log(data);
  return data;
}
