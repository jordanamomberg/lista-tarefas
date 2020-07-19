import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiTrash2, FiXCircle, FiCheckCircle, FiEdit, FiList } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function Tasks() {
  const {push}= useHistory();
  
  const [listTasks, setListTasks] = useState([]);

  useEffect(() => {
    api.get("/tarefas").then((response) => {
      setListTasks(response.data);
    });
  }, []);

  

  async function handleDeleteTask(id) {
    try {
      await api.delete(`/tarefas/${id}`);

      setListTasks(listTasks.filter((task) => task.id !== id));
    } catch (err) {
      alert("Erro ao deletar tarefa, tente novamente.");
    }
  }

  return (
    <div className="task-container">
      <h1>
        <FiList size={28} color="#FF1493"/> 
        Lista de Tarefas
      </h1>

      <ul>
        {listTasks.map((task) => (
          <li key={task.id}>
            <strong>Título:</strong>
            <p>{task.titulo}</p>

            <strong>Descrição:</strong>
            <p>{task.descricao}</p>

            <strong>Concluído:</strong>
            <p>
              {task.concluido === 0 ? (
                <FiXCircle size={18} color="#FF0000" />
              ) : (
                <FiCheckCircle size={18} color="#32CD32" />
              )}
            </p>
            
            <button className="edit" onClick={() => push(`/editar/${task.id}`, {title: task.titulo, description: task.descricao, status: task.concluido})}>
              <FiEdit size={18} color="#FF1493"/>
            </button>

            <button onClick={() => handleDeleteTask(task.id)} type="button">
              <FiTrash2 size={18} color="#FF1493" />
            </button>
          </li>
        ))}
      </ul>

      <footer>
        <Link className="button" to="/cadastro">
          Nova tarefa
        </Link>
      </footer>
    </div>
  );
}
