import { useMemo, useState } from "react";
const products = Array.from({ length: 5000 }, (_, id) => ({
  id,
  name: "Товар " + id,
}));

export default function CatalogUseMemo() {
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () => products.filter((item) => item.name.includes(query)),
    [query],
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <p>{visible.length}</p>
      <ul>
        {visible.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
