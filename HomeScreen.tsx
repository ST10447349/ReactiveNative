import React from 'react';
import { View, Text, SectionList, StyleSheet, Button } from 'react-native';
import { useMenu } from '../context/MenuContext';
import MenuItemRow from '../components/MenuItemRow';
import { COURSES } from '../types';
import { totalsAndAverages } from '../utils/calculations';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation';

type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: { navigation: HomeNavProp }) {
  const { menuItems, removeItem } = useMenu();

  const groups = totalsAndAverages(menuItems);

  const sections = COURSES.map(course => ({
    title: `${course} (${groups[course]?.count ?? 0}) — Avg: R${(groups[course]?.average ?? 0).toFixed(2)}`,
    data: menuItems.filter(m => m.course === course),
  }));

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>MENU LIST</Text>
        <View style={styles.headerButtons}>
          <Button title="Add New Dish" onPress={() => navigation.navigate('AddItem')} />
          <Button title="Filter" onPress={() => navigation.navigate('Filter')} />
        </View>
      </View>

      <View style={styles.summary}>
        <Text>Total items: {menuItems.length}</Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemRow item={item} onEdit={(id) => navigation.navigate('EditItem', { id })} onRemove={removeItem} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ padding: 20 }}>No menu items yet. Add some!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 12, backgroundColor: '#f8f8f8', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700' },
  headerButtons: { flexDirection: 'row', gap: 8 },
  summary: { padding: 12 },
  sectionHeader: { backgroundColor: '#eee', padding: 8 },
  sectionHeaderText: { fontWeight: '600' },
});