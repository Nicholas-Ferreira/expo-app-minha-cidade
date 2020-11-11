import React, { useState, useEffect, useRef } from 'react'
import * as Location from 'expo-location';
import { StyleSheet, ImageBackground, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Autocomplete, AutocompleteItem, IndexPath, Layout, Select, Button, Spinner } from '@ui-kitten/components'
import { Picker } from '@react-native-picker/picker';
import { Imagens } from '../../Constants/assets';
import { useFetch } from '../../hooks/swr';

const filter = (item: any, query: string) => item.cidade_sem_acento.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query.toLowerCase());

const { width, height } = Dimensions.get('screen')
export const LocalicacaoScreen = ({ wizard }: any) => {
  const { data: cidades, error } = useFetch('/cidades')
  const [geocode, setGeocode] = useState<Location.LocationGeocodedAddress | null>(null)
  const [loading, setLoading] = useState(false)
  const [cidade, setCidade] = useState('')
  const [_cidades, _setCidades] = useState<Array<any>>([])
  const [errorScreen, setErrorScreen] = useState('')
  console.log(wizard)
  useEffect(() => {
    getLocationAsync()
  }, [])

  const getLocationAsync = async () => {
    setLoading(true)
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') return setErrorScreen('Permission to access location was denied')

    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    const geocode = await Location.reverseGeocodeAsync(location.coords)
    setGeocode(geocode[0])
    setLoading(false)
    setErrorScreen('')
  };

  const onSelect = (index: number) => {
    setCidade(_cidades[index].cidade);
  };

  const onChangeText = (query: string) => {
    setCidade(query);
    _setCidades(cidades.splice(0, 5).filter((item: any) => filter(item, query)));
  };

  const renderOption = (item: any, index: any) => {
    return (
      <AutocompleteItem
        key={index}
        title={item.cidade}
      />
    )
  }

  if (error) console.error(error)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getLocationAsync}>
        <Image source={require("../../../assets/images/marker.png")} style={{ width: 100, height: 100 }} />
      </TouchableOpacity>
      {loading
        ? <View style={styles.loading}><Spinner status='basic' /></View>
        : errorScreen
          ? <Text style={styles.heading2}>{errorScreen}</Text>
          : <>
            <Text style={styles.heading1}>{geocode ? `${geocode.region}, ${geocode.isoCountryCode}` : ""}</Text>
            {console.log(_cidades.length)}
            <Autocomplete
              style={styles.cidades}
              placeholder='Selecione sua cidade'
              placeholderTextColor={'#FFFFFF55'}
              selectionColor={'white'}
              value={cidade}
              onSelect={onSelect}
              onChangeText={onChangeText}
              textStyle={{ color: 'white' }}>
              {_cidades.map(renderOption)}
            </Autocomplete>
          </>
      }
      <Button style={styles.button} onPress={() => wizard.current?.next()}>Continuar</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width, height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    paddingTop: 25,
    height: 112
  },
  heading1: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    margin: 20
  },
  heading2: {
    color: "#fff",
    margin: 5,
    fontWeight: "bold",
    fontSize: 15
  },
  heading3: {
    color: "#fff",
    margin: 5
  },
  cidades: {
    width: '60%',
    color: 'white',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: 'white'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
});