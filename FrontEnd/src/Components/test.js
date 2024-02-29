import React, { useState } from 'react';

const ItemUpdate = () => {
    const [itemId, setItemId] = useState(''); // Set the ID of the item to be updated
    const [updatedData, setUpdatedData] = useState({
        name: '',
        description: '',
    });

    const updateItem = async () => {
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const updatedItem = await response.json();

            // Handle the updated item, update component state, etc.
            // ...
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Item ID"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="New Name"
                value={updatedData.name}
                onChange={(e) => setUpdatedData({ ...updatedData,
                   name: e.target.value })}
            />
            <br />
            <input
                type="text"
                placeholder="New Description"
                value={updatedData.description}
                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
            />
            <br />
            <button onClick={updateItem}>Update Item</button>
        </div>
    );
};

export default ItemUpdate;
