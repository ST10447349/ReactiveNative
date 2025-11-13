import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import EditItemScreen from '../screens/EditItemScreen';
import FilterScreen from '../screens/FilterScreen';

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
  EditItem: { id: string };
  Filter: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Menu List" }} />
      <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Add New Dish' }} />
      <Stack.Screen name="EditItem" component={EditItemScreen} options={{ title: 'Edit Dish' }} />
      <Stack.Screen name="Filter" component={FilterScreen} options={{ title: 'Filter by Course' }} />
    </Stack.Navigator>
  );
}