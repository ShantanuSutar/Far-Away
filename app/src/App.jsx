import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState([...initialItems]); // Set the initial state to the initialItems array

  function handleAdd(newItem) {
    setItems((initialItems) => [...initialItems, newItem]);
  } // Add a new item to the list

  return (
    <div className="app">
      <Logo />
      <Form handleAdd={handleAdd} /> {/* Pass the handleAdd function */}
      <PackingList items={items} />
      {/* Pass the items to the PackingList component */}
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ handleAdd }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault(); // stop from reloading the page

    if (!description) return; // If no description provided, return

    const newItem = { description, quantity, packed: false, id: Date.now() };

    handleAdd(newItem);
    setDescription(""); // Reset the description to empty
    setQuantity(1); // Reset the quantity to 1
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need 😎 from your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1} key={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      {
        // Array.from creates an array of 20 elements, and then we map over it to create the options
      }
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>📃 You have x items on your list, and you already packed X (X%) </em>
    </footer>
  );
}
export default App;
