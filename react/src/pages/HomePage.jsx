import { useState, useContext, createContext } from "react";
import { Link } from "react-router";
import TimerUseEffect from "../components/useEf";
import SearchFieldUseRef from "../components/useRef";
import EmailField from "../components/useid";
import CatalogUseMemo from "../components/useMemoEf";

const ThemeContext = createContext("light");
console.log("hello");
function useCounter(init = 0) {
  const [count, setCount] = useState(init);
  function increment() {
    setCount((value) => value + 1);
  }
  return { count, increment };
}
function Counter() {
  const { count, increment } = useCounter();
  return <button onClick={increment}> Счетчик {count}</button>;
}
function Preview() {
  const theme = useContext(ThemeContext);
  return <p>Текущая тема {theme}</p>;
}
function HomePage() {
  const [value, setValue] = useState([]);
  const [theme, setTheme] = useState("light");
  return (
    <>
      <ThemeContext value={theme}>
        <button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          Клик
        </button>
        <Preview />

        <Counter />
        <Counter />
        <TimerUseEffect />
        <SearchFieldUseRef />
        <EmailField />
        <EmailField />
        <CatalogUseMemo />
      </ThemeContext>
    </>
  );
}

export default HomePage;
