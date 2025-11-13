import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';
import { MenuItem, COURSES } from '../types';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation';
import * as ImagePicker from 'expo-image-picker';
import { RouteProp } from '@react-navigation/native';

type EditNavProp = StackNavigationProp<RootStackParamList, 'EditItem'>;
type EditRouteProp = RouteProp<RootStackParamList, 'EditItem'>;

export default function EditItemScreen({ navigation, route }: { navigation: EditNavProp; route: EditRouteProp }) {
  const { menuItems, updateItem } = useMenu();
  const id = route.params.id;
  const item = menuItems.find(i => i.id === id);

  // Local state for edit fields
  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [course, setCourse] = useState<typeof COURSES[number]>(item?.course ?? 'Starter');
  const [priceText, setPriceText] = useState(item ? item.price.toString() : '');
  const [available, setAvailable] = useState<boolean>(item?.available ?? true);
  const [imageUri, setImageUri] = useState<string | undefined>(item?.imageUri);

  useEffect(() => {
    if (!item) {
      Alert.alert('Error', 'Item not found');
      navigation.goBack();
    }
  }, [item]);

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Permission to access media library is required to choose a photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.6, allowsEditing: true });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  }

  function validate(): string | null {
    if (name.trim().length === 0) return 'Dish name is required';
    const p = parseFloat(priceText);
    if (isNaN(p) || p <= 0) return 'Price must be a positive number';
    return null;
  }

  function onUpdate() {
    const err = validate();
    if (err) {
      Alert.alert('Validation', err);
      return;
    }
    const updated: MenuItem = {
      id,
      name: name.trim(),
      description: description.trim(),
      course,
      price: parseFloat(priceText),
      available,
      imageUri,
    };
    updateItem(updated);
    navigation.navigate('Home');
  }

  function onCancel() {
    navigation.goBack();
  }

  if (!item) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Dish</Text>
      <View style={{ alignItems: 'center', marginBottom: 12 }}>
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : <View style={[styles.image, styles.imagePlaceholder]}><Text style={{ color: '#777' }}>No photo</Text></View>}
        <View style={{ marginTop: 8 }}>
          <Button title="Change Photo" onPress={pickImage} />
        </View>
      </View>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Category</Text>
      <View style={styles.picker}>
        <Picker selectedValue={course} onValueChange={(v) => setCourse(v as any)}>
          {COURSES.map(c => <Picker.Item key={c} label={c} value={c} />)}
        </Picker>
      </View>

      <Text style={styles.label}>Price (R)</Text>
      <TextInput value={priceText} onChangeText={setPriceText} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Description</Text>
      <TextInput value={description} onChangeText={setDescription} style={[styles.input, { height: 80 }]} multiline />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <Text style={{ marginRight: 8 }}>Available</Text>
        <Switch value={available} onValueChange={setAvailable} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
        <Button title="Cancel" color="#6c757d" onPress={onCancel} />
        <Button title="Update" onPress={onUpdate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  label: { marginTop: 8, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginTop: 4 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, overflow: 'hidden', marginTop: 4 },
  image: { width: 120, height: 120, borderRadius: 8, backgroundColor: '#f0f0f0' },
  imagePlaceholder: { alignItems: 'center', justifyContent: 'center' },
});