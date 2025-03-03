import React from "react";
import { Link } from "react-router-dom";
import banner1 from "../assets/images/banner1.jpg";
import banner2 from "../assets/images/banner2.jpg";
import depoimento1 from "../assets/images/depoimento1.jpg";
import depoimento2 from "../assets/images/depoimento2.jpg";
import depoimento3 from "../assets/images/depoimento3.jpg";

function Home() {
  return (
    <div>
      {/* Banner com Slider (Carousel) */}
      <div
        id="bannerCarousel"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={banner1}
              className="d-block w-100"
              alt="Banner 1"
              style={{ display: "block", margin: "0 auto" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 style={{ color: "black" }}>
                Encontre seu novo melhor amigo!
              </h2>
              <p style={{ color: "black" }}>Adote, ame e transforme vidas.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={banner2} className="d-block w-100" alt="Banner 1" />
            <div className="carousel-caption d-none d-md-block">
              <h2>Pets esperando por um lar</h2>
              <p>Dê uma chance a um pet que precisa de carinho.</p>
            </div>
          </div>
        </div>

        {/* Controles do Carousel */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>

      {/* Missão e Valores */}
      <div className="text-center mb-5">
        <h2>Missão e Valores</h2>
        <p className="lead">
          Nossa missão é unir pets em busca de um lar cheio de amor às famílias
          que querem adotar.
        </p>
      </div>

      {/* Como Funciona */}
      <div className="mb-5">
        <h2 className="text-center">Como Funciona</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-search" style={{ fontSize: "2rem" }}></i>
            <h4>Encontre um Pet</h4>
            <p>
              Navegue pela nossa galeria e escolha o pet que mais combina com
              você.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-info-circle" style={{ fontSize: "2rem" }}></i>
            <h4>Conheça Mais</h4>
            <p>Veja detalhes, histórias e curiosidades de cada pet.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-heart" style={{ fontSize: "2rem" }}></i>
            <h4>Adote com Segurança</h4>
            <p>
              Entre em contato e inicie o processo de adoção com total
              segurança.
            </p>
          </div>
        </div>
      </div>

      {/* Histórias de Sucesso */}
      <div className="mb-5">
        <h2 className="text-center">Histórias de Sucesso</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card">
              <img
                src={depoimento1}
                className="card-img-top"
                alt="Depoimento 1"
              />
              <div className="card-body">
                <p className="card-text">
                  "Adotar foi a melhor decisão! Nosso lar ganhou um novo membro
                  cheio de alegria."
                </p>
                <footer className="blockquote-footer">Maria e João</footer>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <img
                src={depoimento2}
                className="card-img-top"
                alt="Depoimento 2"
              />
              <div className="card-body">
                <p className="card-text">
                  "A transformação em nossa vida foi instantânea, nosso pet
                  trouxe amor e felicidade."
                </p>
                <footer className="blockquote-footer">Ana</footer>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card">
              <img
                src={depoimento3}
                className="card-img-top"
                alt="Depoimento 3"
              />
              <div className="card-body">
                <p className="card-text">
                  "Nunca imaginei o quanto um pet poderia mudar minha vida.
                  Recomendo a todos adotar!"
                </p>
                <footer className="blockquote-footer">Carlos</footer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mb-5">
        <h2>Pronto para fazer a diferença?</h2>
        <p className="lead">Junte-se a nós e ajude a transformar vidas.</p>
        <Link to="/pets" className="btn btn-primary btn-lg me-2">
          Veja nossos Pets
        </Link>
        <Link to="/register" className="btn btn-success btn-lg">
          Cadastre-se para Adotar
        </Link>
      </div>

      {/* Destaques e Estatísticas */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2>Nossos Números</h2>
          <div className="row">
            <div className="col-md-4">
              <h3>150+</h3>
              <p>Pets adotados</p>
            </div>
            <div className="col-md-4">
              <h3>100+</h3>
              <p>Famílias felizes</p>
            </div>
            <div className="col-md-4">
              <h3>50+</h3>
              <p>Histórias de sucesso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
