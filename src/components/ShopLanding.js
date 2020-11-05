import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// shop imports
import MenuBar from './shop/MenuBar';
import ShopItemGrid from './shop/ShopItemGrid';
import EditItem from './shop/EditItem';
import EditShop from './shop/EditShop';

// main page should just have all the items for sale for the first 
// shop plus, like, somewhere to add a new item

// it would also be fun to have a secondary menu interface or something
// something to show profits and such

// need to show the number of outstanding orders, so we need an order center

// gonna need a schema for orders, too, oh my aching head

const ShopLanding = () => {
  const history = useHistory();
  const userData = useSelector((state) => state.user.userData);

  // ok. so here if there's no shop, it should present a big splash screen
  // to create a new shop

  // if there is a shop, we need to fetch the shop data and go full into
  // shop management

  if (!userData) {
    history.push("/");
  }

  if (!userData.shop) {
    return (
      <ShopWrapper>
        <PitchWrapper>
          <h1>Looks like you aren't selling yet! You wanna?</h1>
          <p>Turn your hobbies into dollars - get started today!</p>
          <Link to="/shop/create">
            <button>I'm in!</button>
          </Link>
        </PitchWrapper>
      </ShopWrapper>
    )
  } else {
    return (
      <Wrapper>
        <Router>

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
  }


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

const ShopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PitchWrapper = styled.div`
  padding: 30px;
  border-radius: 15px;
  border: 1px solid black;
  width: 60%;
  margin: 30px;
`;