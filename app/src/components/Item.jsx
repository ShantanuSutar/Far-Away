export default function Item({ item, handleDelete, handleToggle }) {
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
