import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


 function  AddProduct() {

  var newId;
   fetch("http://localhost:5000/products").then(response => response.json())
  .then(data => {
     newId = data.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
  });
  const { productId } = useParams(); // Get the product ID from URL parameters
  const navigate = useNavigate(); 

  
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCurrency, setProductCurrency] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productStock, setProductStock] = useState('');


  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:5000/products/${productId}`)
        .then(response => response.json())
        .then(data => {
          // Assuming your product attributes match your state
          setProductName(data.name);
          setProductDescription(data.description);
          setProductPrice(data.price);
          setProductCurrency(data.currency);
          setProductImageUrl(data.image_url);
          setProductStock(data.stock);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [productId]); // Fetch product data if editing

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      id: productId??`${newId}`,
      name: productName,
      description: productDescription,
      price: Number(productPrice),
      currency: productCurrency,
      image_url: productImageUrl,
      stock: Number(productStock)
    };

    const fetchOptions = {
      method: productId ? 'PUT' : 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    };

    const url = productId ? `http://localhost:5000/products/${productId}` : 'http://localhost:5000/products';

    fetch(url, fetchOptions)
      .then(response => response.json())
      .then(() => navigate('/products')) // Navigate to home or list view after submit
      .catch((error) => console.error('Error:', error));
    
   
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductCurrency('');
    setProductImageUrl('');
    setProductStock('');
  };


  return (
    <div className="container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <input
            type="text"
            className="form-control"
            id="currency"
            value={productCurrency}
            onChange={(e) => setProductCurrency(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Product Image URL</label>
          <input
            type="text"
            className="form-control"
            id="productImage"
            value={productImageUrl}
            onChange={(e) => setProductImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="text"
            className="form-control"
            id="stock"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
          />
        </div>
        <div className='mt-2'>
        <button type="submit" className="btn btn-primary">{productId ? 'Save Changes' : 'Add Product'}</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
