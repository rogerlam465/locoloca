import React from 'react';
import styled from 'styled-components';

// I'm thinking a list on the left of all shops (i.e. one shop plus 'open 
// new shop')
// maybe a header with a dropdown menu? Something nicely styled, anyways

// main page should just have all the items for sale for the first 
// shop plus, like, somewhere to add a new item

// it would also be fun to have a secondary menu interface or something
// something to show profits and such

// need to show the number of outstanding orders, so we need an order center

const ShopLanding = () => {
  return (
    <Wrapper>
      <MenuBar />
      <Header>
        <span>thing</span>
      </Header>

      <h2>what ho, varlet!</h2>
    </Wrapper>
  )
};

export default ShopLanding;

const Wrapper = styled.div`
  display: flex;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: blue;
  padding: 0;
  margin: 0;
`;

const MenuBar = styled.div`
  height: 100vh;
  background-color: lightgrey;
  width: 300px;
`;