import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Cart = () => {

  const cartData = useSelector((state) => state.cart);

  console.log(cartData);

  return (
    <Wrapper>
      <p>pff</p>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  margin: 10px;
`;