import { useRef } from "react";
export default function SearchFieldUseRef() {
  const inputRef = useRef(null);
  function focusSearch() {
    inputRef.current.focus();
  }

  return (
    <div>
      <label>
        Поиск
        <input ref={inputRef} />
      </label>
      <button onClick={focusSearch}>111</button>
    </div>
  );
}
