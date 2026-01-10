import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Feed from "./Feed";
import UserProfile from "./UserProfile";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {!user && (
          <Route path="*" element={<Login onLogin={setUser} />} />
        )}

        {user && (
          <>
            <Route
              path="/"
              element={<Feed user={user} onLogout={() => setUser(null)} />}
            />
            <Route
              path="/profile"
              element={<UserProfile user={user} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
}
