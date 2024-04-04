import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function ViewProducts() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            fetch("http://localhost:5000/products")
                .then((response) => response.json())
                .then((products) => {
                    setData(products);
                    setFilter(products);
                    setLoading(false);
                });
        };

        getProducts();

        // Cleanup function to handle component unmount
        return () => {
            // componentMounted logic replaced with cleanup function
        };
    }, []);

    const Loading = () => {
        return (
            <>
                Loading....
            </>
        );
    };

    const ShowProducts = () => {
        return (
            <>
               
                <div className="row">
                    {filter.map((product) => {
                        return (
                            <div key={product.id} className="col-md-4 mb-4">
                                <div className="card h-100 text-center p-4">
                                    <img src={product.image_url} className="card-img-top" alt={product.name} height="250px" style={{objectFit: "contain"}} />
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">{product.name}</h5>
                                        <Link to={`/productdetails/${product.id}`} className="btn btn-outline-dark me-2">view details</Link>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    return (
        <div className='container my-5' id="products">
            <h1 className="text-center mb-5">Latest Products</h1>
            {loading ? <Loading /> : <ShowProducts />}
        </div>
    );
}
