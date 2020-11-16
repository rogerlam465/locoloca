import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const userData = useSelector((state) => state.user.userData);

  return (
    <Wrapper>
      <ContentWrapper>
        <h1>Thank you for your purchase!</h1>
        <p>Your order will be delivered to the following address:</p>
        <p>{userData.firstName} {userData.lastName}</p>
        <p>{userData.addressCivicNum} {userData.addressStreet}
          {userData.addressAptNum &&
            <span>, Unit {userData.addressAptNum}</span>
          }
        </p>
        <p>{userData.addressCity}, {userData.addressProvince}</p>
        <p>{userData.addressCountry}</p>
        <p>{userData.addressPostcode}</p>
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