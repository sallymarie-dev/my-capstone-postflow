import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Feed from "./Feed";
import UserProfile from "./UserProfile";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/feed" replace /> : <Login onLogin={setUser} />}
        />

        <Route
          path="/feed"
          element={user ? <Feed user={user} onLogout={() => setUser(null)} /> : <Navigate to="/" replace />}
        />

        <Route
          path="/profile"
          element={user ? <UserProfile user={user} /> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to={user ? "/feed" : "/"} replace />} />
      </Routes>
    </Router>
  );
}
