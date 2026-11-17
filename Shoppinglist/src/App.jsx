import { useState } from 'react';
import './App.css';

export default function App() {
  return (
    <main className="app-shell">
      <section className="shopping-card" aria-labelledby="page-title">
        <p className="eyebrow">Plan your next shop</p>
        <h1 id="page-title">My Shopping List</h1>
        <p className="intro">Keep track of everything you need to pick up.</p>
        <ShoppingList />
      </section>
    </main>
  );
}

function ShoppingList() {
const [text, setText] = useState('');
const [items, setItems] = useState([]);

const handleAddItem = () => {
  if (text.trim() !== '') {
    setItems([...items, text]);
    setText('');
  }
}
return (
  <div className="shopping-list">
          <label className="field-label" htmlFor="nameInput">Items to buy</label>
          <div className="input-row">
          <input
            id="nameInput"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Fresh strawberries"
          />
          <button type="button" onClick={handleAddItem}>Add item</button>
          </div>
          <ul className="item-list">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
  </div>
)
}