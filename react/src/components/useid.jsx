import { useId } from "react";

export default function EmailField() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input type="email" id={id} />
    </div>
  );
}
