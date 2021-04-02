import React from 'react';
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
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins , sans-serif',
    h5: {
      color: '#616161'
    },
    h4: {
      color: '#616161'
    }
  },
  palette: {
    primary: {
      main: '#2e7d32',
      contrastText: '#fff',
    },
  },
});
const App = () => {
  return (
    <div style={{ marginTop: 100 }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ContextProvider>
          <Router>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/orders">
                <Orders />
              </PrivateRoute>
              <PrivateRoute path="/checkout">
                <Checkout />
              </PrivateRoute>
              <PrivateRoute path="/addProduct">
                <AddProduct />
              </PrivateRoute>
              <PrivateRoute path="/manageProduct">
                <ManageProduct />
              </PrivateRoute>
            </Switch>
          </Router>
        </ContextProvider>
      </ThemeProvider>
    </div>
  );
};
export default App;
