import React from 'react';
import Product from './components/Product';
import data from './data';
import { BrowserRouter, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">eshop</a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <div>
            <div className="row center">
              {data.products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </div>
        </main>
        <footer className="row center">© 2020 REIN IT - All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
