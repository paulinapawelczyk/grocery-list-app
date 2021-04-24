import React, { useEffect, useState } from 'react';
import List from './Components/List';
import Alert from './Components/Alert';
import './App.css';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [grocery, setGrocery] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!grocery) {
      showAlert(true, 'Please add proper value', 'danger');
    } else if (grocery && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: grocery };
          }
          return item;
        }),
      );
      setGrocery('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'Item changed!', 'success');
    } else {
      showAlert(true, 'Item added', 'success');

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

  const clearListItem = () => {
    showAlert(true, 'Elements deleted', 'danger');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'Item deleted', 'danger');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editedId = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setGrocery(editedId.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <div className="app-container">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} hideAlert={showAlert} list={list} />}
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
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearListItem}>
            Clear items
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
