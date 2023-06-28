import { useState } from "react";
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

function PackingList({ items, handleDelete, handleToggle, handleClearList }) {
  const [sort, setSort] = useState("input"); // Create a state for the sort value

  let sortedItems = [...items]; // Create a copy of the items array

  if (sort === "input")
    sortedItems = items; // If the sort value is "input", do nothing
  else if (sort === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  // If the sort value is "description", sort the items by description
  //LocaleCompare is a string method that compares two strings and returns a number
  //slice() is used to create a copy of the array, so we don't mutate the original one
  //sort() is used to sort the array
  else if (sort === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);

  // If the sort value is "packed", sort the items by packed status

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear List</button>
      </div>
      {/* 
        Create a select element with three options
        When the value of the select changes, update the sort state
       */}
    </div>
  ); // Map over the items and create an Item component for each one
}

function Item({ item, handleDelete, handleToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>{" "}
      {/* If the item is packed, add a line-through style */}
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <p className="stats">
          <em>Start adding some items to your 📃 ... </em>
        </p>
      </footer>
    );

  const numItems = items.length; // Get the number of items in the list
  const numPacked = items.filter((item) => item.packed).length; // Get the number of items that are packed
  const percentage = Math.round((numPacked / numItems) * 100); // Calculate the percentage of items that are packed

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You packed everything! Ready to go ✈"
          : `📃 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
export default App;
