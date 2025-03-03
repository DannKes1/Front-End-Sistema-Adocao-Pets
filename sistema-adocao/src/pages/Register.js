// Register.js
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // States de cadastro
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // <-- Adicionei o estado de email
  const [password, setPassword] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  // Função para buscar dados via CEP utilizando a API ViaCEP
  const handleCepBlur = async (e) => {
    const cepValue = e.target.value.replace(/\D/g, ""); // remove caracteres não numéricos
    setCep(cepValue);
    if (cepValue.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cepValue}/json/`
        );
        const data = await response.json();
        if (!data.erro) {
          setAddress(data.logradouro || "");
          setCity(data.localidade || "");
        } else {
          alert("CEP não encontrado. Verifique o número digitado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      // Envia todos os campos, incluindo o 'email'
      await api.post("/users/register", {
        username,
        email, // <-- Inclua aqui o email
        password,
        address,
        cep,
        phone,
        city,
        birthDate,
      });
      alert("Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg("Erro ao cadastrar usuário. Tente novamente.");
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <h2 className="text-center mb-4">Cadastro de Usuário</h2>
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleRegister}>
          {/* Nome de usuário */}
          <div className="mb-3">
            <label className="form-label">Nome de usuário</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
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

          {/* Senha */}
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

          {/* CEP */}
          <div className="mb-3">
            <label className="form-label">CEP</label>
            <input
              type="text"
              className="form-control"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={handleCepBlur}
              placeholder="Apenas números (ex: 01001000)"
              required
            />
          </div>

          {/* Endereço (preenchido automaticamente) */}
          <div className="mb-3">
            <label className="form-label">Endereço</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Telefone */}
          <div className="mb-3">
            <label className="form-label">Telefone</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(XX) XXXXX-XXXX"
              pattern="\(\d{2}\)\s\d{5}-\d{4}"
              title="Digite o telefone no formato (XX) XXXXX-XXXX"
              required
            />
          </div>

          {/* Cidade (preenchido automaticamente) */}
          <div className="mb-3">
            <label className="form-label">Cidade</label>
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          {/* Data de Nascimento */}
          <div className="mb-3">
            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              className="form-control"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
