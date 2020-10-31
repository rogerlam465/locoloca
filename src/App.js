import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyle from './components/GlobalStyles';
import Header from './components/Header';
import ShopLanding from './components/ShopLanding';
import CourierLanding from './components/CourierLanding';
import ShopperLanding from './components/ShopperLanding';
import Login from './components/Login';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Router>
        <Header />
        <div>
          <Switch>
            {/* Top level routes */}
            <Route path="/shop/">
              <ShopLanding />
            </Route>
            <Route path="/courier">
              <CourierLanding />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
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