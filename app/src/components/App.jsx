import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

function App() {
  const [items, setItems] = useState([...initialItems]); // Set the initial state to the initialItems array

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  } //  filter out the item with the id passed as an argument || Delete an item from the list

  function handleAdd(newItem) {
    setItems((initialItems) => [...initialItems, newItem]);
  } // Add a new item to the list

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) return { ...item, packed: !item.packed };
        return item;
      })
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    ); // Ask the user to confirm

    if (!confirmed) return; // If the user cancels, return
    setItems([]); // Clear the list
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAdd={handleAdd} /> {/* Pass the handleAdd function */}
      <PackingList
        items={items}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        handleClearList={handleClearList}
      />
      {/* Pass the items to the PackingList component */}
      <Stats items={items} />
    </div>
  );
}

export default App;
