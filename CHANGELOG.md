```text
CHANGELOG — Christoffel's Menu

This changelog documents how the project meets Part 2 and Part 3 requirements.

Part 2 (initial expected submission)
- Required: Home screen displays menu, total item count, and ability to add items.
- Implementation notes:
  - AddItemScreen allows adding dish name, description, course and price. After adding, items are visible on Home.
  - Home shows total items and lists items (SectionList by course).
  - No permanent storage required (in-memory array via Context).

Part 3 / Final PoE (what was added and refactored)
- Moved Add form to a separate AddItem screen (AddItemScreen) — final requirement.
- Implemented EditItemScreen with:
  - Change Photo (uses expo-image-picker) — optional demo for the photo field.
  - Dish Name, Category (Course), Price, Description, Availability (Switch).
  - Cancel and Update buttons.
- Added updateItem function in MenuContext to edit items.
- Menu items saved and shared via MenuContext (an in-memory array).
- Remove functionality implemented (Delete button with confirmation) on each menu card.
- FilterScreen created for guests to choose a course and see filtered results.
- Home shows average price per course in each section header (using totalsAndAverages util).
- Refactoring:
  - Split code into multiple files: context, screens, components, utils, types.
  - Created MenuItemRow component to match wireframe card layout and Edit/Delete action buttons.
- Learning outcomes mapping:
  - Data types & variables: src/types.ts and typed components (TypeScript).
  - Input and output: TextInput and SectionList display.
  - Conditional structures: form validation uses if statements; conditional rendering for "No items".
  - Iterative statements: src/utils/calculations.ts includes for/while/for-in examples (demonstrate usage).
  - Functions: addItem, updateItem, removeItem, averagePriceByCourse and utility functions encapsulate logic.
- Notes for recording:
  - Part 2 video: show adding items (Add form either on Home or on separate screen depending on your instructor requirement). Show total count updating.
  - Final PoE video: show use of AddItem screen, EditItem screen (change a photo and availability), Delete item, and Filter screen. Show averages updating after changes.

If you'd like a Part 2 variant where the Add form is on the Home page (and step-by-step git commands to refactor into separate Add screen for Part 3), I can provide that as a short sequence of code diffs and sample commit messages.
```