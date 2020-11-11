import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Dimensions, TextInput } from 'react-native';
import { Text, Layout, Button, Select, SelectItem, IndexPath } from '@ui-kitten/components'
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('screen')
export const InformacoesScreen = ({ wizard }: any) => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [CPF, setCPF] = useState('')

  const [profissao, setProfissao] = useState<string>('');

  const onChangeCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return setCPF(cpf)
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={CPF}
          maxLength={14}
          keyboardType={'numeric'}
          onChangeText={onChangeCPF}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          keyboardType={'email-address'}
          onChangeText={setEmail}
        />

        <Picker
          style={styles.picker}
          selectedValue={profissao}
          onValueChange={(v) => setProfissao(v.toString())} >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>

      <Button style={styles.button} onPress={() => wizard.current?.next()}>Continuar</Button>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  body: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  loading: {
    paddingTop: 25,
    height: 112
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20
  },
  text: {
    color: "#fff",
    margin: 5,
    fontWeight: "bold",
    fontSize: 15
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFFDF',
    fontSize: 16,
    borderRadius: 5,
    marginVertical: 10,
    padding: 15
  },
  picker: {
    width: '100%',
    backgroundColor: '#FFFFFFDF',
    fontSize: 16,
    borderRadius: 5,
    marginVertical: 10,
    padding: 15
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
});