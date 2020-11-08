import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Text, Icon, Layout, Button, Avatar } from '@ui-kitten/components';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import { MyTopNavigation } from '../routers/TopNavigation';
import { ScrollableModal } from '../components/ScrollableModal';
import Constants from 'expo-constants';
import { Icons } from './../Constants/assets';

const LocationIcon = (props: any) => (<Icon {...props} name='navigation-2-outline' fill={'white'} />);
const PlusIcon = (props: any) => (<Icon {...props} name='plus-outline' />);

const _markers = [
  {
    title: '1',
    description: '1',
    latlng: {
      latitude: -23.5503099,
      longitude: -46.6342009,
    }
  }
]
const startLocation = { latitude: -23.5503099, longitude: -46.6342009, latitudeDelta: 0.00922, longitudeDelta: 0.0121 }
const { width, height } = Dimensions.get('screen')

export const DashboardScreen = (props: any) => {
  const mapRef = useRef<MapView>(null)
  const [modalPasta, setModalPasta] = useState(false)
  const [markers, setMarkers] = useState<Array<IMarker>>(_markers)
  const [markerPasta, setMarkerPasta] = useState<Region | null>(null)

  useEffect(() => {
    requestPermissionLocation()
      .catch(err => console.error(err))
  }, [])

  const requestPermissionLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') return;
    return moveToMyLocation()
  }

  const moveToMyLocation = async () => {
    let { coords } = await Location.getCurrentPositionAsync({});
    mapRef.current?.animateToCoordinate(coords)
  }

  const handleNovaPasta = async () => {
    setModalPasta(true)
  }

  const onRegionChange = async (point: Region) => {
    setMarkerPasta(point)
    console.log(point)
  }

  return (
    <Layout style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      {!modalPasta && <MyTopNavigation {...props} title='São Paulo' />}
      <Layout style={styles.container}>
        <MapView
          ref={mapRef}
          style={[styles.mapStyle, { height: modalPasta ? '70%' : '100%' }]}
          initialRegion={startLocation}
          showsMyLocationButton={false}
          showsUserLocation={true}
          onRegionChangeComplete={onRegionChange}
        >
          {!modalPasta &&
            markers.map((marker, index) =>
              <Marker
                key={index}
                image={Icons.pin}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />)}
        </MapView>

        {modalPasta && <Avatar style={[styles.marker]} source={Icons.pin} />}
        <ScrollableModal
          visible={modalPasta}
          onClose={() => setModalPasta(false)}
          coverScreen={false}>
          <Text>asdasdasd</Text>
          <Button onPress={() => setModalPasta(false)}>Continuar</Button>
        </ScrollableModal>

        <Layout style={styles.containerButtons}>
          <Button style={styles.buttonMyLocation} appearance='ghost' accessoryLeft={LocationIcon} onPress={moveToMyLocation} />
          <Button style={styles.buttonNovaPasta} appearance='filled' accessoryLeft={PlusIcon} onPress={handleNovaPasta} />
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  marker: {
    position: "absolute",
    top: height / 2 * 0.70 - 55,
    right: width / 2 - 12.5,
    width: 25,
    height: 25
  },
  containerButtons: {
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: '#00000000'
  },
  buttonMyLocation: {
    width: 8,
    height: 8,
    marginBottom: 12,
    backgroundColor: '#00000044',
    borderRadius: 50,
  },
  buttonNovaPasta: {
    width: 55,
    height: 55,
    color: 'black',
    borderRadius: 50,
  }
});

type IMarker = {
  title?: string;
  description?: string;
  latlng: LatLng
}