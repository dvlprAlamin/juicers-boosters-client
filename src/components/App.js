import React from 'react';
import Admin from './Admin';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddProduct from './AddProduct';
import ManageProduct from './ManageProduct';
import Home from './Home';
import Navigation from './Navigation';
import Orders from './Orders';
import { ContextProvider } from '../context';
import Checkout from './Checkout';
const App = () => {
  return (
    <div style={{marginTop:100}}>
      <ContextProvider>
      <Router>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path='/addProduct' component={AddProduct}/>
          <Route path='/manageProduct' component={ManageProduct}/>
        </Switch>
      </Router>
      </ContextProvider>
    </div>
  );
};

export default App;
