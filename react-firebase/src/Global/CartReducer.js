import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db , auth } from '../Config/Config';

export const CartReducer = (state, action) => {
    const { shoppingCart, totalPrice, totalQty } = state;

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    switch (action.type) {
        case 'ADD_TO_CART':
            const check = shoppingCart.find(product => product.ProductID === action.id);
            if (check) {
                toast.info('This product is already in your cart', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                return state;
            } else {
                product = action.product;
                product.qty = 1;
                product.TotalProductPrice = product.ProductPrice * product.qty;
                updatedQty = totalQty + 1;
                updatedPrice = parseInt(totalPrice) + parseInt(product.ProductPrice);
                const user =  auth.currentUser;
                const cartRef = db.collection('SignedUpUsersData').doc(user.uid).collection('cart');
                cartRef.add(product)
                .then((docRef) => {
                    console.log('Added product to cart with ID: ', docRef.id);
                })
                .catch((error) => {
                    console.error('Error adding product to cart:', error);
                });
               }
                return {
                    shoppingCart: [product, ...shoppingCart],
                    totalPrice: updatedPrice,
                    totalQty: updatedQty
                };

            case 'INC':
                product = action.cart;
                product.qty = product.qty + 0.5; 
                product.TotalProductPrice = product.qty * product.ProductPrice;
                updatedQty = totalQty + 1;
                updatedPrice = parseInt(totalPrice) + parseInt(product.ProductPrice);
                index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                shoppingCart[index] = product;
                return {
                    shoppingCart: [...shoppingCart],
                    totalPrice: parseInt(updatedPrice),
                    totalQty: updatedQty,
                };
                

    
            case 'DEC':
                product = action.cart;
                if (product.qty > 1) {
                    product.qty = product.qty - 0.5;
                    product.TotalProductPrice = product.qty * product.ProductPrice;
                    updatedPrice = totalPrice - product.ProductPrice;
                    updatedQty = totalQty - 1;
                    index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                    shoppingCart[index] = product;
                    return {
                        shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                    }
                }
                else {
                    return state;
                }
    
            case 'DELETE':
                const filtered = shoppingCart.filter(product => product.ProductID !== action.id);
                product = action.cart;
                updatedQty = totalQty - product.qty;
                updatedPrice = totalPrice - product.qty * product.ProductPrice;
                return {
                    shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
                }
    
            case 'EMPTY':
                return {
                    shoppingCart: [], totalPrice: 0, totalQty: 0
                }
    
            default:
                return state;
    }
};
