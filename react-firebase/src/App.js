import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cart } from './components/Cart';
import { auth, db } from './Config/Config';
import { Home } from './components/home';
import { Signup } from './components/signup';
import { CartContextProvider } from './Global/CartContext';
import ProductsContextProvider from './Global/ProductsContext';
import { Login } from './components/login';
import { NotFound } from './components/NotFound';
import { AddProducts } from './components/AddProducts';
import { Cashout } from './components/cashout';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection('SignedUpUsersData')
          .doc(authUser.uid)
          .get()
          .then((snapshot) => {
            setUser(snapshot.data());
          });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ProductsContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cartproducts" element={<Cart user={user} />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/cashout" element={<Cashout user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
