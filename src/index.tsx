import * as React from 'react';
import * as eva from '@eva-design/eva';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset'
import { Image } from 'react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Routers from './routers'

const assetImages: Array<string> = [];

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
    <ApplicationProvider {...eva} theme={eva.light}>
      <Routers />

      <FlashMessage position="top" duration={2000} />
    </ApplicationProvider>
  )
}
