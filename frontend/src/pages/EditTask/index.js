import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { toast } from 'react-toastify';

import api from "../../services/api";

import "./styles.css";

export default function NewTask() {
  const {state} = useLocation();
  const params = useParams()

  const [title, setTitle] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [status, setStatus] = useState(state.status);

  const history = useHistory();

  async function handleNewTask(e) {
    e.preventDefault();

    const data = {
      titulo:title,
      descricao:description,
      concluido:status,
    };

    try {
      await api.put(`/tarefas/${params.id}`, data);
      toast.success("Tarefa alterada com sucesso!")

      history.push("/");
    } catch (err) {
      toast.error("Erro! Tente novamente.");
    }
  }

  return (
    <div className="new-task-container">
      <div className="content">
        <button className="close" onClick={() => history.push('/')}>
          <FiX size={24} color="#FF1493"/>
        </button>

        <form onSubmit={handleNewTask}>
          <input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="" >Concluído</option>
            <option 
              value="1"
            >
              Sim
            </option>
            <option 
              value="0"
            >
              Não
            </option>
          </select>
          
          <button className="button">Salvar alterações</button>
        </form>
      </div>
    </div>
  );
}