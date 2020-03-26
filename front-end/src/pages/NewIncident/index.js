import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/img/logo.svg';
import './styles.css';
import api from '../../services/api';


export default function NewIncident() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [value, setValue] = useState("")
  const ongId = localStorage.getItem('ongId')
  const history = useHistory();

  async function handleRegisterIncident(e){
    e.preventDefault();

    const data = {
        title,
        description,
        value
    }

    try {
      const response = await api.post('/incidents', data, {
        headers:{
            Authorization:ongId
        }
      })
      history.push('/profile')
      
    } catch (error) {
        alert("Error ao tentar cadastrar o caso, tente novamente!")
    } 
  }
  return (
    <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Logo App"/>
                <h1>Cadastrar novo caso</h1>
                <p>Forneça as infos sobre seu novo caso!</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                   Voltar para home!</Link>
            </section>
            <form onSubmit={handleRegisterIncident}>
                <input 
                value={title} 
                onChange={e=>setTitle(e.target.value)} 
                placeholder="Titulo do Caso"
                />
                <textarea 
                placeholder="Descrição do Caso"
                value={description} 
                onChange={e=>setDescription(e.target.value)}
                />
                <input 
                placeholder="Valor em Reais"
                value={value} 
                onChange={e=>setValue(e.target.value)}
                />
            
                <button className="button" type="submit">Cadastrar</button>
            
            </form>
        </div>
    </div>
  );
}
