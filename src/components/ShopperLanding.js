import React from 'react';
import styled from 'styled-components';

// this should be the easiest UI to build
// just shows all items that can be delivered to your address
// no maps, just a list of items

// this turns out to be pretty complicated. There doesn't
// seem to be an API for geocoding within a radius.

// HAHA LIES THERE'S ONE

// todo - add grid
// todo - capture user location (search bar or by web api)
// todo - customize grid according to location

const ShopperLanding = () => {
  return (
    <Wrapper>
      <h1>Khajit has wares if you have coin.</h1>
    </Wrapper>
  );
};

export default ShopperLanding;

const Wrapper = styled.div`
  margin: 30px;
`;