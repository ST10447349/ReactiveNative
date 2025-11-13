import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';
import { MenuItem, COURSES } from '../types';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation';

type AddNavProp = StackNavigationProp<RootStackParamList, 'AddItem'>;

export default function AddItemScreen({ navigation }: { navigation: AddNavProp }) {
  const { addItem } = useMenu();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<typeof COURSES[number]>('Starter');
  const [priceText, setPriceText] = useState('');

  function validate(): string | null {
    if (name.trim().length === 0) return 'Dish name is required';
    const p = parseFloat(priceText);
    if (isNaN(p) || p <= 0) return 'Price must be a positive number';
    return null;
  }

  function onAdd() {
    const err = validate();
    if (err) {
      Alert.alert('Validation', err);
      return;
    }
    const price = parseFloat(priceText);
    const item: MenuItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      course,
      price,
      available: true,
    };
    addItem(item);
    // Give feedback
    if (Platform.OS === 'web') {
      alert('Item added');
    }
    // Reset fields
    setName('');
    setDescription('');
    setPriceText('');
    setCourse('Starter');
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Dish</Text>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="e.g., Spaghetti Bolognese" />

      <Text style={styles.label}>Description</Text>
      <TextInput value={description} onChangeText={setDescription} style={[styles.input, { height: 80 }]} placeholder="Short description" multiline />

      <Text style={styles.label}>Course</Text>
      <View style={styles.picker}>
        <Picker selectedValue={course} onValueChange={(v) => setCourse(v as any)}>
          {COURSES.map(c => <Picker.Item key={c} label={c} value={c} />)}
        </Picker>
      </View>

      <Text style={styles.label}>Price (R)</Text>
      <TextInput value={priceText} onChangeText={setPriceText} style={styles.input} placeholder="e.g., 120" keyboardType="numeric" />

      <View style={{ marginTop: 12 }}>
        <Button title="Save" onPress={onAdd} />
      </View>
      <View style={{ marginTop: 8 }}>
        <Button title="Clear" color="#6c757d" onPress={() => { setName(''); setDescription(''); setPriceText(''); setCourse('Starter'); }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  label: { marginTop: 8, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginTop: 4 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, overflow: 'hidden', marginTop: 4 },
});