import React, {useEffect, useState} from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo.png'
import api from '../../services/api';


import styles from './styles'


export default function Incidents() {

  const navigation =  useNavigation();
  const [incidents, setIncidents] = useState([])
  const [totalItens, setTotalItens] = useState(0)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  function navigateToDetails(incident){
    navigation.navigate('Details',{incident})
  }

  async function loadIncidents(){
    if(loading){
      return;
    }

    if(totalItens > 0 && incidents.length === totalItens){
      return;
    }
    setLoading(true)
    const response = await api.get('/incidents',{
      params:{
        page
      }

    });
    setIncidents([...incidents, ...response.data])
    setTotalItens(response.headers['x-total-count'])
    setPage(page+1)
    setLoading(false)

  }

  useEffect(()=>{
   loadIncidents();
   
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{totalItens} casos.</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>
      <FlatList 
      style={styles.incidentList}
      data={incidents}
      onEndReached={loadIncidents}
      onEndReachedThreshold={0.2}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={true}
      renderItem={({item:incident})=> (
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Valor:</Text>
          <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</Text>

          <TouchableOpacity 
          style={styles.detailsButton} 
          onPress={()=>navigateToDetails(incident)}>
            <Text style={styles.detailsButtonText}>Ver mais detalhes.</Text>
            <Feather name="arrow-right" size={16} color="#E02041"/>
          </TouchableOpacity>
        </View>
      )}/>
    </View>
  );
}
