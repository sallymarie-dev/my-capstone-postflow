import { useState } from "react";
import Login from "./Login";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <div>{!user && <Login onLogin={setUser} />}</div>
    </>
  );
}
