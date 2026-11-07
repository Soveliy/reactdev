import { useEffect, useState } from "react";
export default function TimerUseEffect() {
  const [ticks, setTicks] = useState(0);
  const [delay, setDelay] = useState(1000);
  useEffect(() => {
    const id = setInterval(() => {
      setTicks((value) => value + 1);
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
  return (
    <div>
      <p>Тиков {ticks}</p>

      <select value={delay} onChange={(e) => setDelay(Number(e.target.value))}>
        <option value="500">500ms</option>
        <option value="1000">1s</option>
      </select>
    </div>
  );
}
