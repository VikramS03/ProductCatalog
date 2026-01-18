import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
    const imageUrl = product.imageUrl
        ? `http://localhost:8080${product.imageUrl}`
        : 'https://via.placeholder.com/300x200?text=No+Image';

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={imageUrl}
                className="card-img-top product-image"
                alt={product.name}
            />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    {product.description}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0">₹{product.price}</span>
                    <span className={`badge ${product.status ? 'bg-success' : 'bg-danger'}`}>
                        {product.status ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
                <div className="mt-3">
                    <small className="text-muted d-block mb-2">Stock: {product.stock}</small>
                    <div className="btn-group w-100">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => onEdit(product)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onDelete(product.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
