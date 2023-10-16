import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import EditForm from './EditForm';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editableProduct, setEditableProduct] = useState({
    id: '',
    ProductName: '',
    ProductPrice: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleEdit = (product) => {
    setEditableProduct(product);
    setIsEditPopupOpen(true);
  };


  const handleDelete = async (productId) => {
    try {
      await db.collection('Products').doc(productId).delete();
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const handleEditFormClose = () => {
    setIsEditPopupOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = await db.collection('Products').get();
        const productsData = productsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, [isEditPopupOpen]);

  return (
    <>
    <Navbar/>
    <div className="products-container">
    <div style={{justifyContent:"flex-end" , alignItems:"flex-end" , textAlign:"end"}}><button onClick={()=>navigate("/AddProducts")} style={{padding:"5px" , backgroundColor:"darkviolet"}}>Add product</button></div>
      <h1>Products</h1>
      
      {isLoading ? (<div> <FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" style={{color: "#800000",}} /> </div>):
      (<ul className="product-list">
        {products.map((product) => (
          <li className="product-card" key={product.id}>
            <img src={product.ProductImg} alt='' ></img>
            <div className="product-info">
              <div className='name'><h2>{product.ProductName}</h2></div>
              <div className='price'><p>Price: ${product.ProductPrice}</p></div>
            </div>
            <div className="product-actions">
              <button className="edit-button" onClick={() => handleEdit(product)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>)}
      {isEditPopupOpen && (
        <EditForm
          editableProduct={editableProduct}
          onClose={handleEditFormClose}
        />
      )}
    </div></>
  );
};

export default Home;
