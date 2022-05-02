import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Button from 'react-bootstrap/Button';

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
        <div className="price">GH₵{product.price}</div>
        <Link to={`/product/${product._id}`}>
          <div className="card-btn">
            <button>Add to Cart</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
