import React from 'react';
import styled from 'styled-components';

const CartCheckout = (props) => {
  let total = props.price;
  console.log(props);
  console.log(total);
  return (
    <Wrapper>
      <p>Your total is: ${total}!</p>
      <button>Checkout!</button>
    </Wrapper>
  )
};

export default CartCheckout;

const Wrapper = styled.div`
  background: #e0ffcf;
`;