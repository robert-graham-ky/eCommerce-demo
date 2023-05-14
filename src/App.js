import React, { useState, useEffect } from 'react';
import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import CartDropdown from "./cart/CartDropdown";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import { configureStore } from "redux";
import { cartReducer } from "./cart/CartStore";
import SignUp from "./signup/SignUp";
import store from "./cart/CartStore";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <Provider store={store}>
      <Template>
        <Switch>
          <Route path="/products" exact>
            <ProductList products={products}/>
          </Route>
          <Route path="/products/:slug">
            <ProductDetail />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/" exact>
            <Landing products={products}/>
          </Route>
        </Switch>
      </Template>
    </Provider>
  );
}

export default App;
