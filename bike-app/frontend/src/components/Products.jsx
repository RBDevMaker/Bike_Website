import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
                console.log("API Endpoint:", apiEndpoint);
                console.log("Fetching from:", `${apiEndpoint}/products`);

                const response = await axios.get(`${apiEndpoint}/products`);
                console.log("Raw response:", response);

                // API Gateway returns the data directly, not wrapped in body
                const data = Array.isArray(response.data) ? response.data : JSON.parse(response.data.body || response.data);
                console.log("Parsed products:", data);
                console.log("Number of products:", data.length);

                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                console.error("Error details:", err.response?.data);
                setError(`Failed to load products: ${err.message}`);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="products" id="products-link">
                <h2>Products</h2>
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products" id="products-link">
                <h2>Products</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="products" id="products-link">
            <h2>Products</h2>
            {products.length === 0 && <p>No products to display</p>}
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img
                            src={product.image || '/placeholder.jpg'}
                            alt={product.name}
                            onError={(e) => {
                                console.error("Image failed to load:", product.image);
                                e.target.src = '/placeholder.jpg';
                            }}
                        />
                        <p>{product.name} ${product.price}</p>
                        {product.description && <p className="description">{product.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
