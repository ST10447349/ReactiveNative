export type Course = 'Starter' | 'Main' | 'Dessert' | 'Side' | 'Beverage';

export const COURSES: Course[] = ['Starter', 'Main', 'Dessert', 'Side', 'Beverage'];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
  available: boolean;
  imageUri?: string;
}