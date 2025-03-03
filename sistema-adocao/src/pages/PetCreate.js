// src/pages/PetCreate.js
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function PetCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleCreatePet = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await api.post("/pets", formData);

      alert("Pet criado com sucesso!");
      navigate("/pets");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar pet. Verifique se está logado!");
    }
  };

  return (
    <div>
      <h2>Criar Novo Pet</h2>
      <form onSubmit={handleCreatePet}>
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
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ex: Cão, Gato..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Localização</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Cidade ou bairro"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Foto do Pet</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Criar
        </button>
      </form>
    </div>
  );
}

export default PetCreate;
