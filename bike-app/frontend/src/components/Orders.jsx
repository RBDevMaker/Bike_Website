import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
            const response = await axios.get(`${apiEndpoint}/orders`);

            // Parse the response body if it's a string
            let data = response.data;
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

            // Sort orders by date (newest first)
            const sortedOrders = Array.isArray(data)
                ? data.sort((a, b) => new Date(b.order_date_time) - new Date(a.order_date_time))
                : [];

            setOrders(sortedOrders);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders. Please try again later.");
            setLoading(false);
        }
    };

    const fetchOrderDetails = async (orderId) => {
        try {
            setDetailsLoading(true);
            setError(null);
            const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
            const response = await axios.get(`${apiEndpoint}/orders/${orderId}`);

            // Parse the response body if it's a string
            let data = response.data;
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

            setSelectedOrder(data);
            setDetailsLoading(false);
        } catch (err) {
            console.error("Error fetching order details:", err);
            setError("Failed to load order details. Please try again.");
            setDetailsLoading(false);
        }
    };

    return (
        <div className="orders" id="orders-link">
            <h2>Order History</h2>

            {error && (
                <div className="error-message" style={{
                    padding: '10px',
                    backgroundColor: '#fee',
                    border: '1px solid #fcc',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    color: '#c00'
                }}>
                    {error}
                    <button
                        onClick={fetchOrders}
                        style={{ marginLeft: '10px', cursor: 'pointer' }}
                    >
                        Retry
                    </button>
                </div>
            )}

            {loading ? (
                <div className="loading-message">
                    <p>Loading orders...</p>
                </div>
            ) : (
                <div className="orders-container">
                    <div className="orders-list">
                        <h3>Your Orders ({orders.length})</h3>
                        {orders.length === 0 ? (
                            <p>No orders found. Start shopping to create your first order!</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {orders.map((order) => (
                                    <li
                                        key={order.id}
                                        style={{
                                            padding: '15px',
                                            marginBottom: '10px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            backgroundColor: selectedOrder?.id === order.id ? '#f0f0f0' : '#fff'
                                        }}
                                    >
                                        <div className="order-summary">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <strong style={{ fontSize: '1.1em' }}>Order #{order.id}</strong>
                                                <span style={{ color: '#666' }}>${parseFloat(order.total_amount).toFixed(2)}</span>
                                            </div>
                                            <p style={{ margin: '5px 0', color: '#666' }}>
                                                {new Date(order.order_date_time).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#888' }}>
                                                {order.order_items?.length || 0} item(s)
                                            </p>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    fetchOrderDetails(order.id);
                                                }}
                                                style={{
                                                    color: '#1952b6',
                                                    textDecoration: 'none',
                                                    fontSize: '0.9em',
                                                    fontWeight: 'bold'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                            >
                                                View Details →
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {detailsLoading && (
                        <div className="order-details" style={{ padding: '20px' }}>
                            <p>Loading order details...</p>
                        </div>
                    )}

                    {selectedOrder && !detailsLoading && (
                        <div className="order-details" style={{
                            padding: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            backgroundColor: '#fff'
                        }}>
                            {/* Order Confirmation Banner */}
                            <div style={{
                                backgroundColor: '#d4edda',
                                border: '1px solid #c3e6cb',
                                borderRadius: '4px',
                                padding: '15px',
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <span style={{ fontSize: '1.5em', color: '#155724' }}>✓</span>
                                <div>
                                    <strong style={{ color: '#155724', display: 'block' }}>Order Confirmed</strong>
                                    <span style={{ color: '#155724', fontSize: '0.9em' }}>
                                        Your order has been successfully placed and confirmed.
                                    </span>
                                </div>
                            </div>

                            {/* Order Summary Heading */}
                            <h3 style={{
                                textAlign: 'center',
                                margin: '0 0 20px 0',
                                fontSize: '1.5em',
                                color: '#333'
                            }}>
                                Order Summary
                            </h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h4 style={{ margin: 0 }}>Order #{selectedOrder.id}</h4>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    style={{
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        backgroundColor: '#f0f0f0',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Close
                                </button>
                            </div>

                            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Order Date:</strong> {new Date(selectedOrder.order_date_time).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                                <p style={{ margin: '5px 0', fontSize: '1.2em' }}>
                                    <strong>Total:</strong> ${parseFloat(selectedOrder.total_amount).toFixed(2)}
                                </p>
                            </div>

                            <h4>Order Items:</h4>
                            {selectedOrder.order_items && selectedOrder.order_items.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {selectedOrder.order_items.map((item, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                padding: '15px',
                                                marginBottom: '10px',
                                                border: '1px solid #eee',
                                                borderRadius: '4px',
                                                backgroundColor: '#fafafa'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', textTransform: 'capitalize' }}>
                                                        {item.product_name}
                                                    </p>
                                                    <p style={{ margin: '0', color: '#666', fontSize: '0.9em' }}>
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <p style={{ margin: '0', fontWeight: 'bold' }}>
                                                        ${parseFloat(item.amount).toFixed(2)}
                                                    </p>
                                                    <p style={{ margin: '0', color: '#666', fontSize: '0.9em' }}>
                                                        ${(parseFloat(item.amount) / parseInt(item.quantity)).toFixed(2)} each
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No items in this order.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Orders;
