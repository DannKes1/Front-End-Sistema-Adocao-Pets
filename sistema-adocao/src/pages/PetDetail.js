// src/pages/PetDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

// 1) Importar Modal e Button do react-bootstrap
import { Modal, Button } from "react-bootstrap";

function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  // 2) Estado para controlar o modal
  const [showModal, setShowModal] = useState(false);

  // Caso não exista imagem, usa placeholder
  const defaultImage = "https://via.placeholder.com/600x400?text=Sem+Foto";

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        const response = await api.get(`/pets/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do pet:", error);
        alert("Erro ao buscar detalhes do pet.");
      }
    };
    fetchPetDetail();
  }, [id]);

  if (!pet) {
    return <p>Carregando...</p>;
  }

  // Se a imagem foi enviada, constrói a URL para exibição
  const petImage = pet.image
    ? `http://localhost:3000/uploads/${pet.image}`
    : defaultImage;

  // 3) Funções de abrir/fechar o modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="card mb-3">
      {/* 4) Clique na imagem para abrir modal */}
      <img
        src={petImage}
        className="card-img-top"
        alt={pet.name}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          cursor: "pointer",
        }}
        onClick={handleOpenModal}
      />

      <div className="card-body">
        <h3 className="card-title">{pet.name}</h3>
        <p className="card-text">
          <strong>Idade:</strong> {pet.age} {pet.age === 1 ? "ano" : "anos"}
        </p>
        <p className="card-text">{pet.description}</p>
        <p className="card-text">
          <strong>Localização:</strong> {pet.location || "Não informado"}
        </p>
      </div>

      {/* 5) Modal do Bootstrap exibindo a imagem em tamanho maior */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{pet.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Aqui a imagem sem forçar height, para ficar grande */}
          <img
            src={petImage}
            alt={pet.name}
            style={{ width: "100%", objectFit: "contain" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PetDetail;
