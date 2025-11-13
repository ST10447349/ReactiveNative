```text
Christoffel's Menu — Expo + React Native (TypeScript)

This project implements Part 2 and Part 3 requirements for MAST 5111,
designed according to the provided wireframes (menu list cards, add screen,
and edit screen with photo/availability).

Features implemented
- Add dish (Dish name, Description, Course, Price)
- Edit dish (Change photo using Expo Image Picker, Category, Price, Availability)
- Delete dish with confirmation
- Home shows menu grouped by course, total items, per-course averages
- Filter screen for guests to filter by course
- Menu items stored in an in-memory array exposed through React Context
- Examples of for/while/for-in loops in utils (for Part 3 learning outcomes)

Getting started
1. Install Expo CLI if needed:
   npm install -g expo-cli

2. Create new project (if you don't already have one):
   expo init christoffel-menu
   Choose "blank (TypeScript)" template.

3. Copy files from this scaffold into your project (paths under src/).

4. Install dependencies:
   npm install @react-navigation/native @react-navigation/stack @react-native-picker/picker
   expo install react-native-screens react-native-safe-area-context
   expo install expo-image-picker

5. Run:
   npm start
   Then open on a device or emulator using Expo Go.

Notes about Part 2 and Part 3
- Part 2: you must show adding items and the Home screen showing the list and total item count. This scaffold supports that. If you want the Add form embedded on Home for Part 2, see the "Alternate Part 2 flow" notes inside CHANGELOG.md (or ask and I'll provide the single-file variant).
- Part 3: the Add form is on its own screen, removal works from Home, average price per course is displayed in the section headers, and filtering is on a separate screen.

Files of interest
- src/context/MenuContext.tsx — central storage and functions (add/remove/update)
- src/screens/AddItemScreen.tsx — "Add New Dish" screen
- src/screens/EditItemScreen.tsx — "Edit Dish" screen (image picker + availability)
- src/screens/HomeScreen.tsx — main menu list (SectionList) showing averages
- src/screens/FilterScreen.tsx — filter by course
- src/utils/calculations.ts — grouping and averages, includes for/while/for-in examples

If you want:
- I can produce a small commit history (sample git commands + messages) showing the Part 2 -> Part 3 refactor (move form to separate screen).
- A short voice-over script for your screen recording to explain features (Part 2 and final PoE).
```"# MenuApp" 
