import React from 'react';
import ViewProducts from './ViewProducts';

export default function Home() {
    return (
        <div className="hero">
            <div className="card text-bg-dark text- white border-0">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxcV2_pcsa_K5aYcVlErZkgzCc3OcC3E1Dyg&s" class="card-img" alt="background" height="550px" />
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                <div className="container">
                    <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON ARRIVALS</h5>
                    <p className="card-text">CHECK OUT ALL THE TRENDS</p>
                    </div>
                </div>
            </div>
         <ViewProducts/>
        </div>
    );
}
