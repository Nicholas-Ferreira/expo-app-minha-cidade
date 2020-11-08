import * as React from 'react';
import * as eva from '@eva-design/eva';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset'
import Constants from 'expo-constants';
import { Image, View, StyleSheet } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import FlashMessage from 'react-native-flash-message';
import { Navigation } from './routers'
import { Medias, Icons } from './Constants/assets';

const assetImages: Array<string> = [
  Medias.background,
  ...Object.values(Icons)
];

export default () => {
  const [loading, setLoading] = React.useState(true)

  const cacheImages = (images: Array<string>): Array<Promise<Asset | boolean>> => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  const _loadResourcesAsync = async (): Promise<any> => {
    return Promise.all([
      ...cacheImages(assetImages)
    ]);
  };

  const _handleLoadingError = (error: Error) => {
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    setLoading(false)
  };

  if (loading) {
    return <AppLoading
      startAsync={_loadResourcesAsync}
      onError={_handleLoadingError}
      onFinish={_handleFinishLoading}
    />
  }

  return (
    <View style={style.container}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigation />
      </ApplicationProvider>
      <FlashMessage position="top" duration={2000} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight
  }
})