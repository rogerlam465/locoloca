import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyle from './components/GlobalStyles';
import LandingPage from './components/LandingPage';
import ShopLanding from './components/ShopLanding';
import CourierLanding from './components/CourierLanding';
import ShopperLanding from './components/ShopperLanding';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Router>
        <div>
          <Switch>
            <Route path="/shop">
              <ShopLanding />
            </Route>
            <Route path="/courier">
              <CourierLanding />
            </Route>
            <Route path="/shopper">
              <ShopperLanding />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;