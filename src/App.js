import React from "react";
import SetAvatar from "./components/SetAvatar";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import { BrowserRouter as Router ,
  Routes,
  Route,
  link,
  useNavigate,
 } from "react-router-dom";
import LoginSample from "./Pages/LoginSample";

function App() {   // function humara component h jisme jsx ka code humne return karwaha hai
  return (
    <div>
      <Router>
      <Routes>
      <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
      </Router> 
  
    </div>
  );
}
export default App;  // export is done so that index.js can import it, default is used so that name can be changed in index.js
