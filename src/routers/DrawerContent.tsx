import React from 'react'
import { StyleSheet } from 'react-native'
import { Divider, Icon, Layout, Text, Avatar } from '@ui-kitten/components';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View } from 'react-native';

export const CustomDrawerContentComponent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.containHeader}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar style={styles.avatar} shape='round' source={require('../../assets/icon.png')} />
          <Text>{`Bem vindo`}</Text>
          <Text>{`Nicholas Ferreira`}</Text>
        </View>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  containHeader: {
    padding: 25
  },
  avatar: {
    margin: 5
  }
})