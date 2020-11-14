import React from 'react';
import styled from 'styled-components';

const Checkout = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <h1>Thank you for your purchase!</h1>
        <p>Your order will be delivered to the following address:</p>
        <p>civicNum streetName, optional apartment number</p>
        <p>city, province</p>
        <p>postal code</p>
      </ContentWrapper>
    </Wrapper>
  )
};

export default Checkout;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const ContentWrapper = styled.div`
  width: 600px;
  border-radius: 10px;
  border: 1px solid black;
  padding: 10px;
`;