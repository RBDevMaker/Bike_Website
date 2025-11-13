// src/components/Products.jsx
import React from "react";

// Product images
import brakeImage from '../assets/images/cassette.jpeg';
import crankImage from '../assets/images/crank-arm.jpeg';
import chainImage from '../assets/images/chain.jpeg';
import cassetteImage from '../assets/images/cassette.jpeg';
import crankImage from '../assets/images/crank-arm.jpeg';
import chainImage from '../assets/images/chain.jpeg';
import cassetteImage from '../assets/images/cassette.jpeg';
import crankImage from '../assets/images/crank-arm.jpeg';
import chainImage from '../assets/images/chain.jpeg';
import sportsImage from '../assets/images/sports-glasses.jpeg';

const products = [
    { img: cassetteImage, name: "Cassette", price: "$50.00" },
    { img: crankImage, name: "Crankset", price: "$215.00" },
    { img: chainImage, name: "Chain", price: "$35.00" },
    { img: Sports, name: "Sports", price: "$40.00" },
];

const Products = () => {
    return (
        <div className="products" id="products-link">
            <h2>Our Products</h2>
            <div className="products-grid">
                {products.map((product, index) => (
                    <div key={index} className="product-card">
                        <img src={product.img} alt={product.name} />
                        <p>{product.name} {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;


// src/components/Products.jsx
import React from "react";

// Automatically import all images from the folder
const images = import.meta.glob('../assets/images/*.{jpg,jpeg,png,svg}', { eager: true, as: 'url' });

// Map filenames to a cleaner product name
const Products = Object.entries(images).map(([path, url]) => {
    // Extract filename from path
    const filename = path.split('/').pop(); // e.g., "Assistant.jpg"

    // Remove file extension and replace underscores or dashes with spaces
    const name = filename
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    return {
        img: url,
        name,
        price: "$30.00" // default price, you can customize per product
    };
});

const Products = () => {
    return (
        <div className="products" id="products-link">
            <h2>Our Products</h2>
            <div className="products-grid">
                {products.map((product, index) => (
                    <div key={index} className="product-card">
                        <img src={product.img} alt={product.name} />
                        <p>{product.name} {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
