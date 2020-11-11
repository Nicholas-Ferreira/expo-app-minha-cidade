import React, { useState, useEffect, useRef } from 'react'
import * as Location from 'expo-location';
import { StyleSheet, ImageBackground, View, Image, Text, TouchableOpacity } from 'react-native';
import { Autocomplete, AutocompleteItem, IndexPath, Layout, Select, Button, Spinner } from '@ui-kitten/components'
import { Picker } from '@react-native-picker/picker';
import Wizard from 'react-native-wizard';

import { LocalicacaoScreen } from './Localicacao'
import { InformacoesScreen } from './Informacoes';

export const CadastroScreen = () => {
  const wizard = useRef(null)

  const stepList = [
    {
      content: <LocalicacaoScreen wizard={wizard} />
    },
    {
      content: <InformacoesScreen wizard={wizard} />
    }
  ]

  return (
    <ImageBackground source={require("../../../assets/images/cidade.png")} blurRadius={4} style={styles.container}>
      <View style={styles.overlay}>
        <Wizard
          ref={wizard}
          activeStep={0}
          steps={stepList}
          onNext={() => {
            console.log("Next Step Called")
          }}
          onPrev={() => {
            console.log("Previous Step Called")
          }}
          currentStep={({ currentStep, isLastStep, isFirstStep }) => {
            console.log(currentStep)
          }}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  overlay: {
    backgroundColor: "#00000070",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
});