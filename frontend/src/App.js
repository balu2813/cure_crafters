import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserProvider from "./context/userContext";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import ScoreCard from "./pages/scorecard";
function App() {
  return (
    <UserProvider>
    <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/scorecard" exact element={<ScoreCard />} />
        </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
