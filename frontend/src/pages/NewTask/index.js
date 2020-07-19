import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiX } from "react-icons/fi";

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

    console.log(data)
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
            <option value="" >Status</option>
            <option 
              value="1"
              
            >
              OK
            </option>
            <option 
              value="0"
            >
              Não OK
            </option>
          </select>

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
