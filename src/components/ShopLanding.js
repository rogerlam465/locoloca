import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// global component(s)

import Header from './Header';

// shop imports
import MenuBar from './shop/MenuBar';
import ShopItemGrid from './shop/ShopItemGrid';
import EditItem from './shop/EditItem';
import EditShop from './shop/EditShop';

// I'm thinking a list on the left of all shops (i.e. one shop plus 'open 
// new shop')
// maybe a header with a dropdown menu? Something nicely styled, anyways

// main page should just have all the items for sale for the first 
// shop plus, like, somewhere to add a new item

// it would also be fun to have a secondary menu interface or something
// something to show profits and such

// need to show the number of outstanding orders, so we need an order center

// gonna need a schema for orders, too, oh my aching head

// CreateItems is the real MVP candidate. The others would be nice to have
// but creating items is core functionality

const ShopLanding = () => {
  return (
    <Wrapper>
      <Router>
        <Header />

        <ItemWrapper>
          <MenuBar />

          <Switch>

            {/* Shop routes */}

            <Route path="/shop/edit">
              <EditShop />
            </Route>

            <Route path="/shop/">
              <ShopItemGrid />
            </Route>

            {/* Item routes */}

            <Route path="/item/edit">
              <EditItem />
            </Route>
          </Switch>

        </ItemWrapper>
      </Router>
    </Wrapper>
  )
};

export default ShopLanding;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
`;