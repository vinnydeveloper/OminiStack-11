import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './style';
import logoImg from '../../assets/logo.png'
import * as MailComposer from 'expo-mail-composer';
import {Linking} from 'react-native'

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.name}" com o valor de ${Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}}`;




  function navigateBack(){
    return navigation.goBack()
  }

  function sendEmail(){
    MailComposer.composeAsync({
      subject:`Heroi do caso: ${incident.title}`,
      recipients:[incident.email],
      body:message
    })
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=+5511985740825&text=${message}`)

  }
  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Image source={logoImg}/>
        <TouchableOpacity onPress={navigateBack}> 
          <Feather name="arrow-left" size={28} color="#E82041"/>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Salve o hero desse caso.</Text>

        <Text style={styles.heroDescription}>
          Entre em contato:
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp }>
            <Text style={styles.actionText}>
              Whastsapp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>
              Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}
