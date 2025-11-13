import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, Course } from '../types';
import { averagePriceByCourse as avgFn } from '../utils/calculations';

type MenuContextType = {
  menuItems: MenuItem[];
  addItem: (item: MenuItem) => void;
  updateItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  averagePriceByCourse: (course: Course) => number;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = (): MenuContextType => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
};

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // sample initial data (optional)
    {
      id: '1',
      name: 'Spaghetti Bolognese',
      description: 'Classic Italian pasta with meat',
      course: 'Main',
      price: 120,
      available: true,
    },
    {
      id: '2',
      name: 'Caesar Salad',
      description: 'Fresh lettuce with Caesar dressing',
      course: 'Starter',
      price: 60,
      available: true,
    },
    {
      id: '3',
      name: 'Chocolate Cake',
      description: 'Rich chocolate dessert',
      course: 'Dessert',
      price: 45,
      available: false,
    },
  ]);

  function addItem(item: MenuItem) {
    setMenuItems(prev => [...prev, item]);
  }

  function updateItem(item: MenuItem) {
    setMenuItems(prev => prev.map(i => (i.id === item.id ? item : i)));
  }

  function removeItem(id: string) {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  }

  function clearAll() {
    setMenuItems([]);
  }

  function averagePriceByCourse(course: Course) {
    return avgFn(menuItems, course);
  }

  return (
    <MenuContext.Provider value={{ menuItems, addItem, updateItem, removeItem, clearAll, averagePriceByCourse }}>
      {children}
    </MenuContext.Provider>
  );
}