import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

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
      toast.success("Tarefa cadastrada com sucesso!")

      history.push("/")
  
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
            <option value="" >Concluido</option>
            <option value="1">
              Sim
            </option>
            <option value="0">
              Não
            </option>
          </select>

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
