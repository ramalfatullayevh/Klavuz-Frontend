import Register from "./Register";
import Login from "./Login";
import Error from "./Error";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;