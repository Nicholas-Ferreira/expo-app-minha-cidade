import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const LoginScreen = ({ navigation }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <TopNavigation title='MyApp' alignment='center' />
    <Divider />
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={() => navigation.navigate('Details')}>OPEN DETAILS</Button>
    </Layout>
  </SafeAreaView>
);