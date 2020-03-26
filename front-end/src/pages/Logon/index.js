import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';

import heroesImg from '../../assets/img/heroes.png';
import logoImg from '../../assets/img/logo.svg';
import api from '../../services/api';

export default function Logon() {
  const [id, setId] = useState("")
  const history = useHistory();
  async function handleLogon(e){
    e.preventDefault();
    try {
      const response = await api.post('/sessions', {id});

      localStorage.setItem('ongName', response.data.name)
      localStorage.setItem('ongId', id)

      history.push('/profile');
    } catch (error) {
      alert('Falha ao tentar fazer login')
    }

  }
  return (
    <div className="logon-container">
        <section className="form">
            <img src={logoImg} alt="Logo App"/>
            <form onSubmit={handleLogon}>
                <h1>Faça seu logon</h1>
                <input value={id} onChange={e => setId(e.target.value)} placeholder="Sua ID"/>
                <button className="button" type="submit">Entrar</button>
                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro!</Link>
            </form>
        </section>

        <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
