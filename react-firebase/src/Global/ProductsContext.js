import React, { createContext, useEffect, useState } from 'react';
import { db } from '../Config/Config';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const prevProducts = [...products];
    const unsubscribe = db.collection('Products').onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === 'added') {
          prevProducts.push({
            ProductID: change.doc.id,
            ProductName: change.doc.data().ProductName,
            ProductPrice: change.doc.data().ProductPrice,
            ProductImg: change.doc.data().ProductImg,
          });
        }
        setProducts(prevProducts);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
