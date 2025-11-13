import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Course, COURSES } from '../types';
import { useMenu } from '../context/MenuContext';
import MenuItemRow from '../components/MenuItemRow';
import { Picker } from '@react-native-picker/picker';

export default function FilterScreen() {
  const { menuItems, removeItem } = useMenu();
  const [selected, setSelected] = useState<Course | 'All'>('All');

  const filtered = selected === 'All' ? menuItems : menuItems.filter(m => m.course === selected);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <Text style={{ fontWeight: '600', marginBottom: 6 }}>Select course</Text>
        <View style={styles.picker}>
          <Picker selectedValue={selected} onValueChange={(v) => setSelected(v as any)}>
            <Picker.Item label="All" value="All" />
            {COURSES.map(c => <Picker.Item key={c} label={c} value={c} />)}
          </Picker>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <MenuItemRow item={item} onEdit={() => {}} onRemove={removeItem} />}
        ListEmptyComponent={<Text style={{ padding: 20 }}>No items for this selection.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, overflow: 'hidden' },
});