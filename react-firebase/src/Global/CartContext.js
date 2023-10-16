import React, { createContext, useReducer, useEffect, useState } from 'react';
import { CartReducer } from './CartReducer';
import { db , auth } from '../Config/Config';

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const user = auth.currentUser;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      const cartRef = db.collection("SignedUpUsersData").doc(user.uid).collection('cart');
      cartRef.get().then((querySnapshot) => {
        const newCartItems = [];
        querySnapshot.forEach((doc) => {
          newCartItems.push(doc.data());
        });
        setCartItems(newCartItems);
      }).catch((error) => {
        console.error('Error getting cart items:', error);
      });
    }
  },[user]);

  const initialState = { shoppingCart: cartItems, totalPrice: 0, totalQty: 0 };
  const [cart, dispatch] = useReducer(CartReducer, initialState);

  return (
    <CartContext.Provider value={{ ...cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
