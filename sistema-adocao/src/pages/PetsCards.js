import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
// *** Import corrigido:
import { jwtDecode } from "jwt-decode";

function PetsCards() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  // Imagem padrão caso não haja foto
  const defaultImage = "https://via.placeholder.com/300x200?text=Sem+Foto";

  // Decodifica o token para obter os dados do usuário (se logado)
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    setFilteredPets(
      pets.filter((pet) => {
        const matchesSearch = pet.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory = filterCategory
          ? pet.category === filterCategory
          : true;
        const matchesLocation = filterLocation
          ? pet.location === filterLocation
          : true;
        return matchesSearch && matchesCategory && matchesLocation;
      })
    );
  }, [search, filterCategory, filterLocation, pets]);

  // Busca todos os pets
  const fetchPets = async () => {
    try {
      const response = await api.get("/pets");
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
      alert("Erro ao buscar lista de pets. Verifique se está logado!");
    }
  };

  // *** Função para excluir pet
  const handleDelete = async (petId) => {
    if (!window.confirm("Tem certeza que deseja excluir este pet?")) return;

    try {
      await api.delete(`/pets/${petId}`);
      alert("Pet removido com sucesso!");

      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.error(error);
      alert("Erro ao remover pet.");
    }
  };

  return (
    <div>
      <h2 className="mb-3">Pets para Adoção</h2>

      {user && (
        <Link to="/pets/create" className="btn btn-success mb-3">
          Incluir Pet
        </Link>
      )}

      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            <option value="cão">Cão</option>
            <option value="gato">Gato</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="">Todas as Localizações</option>
            <option value="São Paulo">São Paulo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredPets.length === 0 ? (
          <p>Nenhum pet encontrado.</p>
        ) : (
          filteredPets.map((pet) => {
            const petImage = pet.image
              ? `http://localhost:3000/uploads/${pet.image}`
              : defaultImage;

            return (
              <div key={pet.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm hover-card">
                  <img
                    src={petImage}
                    className="card-img-top"
                    alt={pet.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{pet.name}</h5>
                    <p className="card-text">
                      {pet.description
                        ? pet.description.substring(0, 100) + "..."
                        : "Sem descrição."}
                    </p>

                    {/* Exibir o criador do pet */}
                    <small className="text-muted">
                      Criado por: {pet.owner_username}
                    </small>
                  </div>

                  {/* Footer do card com botões */}
                  <div className="card-footer bg-white d-flex justify-content-between">
                    <Link to={`/pets/${pet.id}`} className="btn btn-primary">
                      Mais Detalhes
                    </Link>

                    {/* Se for dono ou admin, mostra Editar/Excluir */}
                    {user && (user.is_admin || pet.user_id === user.id) && (
                      <div>
                        <Link
                          to={`/pets/edit/${pet.id}`}
                          className="btn btn-warning me-2"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(pet.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default PetsCards;
