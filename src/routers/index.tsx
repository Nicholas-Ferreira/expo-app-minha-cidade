import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Empty } from '../screens/Empty'
import { LoginScreen } from '../screens/Login'
import { CadastroScreen } from '../screens/Cadastro'
import { DashboardScreen } from '../screens/Dashboard'
import { CustomDrawerContentComponent } from './DrawerContent';
import { Icon } from '@ui-kitten/components';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const optionsDrawer = (icon: string) => ({
  drawerIcon: ({ color, size }: any) =>
    <Icon
      style={{ width: size, height: size }}
      fill={color}
      name={icon}
    />
})

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContentComponent}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} options={optionsDrawer('map-outline')} />
      <Drawer.Screen name="Article" component={Empty} options={optionsDrawer('map-outline')} />
    </Drawer.Navigator>
  )
}

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName={'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Dashboard" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type UnAuthRouters = {
  Login: undefined;
  Cadastro: undefined;
  Dashboard: undefined;
};

type ScreenNavigationProp = StackNavigationProp<UnAuthRouters>;
export type ScreenProps = { navigation: ScreenNavigationProp };
