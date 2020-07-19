import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

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

      history.push("/");
    } catch (err) {
      alert("Erro ao editar tarefa, tente novamente.");
    }
  }

  return (
    <div className="new-task-container">
      <div className="content">
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

          <input
            placeholder="Concluído: Ex '0 ou 1'"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <button className="button">Editar</button>
        </form>
      </div>
    </div>
  );
}
