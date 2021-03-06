import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyle from './components/GlobalStyles';
import Header from './components/Header';

// shop components

import ShopLanding from './components/ShopLanding';
import ShopCreate from './components/shop/ShopCreate';

import CourierLanding from './components/CourierLanding';
import ShopperLanding from './components/ShopperLanding';
import Cart from './components/buyer/Cart';
import Checkout from './components/buyer/Checkout';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Router>
        <Header />
        <div>
          <Switch>
            {/* Top level routes */}

            <Route path="/courier">
              <CourierLanding />
            </Route>
            <Route path="/login">
              <Login />
            </Route>

            {/* Shop related routes */}

            <Route path="/shop/create">
              <ShopCreate />
            </Route>

            <Route path="/shop/">
              <ShopLanding />
            </Route>

            <Route path="/cart/">
              <Cart />
            </Route>

            <Route path="/checkout">
              <Checkout />
            </Route>

            <Route path="/courier">
              <CourierLanding />
            </Route>

            <Route path="/createaccount">
              <CreateAccount />
            </Route>

            {/* home route */}
            <Route exact path="/">
              <ShopperLanding />
            </Route>


          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;