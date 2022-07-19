import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <img className="medium" src={product.image} alt={product.name} />
      <div className="card-body">
        <h2>{product.name}</h2>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">GH₵{product.price}</div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {/* check if product.seller.seller.name throws an error, error shows up but if changed to below code,it works */}
              {product.seller.seller.name}
            </Link>
          </div>
        </div>
        <Link to={`/product/${product._id}`}>
          <div className="card-btn">
            <button>Add to Cart</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
