import { MenuItem, Course, COURSES } from '../types';

/*
 Utility functions used by screens.
 Includes examples of for, while, and for-in loops (Part of final PoE learning outcomes).
*/

export function groupByCourse(items: MenuItem[]) {
  const groups: Record<string, MenuItem[]> = {};
  // Initialize groups for all predefined courses
  for (const c of COURSES) {
    groups[c] = [];
  }
  // for loop example (iterate array by index)
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!groups[item.course]) groups[item.course] = [];
    groups[item.course].push(item);
  }
  return groups;
}

export function averagePriceByCourse(items: MenuItem[], course: Course): number {
  const filtered = items.filter(i => i.course === course);
  if (filtered.length === 0) return 0;
  const total = filtered.reduce((s, it) => s + it.price, 0);
  return total / filtered.length;
}

export function totalsAndAverages(items: MenuItem[]) {
  const groups = groupByCourse(items);
  const result: Record<string, { total: number; average: number; count: number }> = {};
  // while loop example
  const courseKeys = Object.keys(groups);
  let idx = 0;
  while (idx < courseKeys.length) {
    const key = courseKeys[idx];
    const arr = groups[key];
    const count = arr.length;
    const total = arr.reduce((s, it) => s + it.price, 0);
    const average = count === 0 ? 0 : total / count;
    result[key] = { total, average, count };
    idx++;
  }
  // for-in example (iterate over result keys)
  for (const k in result) {
    if (Object.prototype.hasOwnProperty.call(result, k)) {
      // can log or use values; kept minimal for clarity
      // console.log(k, result[k]);
    }
  }
  return result;
}