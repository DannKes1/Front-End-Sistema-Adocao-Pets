import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarMenu() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo ou Título */}
        <Link className="navbar-brand" to="/">
          AdotePets
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Links à esquerda */}
          <ul className="navbar-nav me-auto">
            {/* Link para Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Início
              </Link>
            </li>
            {/* Apenas mostra link de Pets se estiver logado */}
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/pets">
                  Pets
                </Link>
              </li>
            )}
          </ul>

          {/* Links à direita */}
          <ul className="navbar-nav">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Entrar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Cadastrar
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Sair
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarMenu;
