import { useState } from "react";
import Login from "./Login";
import Feed from "./Feed";
import PostFlowImg from  "./assets/PostFlow.png"
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
    <div className= "logo1" >
      <img src={PostFlowImg} />
       </div>
       
    <div className="app-container">
      {user === null && <Login onLogin={setUser} />}
      {user !== null && <Feed user={user} onLogout={() => setUser(null)} />}
    </div>
    </div>
  );
}
