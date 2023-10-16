import React, { useState } from 'react';
import { db } from '../firebase-config';

const EditForm = ({ editableProduct, onClose }) => {
  const [editedProduct, setEditedProduct] = useState(editableProduct);

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('Products').doc(editableProduct.id).update({
        ProductName: editedProduct.ProductName,
        ProductPrice: editedProduct.ProductPrice,
      });
      onClose();
    } catch (error) {
      console.error('Error editing product: ', error);
    }
  };

  return (
    <div className="edit-popup">
      <div className="edit-popup-content">
      <div style={{display:"flex" , textAlign:"end" , alignItems:"flex-end" , justifyContent:"flex-end"}}><button onClick={onClose} style={{backgroundColor:"red" , padding:"3px",width:"25px", borderRadius:"50%",margin:"-10px"}}>X</button></div>
        <h2>Edit Product</h2>
        <form onSubmit={handleEditFormSubmit} style={{ margin: '23px' }}>
          <input
            type="text"
            placeholder="Product Name"
            value={editedProduct.ProductName}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                ProductName: e.target.value,
              })
            }
            style={{ width: '320px' }}
          />
          <div style={{ margin: '32px' }}></div>
          <input
            type="text"
            placeholder="Product Price"
            value={editedProduct.ProductPrice}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                ProductPrice: e.target.value,
              })
            }
            style={{ width: '320px' }}
          />
          <div style={{ margin: '32px' }}></div>
          <button type="submit">Save</button>
        </form>
        
      </div>
    </div>
  );
};

export default EditForm;
