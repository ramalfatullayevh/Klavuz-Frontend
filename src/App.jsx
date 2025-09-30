import Register from "./Register";
import Login from "./Login";
import Error from "./Error";
import Dashboard from "./Dashboard";
import Plans from "./Plans";
import Teacher from "./Teacher";


import { BrowserRouter, Route, Routes } from "react-router-dom"; // Router'ı sildim

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/teacher" element={<Teacher />} />

        <Route path="/plans" element={<Plans />} />

ğ
        <Route path="/" element={<Login />} />
        <Route path="/error" element={<Error />} />
        {/* 404 sayfası için ekle */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;