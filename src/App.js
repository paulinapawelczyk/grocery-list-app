import React, { useState } from 'react';
import List from './Components/List';
import Alert from './Components/Alert';

import './App.css';

function App() {
  const [grocery, setGrocery] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: true,
    message: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!grocery) {
      showAlert(true, 'Please add prober value', 'danger');
    } else if (grocery && isEditing) {
      console.log('edit');
    } else {
      console.log('adding to the list item and alert that item were added');
      const newGroceryItem = {
        id: new Date().getTime().toString(),
        title: grocery,
      };
      setList([...list, newGroceryItem]);
      setGrocery('');
    }
  };

  const showAlert = (show = false, message = '', type = '') => {
    setAlert({
      show: show,
      message: message,
      type: type,
    });
  };

  return (
    <div className="app-container">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} hideAlert={showAlert} />}
        <h3>Grocery List</h3>
        <div className="input-form-grocery">
          <input
            type="text"
            className="input-grocery"
            placeholder="e.g. milk"
            value={grocery}
            onChange={(e) => setGrocery(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Add to list'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-list-container">
          <List items={list} />
          <button className="clear-btn">Clear items</button>
        </div>
      )}
    </div>
  );
}

export default App;
