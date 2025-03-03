// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavbarMenu from "./components/NavbarMenu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PetsCards from "./pages/PetsCards";
import PetCreate from "./pages/PetCreate";
import PetEdit from "./pages/PetEdit";
import PetDetail from "./pages/PetDetail";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        // Caso o token esteja malformado, remove-o
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div>
      <NavbarMenu />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pets" element={<PetsCards />} />
          <Route path="/pets/create" element={<PetCreate />} />
          <Route path="/pets/edit/:id" element={<PetEdit />} />
          <Route path="/pets/:id" element={<PetDetail />} />
        </Routes>
      </div>
    </div>
  );
}

// Como estamos usando useNavigate, precisamos envolver App com Router no index.js ou criar um componente Wrapper.
// Exemplo utilizando um componente Wrapper:
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
