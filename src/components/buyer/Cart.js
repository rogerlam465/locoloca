import React from 'react';
import styled from 'styled-components';

import CartGrid from './CartGrid';

const Cart = () => {

  return (
    <Wrapper>
      <h1>These are the items in your cart!</h1>
      <CartGrid />
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  margin: 10px;
`;