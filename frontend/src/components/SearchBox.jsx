import { useState } from "react";

export default function SearchBox({ onSearch }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <input value={value} onChange={e=>setValue(e.target.value)} placeholder="Search like: hair care" />
      <button onClick={() => onSearch(value)}>Analyze</button>
    </div>
  );
}