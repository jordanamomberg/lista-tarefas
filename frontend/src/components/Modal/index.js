import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import api from "../../services/api";

import "./styles.css";

const Modal = ({ dados, id = "modal", onClose = () => {}, children }) => {
  const [title, setTitle] = useState(dados.title);
  const [description, setDescription] = useState(dados.description);
  const [status, setStatus] = useState(dados.status);

  const handleOutsideClose = (e) => {
    if (e.target.id === id) onClose();
  };

  async function handleNewTask(e) {
    e.preventDefault();

    const data = {
      titulo: title,
      descricao: description,
      concluido: status,
    };

    try {
      if (dados.id) {
        await api.put(`/tarefas/${dados.id}`, data);
        toast.success("Tarefa Alterada com sucesso!");
      } else {
        await api.post("/tarefas", data);
        toast.success("Tarefa cadastrada com sucesso!");
      }
    } catch (err) {
      toast.error("Erro! Tente novamente.");
    }
    onClose();
  }

  return (
    <div className="new-task-container" id={id} onClick={handleOutsideClose}>
      <div className="content">
        <button className="close" onClick={onClose}>
          <FiX size={32} color="#FF1493" />
          {children}
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

          {/* RADIO BUTTON */}

          <FormControl component="fieldset">
            <FormLabel component="legend">Concluido</FormLabel>
            <RadioGroup onChange={(e) => setStatus(e.target.value)}>
              <FormControlLabel value="1" control={<Radio />} label="Sim" />
              <FormControlLabel value="0" control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>

          {/* <SELECT></SELECT> */}

          {/* <select onChange={(e) => setStatus(e.target.value)}>
            <option value="" >Concluido</option>
            <option value="1">
              Sim
            </option>
            <option value="0">
              Não
            </option>
          </select> */}

    
            <button className="button">
              {dados.id ? 'Salvar alterações' : 'Cadastrar'}
            </button>

        </form>
      </div>
    </div>
  );
};

export default Modal;
