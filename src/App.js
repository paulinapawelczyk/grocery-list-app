import React, { useState } from 'react';
import List from './Components/List';
import Alert from './Components/Alert';

import './App.css';

function App() {
  const [grocery, setGrocery] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hello');
  };

  return (
    <div className="app-container">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert />}
        <h3>Grocery List</h3>
        <div className="input-form-grocery">
          <input
            type="text"
            className="input-grocery"
            placeholder="e.g milk"
            value={grocery}
            onChange={(e) => setGrocery(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Add to list'}
          </button>
        </div>
      </form>
      <div className="grocery-list-container">
        <List />
        <button className="clear-btn">Clear items</button>
      </div>
    </div>
  );
}

export default App;
