export default function Stats({ items }) {
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
