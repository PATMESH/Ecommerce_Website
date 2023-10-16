import React, { useContext } from 'react';
import logo from '../images/ecommerce.jpg';
import banner from '../images/Banner.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Config/Config';
import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { CartContext } from '../Global/CartContext';

export const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const { totalQty } = useContext(CartContext);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  return (
    <div className="navbox">
      <div className="leftside">
        <div className='logo'><img src={logo} alt=""  /></div>
        <div className='banner'><img src={banner} alt="" /></div>
      </div>
      {!user ? (
        <div className="rightside">
          <span>
            <Link to="signup" className="navlink">
              SIGN UP
            </Link>
          </span>
          <span>
            <Link to="login" className="navlink">
              LOGIN
            </Link>
          </span>
        </div>
      ) : (
        <div className="rightside">
        <span className='name-dis'>
            <Link to="/" className="navlink">
                {user.Name}
            </Link>
        </span>

          <span>
            <Link to="/cartproducts" className="navlink">
              <Icon icon={cart} />
            </Link>
          </span>
          <span className="no-of-products">{totalQty}</span>
          <span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </span>
        </div>
      )}
    </div>
  );
};
