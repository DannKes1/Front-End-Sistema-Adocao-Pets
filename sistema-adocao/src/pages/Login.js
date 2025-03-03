// src/pages/Login.js
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  // Agora usamos "email" em vez de "username"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Envia { email, password } para a rota de login
      const response = await api.post("/users/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setError("");
      alert("Login realizado com sucesso!");
      navigate("/pets");
    } catch (error) {
      console.error(error);
      setError("Senha incorreta ou usuário não encontrado.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="mb-3">
              <span style={{ color: "red" }}>{error}</span>
              <br />
              <Link to="/password/forgot">Esqueceu a senha?</Link>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
