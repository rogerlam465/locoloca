import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CartCheckoutFooter = (props) => {
  let total = props.price;
  console.log(props);
  console.log(total);
  return (
    <Wrapper>
      <h2>Your total is: ${total}!</h2>
      <Link to="/checkout">
        <CheckoutButton>Checkout!</CheckoutButton>
      </Link>
    </Wrapper>
  )
};

export default CartCheckoutFooter;

const Wrapper = styled.div`
  background: #e0ffcf;
  height: 200px;
  width: 800px;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  margin: 30px;
`;

const CheckoutButton = styled.button`
  width: 200px;
  height: 170px;
  border-radius: 3px;
  font-size: 30px;
`;