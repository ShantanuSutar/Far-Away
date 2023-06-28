import React, { useState } from "react";
import Item from "./Item";
export default function PackingList({
  items,
  handleDelete,
  handleToggle,
  handleClearList,
}) {
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
