import React, { useState } from 'react'
import { storage, db } from '../firebase-config'

export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');
    const [fileInputValue , setFileInputValue] = useState('');

    const types = ['image/png', 'image/jpeg'];

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0);
                        setProductImg(null);
                        setError('');
                        setFileInputValue('');
                    }).catch(err => setError(err.message))
                })
            })
    }

    return (
        <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label htmlFor="product-img" className="file-label">
                    Product Image</label>
                    <div></div>
                    <input
                        type="file"
                        id="product-img"
                        accept="image/*"
                        className="file-input"
                        value={fileInputValue}
                        onChange={productImgHandler}
                        required
                    />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    )
}