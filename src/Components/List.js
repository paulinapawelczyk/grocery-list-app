import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div key={id} className="grocery-list-item">
            <p className="grocery-list-item-title">{title}</p>
            <div className="btn-list">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
