import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext';
import { CartContext } from '../Global/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer , toast } from 'react-toastify';
import { auth , db } from '../Config/Config';

export const Products = () => {
    
    const { products } = useContext(ProductsContext);

    const addToCart = ({ id, product }) => {
        const user = auth.currentUser;
    
        if (user) {
          const cartRef = db.collection('SignedUpUsersData').doc(user.uid).collection('cart');
          product.qty = 1;
          product.TotalProductPrice = product.ProductPrice;
          cartRef.add(product)
            .then(() => {
              toast.success('Product added to cart', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
            })
            .catch((error) => {
              console.error('Error adding product to cart:', error);
              toast.error('Failed to add product to cart', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
            });
        }
      };

    return (
        <>
            {products.length !== 0 && <h1>Products</h1>}
            <div className='products-container'>
                {products.length === 0 && <div style={{marginTop:"20%" , fontSize:"25px"}}> <FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" style={{color: "darkblue"}} /> </div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName} 
                        </div>
                        <div className='product-price'>
                            Rs {product.ProductPrice}.00
                    </div>
                        <div className="btn"><button className='addcart-btn' onClick={() => addToCart({ id: product.ProductID, product })}>ADD TO CART</button></div>
                    </div>
                ))}
            </div>
            <ToastContainer/>
        </>
    )
}
