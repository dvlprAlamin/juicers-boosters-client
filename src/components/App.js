import React, { useEffect, useState } from 'react';
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
import { GetContext } from '../context';
import Checkout from './Checkout';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import NotFound from './NotFound';
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
  const { loggedInUser } = GetContext();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    axios.post('http://localhost:4000/admin', { email: loggedInUser?.email })
      .then(res => {
        setIsAdmin(res.data)
      })
  }, [loggedInUser])

  return (
    <div style={{ marginTop: 100 }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navigation isAdmin={isAdmin} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Login} />
            <PrivateRoute path="/orders">
              <Orders />
            </PrivateRoute>
            <PrivateRoute path="/checkout">
              <Checkout />
            </PrivateRoute>
            <PrivateRoute path="/addProduct">
              {isAdmin ? <AddProduct /> : <NotFound />}
            </PrivateRoute>
            <PrivateRoute path="/manageProduct">
              {isAdmin ? <ManageProduct /> : <NotFound />}
            </PrivateRoute>
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};
export default App;
