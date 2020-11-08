import React from 'react';
import { StyleSheet } from 'react-native'
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const DrawerIcon = (props: any) => (<Icon {...props} name='menu-outline' fill={'black'} />);

export const MyTopNavigation = ({ navigation, title }: any) => {

  const NavigationActionDrawer = () => (
    <TopNavigationAction icon={DrawerIcon} onPress={() => navigation.openDrawer()} />
  )

  return (
    <TopNavigation title={title} alignment='start' accessoryLeft={NavigationActionDrawer} />
  )
}

const style = StyleSheet.create({
  
})
