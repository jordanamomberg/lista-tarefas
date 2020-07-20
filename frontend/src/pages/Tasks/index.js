import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiTrash2, FiXCircle, FiCheckCircle, FiEdit, FiList, FiPlusCircle } from "react-icons/fi";
import { toast } from 'react-toastify';

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
      toast.success("Excluído com sucesso!")

      setListTasks(listTasks.filter((task) => task.id !== id));
    } catch (err) {
      toast.error("Erro! Tente novamente.")
    }
  }

  return (
    <div className="task-container">
      <h1>
        <FiList className="list" size={28} color="#FF1493"/> 
        Lista de Tarefas
        <Link className="moretask" to="/cadastro">
          <FiPlusCircle className="more" size={28} color="#FF1493"/> 
        </Link>
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
