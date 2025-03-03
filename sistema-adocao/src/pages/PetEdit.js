// src/pages/PetEdit.js

import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function PetEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  // 1) Novo state para a imagem
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchPet();
  }, []);

  const fetchPet = async () => {
    try {
      const response = await api.get(`/pets/${id}`);
      const pet = response.data;
      if (pet) {
        setName(pet.name);
        setAge(pet.age);
        setDescription(pet.description);
        // Aqui NÃO há file para setar, pois viria do servidor
        // mas se quisesse exibir a URL da imagem, pode usar outro state
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar pet");
    }
  };

  // 2) Função para capturar o arquivo selecionado
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    try {
      // 3) Usar FormData, igual no PetCreate
      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("description", description);

      // Se quiser atualizar category, location etc., inclua aqui
      // formData.append("category", category);
      // formData.append("location", location);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // 4) Envia via PUT (com multipart/form-data)
      await api.put(`/pets/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Pet atualizado com sucesso!");
      navigate("/pets");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar pet.");
    }
  };

  return (
    <div>
      <h2>Editar Pet</h2>
      <form onSubmit={handleUpdatePet}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Idade</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Campo de upload de nova foto */}
        <div className="mb-3">
          <label className="form-label">Nova Foto (opcional)</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Atualizar
        </button>
      </form>
    </div>
  );
}

export default PetEdit;
