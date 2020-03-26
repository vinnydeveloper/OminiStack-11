import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/img/logo.svg';
import api from '../../services/api';
import './styles.css';


export default function Profile() {
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const [incidents, setIncidents] = useState([])
    const history = useHistory();

    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization:ongId
            }
        }).then(response =>{
            setIncidents(response.data)
        })
    }, [ongId]);

    async function handleDelete(id){
        try {
            await api.delete('incidents/'+ id, {
                headers:{
                    Authorization:ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id != id))
        } catch (error) {
            alert('Erro ao tentar deletar o caso, tente novamente!')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return (
    <div className="profile-container">
        <header>
            <img src={logoImg} alt="Logo App"/>
            <span>Bem vinda, {ongName}</span>
            <Link to="/incidents/new" className="button">Cadastrar um novo caso</Link>
            <button onClick={handleLogout}>
                <FiPower size={18} color="#E022041"/>
            </button>
        </header>

        <h1>Casos cadastrados</h1>

        <ul>
            {
                incidents.map(incident => {
                    return (
                        <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>
        
                        <strong>DESCRIÇÃO: </strong>
                        <p>{incident.description}</p>
        
                        <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</p>
        
                        <button onClick={()=>handleDelete(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                    );
                })
            }
        </ul>
    </div>
  );
}
