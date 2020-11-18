import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  return (
    <Wrapper>
      <h2>Store Management</h2>
      <ul>
        <Link to="/shop/">
          <li>Store Home</li>
        </Link>
        <li>Store Profile</li>
        <Link to="/shop/edit">
          <li>Edit Store</li>
        </Link>
        <Link to="/shop/order">
          <li>My Orders</li>
        </Link>
      </ul>
    </Wrapper>
  );
};

export default MenuBar;

const Wrapper = styled.div`
  height: 100vh;
  background-color: lightgrey;
  width: 260px;
  padding: 20px;
`;