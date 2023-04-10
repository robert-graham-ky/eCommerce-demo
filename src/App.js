import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import CartDropdown from "./cart/CartDropdown";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import { configureStore } from "redux";
import { cartReducer } from "./cart/CartStore";
import store from "./cart/CartStore";

function App() {
  return (
    <Provider store={store}>
      <Template>
        <Switch>
          <Route path="/products" exact>
            <ProductList />
          </Route>
          <Route path="/products/:slug">
            <ProductDetail />
          </Route>
          <Route path="/" exact>
            <Landing />
          </Route>
        </Switch>
      </Template>
    </Provider>
  );
}

export default App;
