import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

export default function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const history = useHistory();

  async function handleNewTask(e) {
    e.preventDefault();

    const data = {
      titulo:title,
      descricao:description,
      concluido:status,
    };

    try {
      await api.post("/tarefas", data);

      history.push("/");
    } catch (err) {
      alert("Erro ao cadastrar tarefa, tente novamente.");
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

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
