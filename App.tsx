import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from './src/context/MenuContext';
import RootStack from './src/navigation';

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <RootStack />
        </SafeAreaView>
      </NavigationContainer>
    </MenuProvider>
  );
}