import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { MenuItem } from '../types';

type Props = {
  item: MenuItem;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function MenuItemRow({ item, onEdit, onRemove }: Props) {
  function confirmRemove() {
    Alert.alert('Remove item', `Remove "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onRemove(item.id) },
    ]);
  }

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.placeholder]}>
            <Text style={{ color: '#777', fontSize: 12 }}>No photo</Text>
          </View>
        )}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>
            {item.name} {item.available ? '' : '(Not available)'}
          </Text>
          <Text style={styles.course}>Course: {item.course}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={() => onEdit(item.id)}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.delete]} onPress={confirmRemove}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, margin: 8, backgroundColor: 'white' },
  thumbnail: { width: 70, height: 70, borderRadius: 6, backgroundColor: '#f0f0f0' },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  title: { fontWeight: '700' },
  course: { fontSize: 12, color: '#666', marginTop: 4 },
  desc: { color: '#555', marginTop: 6 },
  price: { marginTop: 6, fontWeight: '600' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  btn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#0275d8', borderRadius: 6, marginLeft: 8 },
  delete: { backgroundColor: '#d9534f' },
  btnText: { color: 'white' },
});