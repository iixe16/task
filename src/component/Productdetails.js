//product detelis
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
export default function Productdetails() {
   const {productId }=useParams();
   const [product ,setProduct]= useState([]);
   const [loading ,setLoading]= useState(false);

   useEffect(() =>{
   const getProduct =async () =>{
    setLoading (true);
    const response = await fetch(`http://localhost:5000/products/${productId}`);
    setProduct(await response.json());
    setLoading(false);
   }
    getProduct();

  }, [productId]);
    const Loading = () =>{
      return(
        <>
          Loading.....
        </>
      )
    }
    const ShowProduct =() =>{
      return(
        <>
         <div className='col-md-6'>
          <img src={product.image_url} alt={product.name} height="400px" width="400px"/>

         </div>
         <div className='col-md-6'>
          <h4 className='display-6 fw-bold my-4'>
            {product.name}
          </h4>

<h3 className='display-5 fw my-4'>{product.price}{product.currency}</h3>
<p className='lead'>
  {product.description}
</p>
<p className='lead'>
stoke is:  {product.stock}
</p>
<button className='btn btn-outline-dark'> add to cart</button>

         </div>
        </>
      )
    }
  return (
    <div>
      <div className='container' id="products">
        <div className='row'>
          {loading ? <Loading/> :<ShowProduct/> }
        </div>
      </div>
    </div>
  );
}
