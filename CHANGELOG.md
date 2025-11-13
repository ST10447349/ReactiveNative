
CHANGELOG — Christoffel's Menu

Part 2
- Required: Home screen displays menu, total item count, and ability to add items.
- Implementation notes:
  - AddItemScreen allows adding dish name, description, course and price. After adding, items are visible on Home.
  - Home shows total items and lists items 

Part 3 
- Moved Add form to a separate AddItem screen  — final requirement.
- Implemented EditItemScreen with:
  - Change Photo  
  - Dish Name, Category (Course), Price, Description, Availability (Switch).
  - Cancel and Update buttons.
- Added updateItem function in MenuContext to edit items.
- Menu items saved and shared via MenuContext (an in-memory array).
- Remove functionality implemented (Delete button with confirmation) on each menu card.
- FilterScreen created for guests to choose a course and see filtered results.
- Home shows average price per course in each section header 
  
