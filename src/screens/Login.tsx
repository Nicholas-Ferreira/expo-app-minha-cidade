import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View, Image, TextInput } from 'react-native';
import { Button, Text, Layout, TopNavigation, Avatar } from '@ui-kitten/components';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import { ScreenProps } from '../routers'
import { Video } from 'expo-av';
import { Medias } from '../Constants/assets'
import { Icons } from './../Constants/assets';

const { width, height } = Dimensions.get('screen')

export const LoginScreen = ({ navigation }: ScreenProps) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={Medias.background}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width, height, position: 'absolute', opacity: 0.7 }}
      />

      <View style={styles.page}>
        <View style={styles.header}>
          <Image source={Icons.city} style={{ width: 120, height: 120, margin: 35 }} />
          <Text style={styles.text} category='h6'> Nos ajude a melhorar a cidade. </Text>
          <Text style={[styles.text, { marginTop: 6 }]}> Faça login para acessar </Text>
        </View>

        <View style={styles.body}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={value => setSenha(value)}
            secureTextEntry={true}
          />

          <Button style={styles.button} onPress={() => navigation.navigate('Dashboard')}>Entrar</Button>
          <Text style={[styles.text, { padding: 10 }]} onPress={() => navigation.navigate('Cadastro')}> Não possui conta? cadastre-se! </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center'
  },
  body: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  text: {
    color: 'white'
  },
  button: {
    width: '80%',
    marginVertical: 15
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFFDF',
    fontSize: 16,
    borderRadius: 5,
    marginVertical: 10,
    padding: 15
  }
})