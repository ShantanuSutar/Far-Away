import React, { useState } from "react";
export default function Form({ handleAdd }) {
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
