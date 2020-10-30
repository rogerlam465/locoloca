import React from 'react';
import styled from 'styled-components';

// this should ideally pull from redux upon 'login'
// upon login:
// pull user deets
// pull store deets (if existent)
// pull courier deets (if existent)

const Header = () => {
  return (
    <Wrapper>
      <span>Hi there.</span>
      <UIWrapper>
        <MenuList>
          <MenuItems>Store</MenuItems>
          <MenuItems>Deliveries</MenuItems>
          <MenuItems>Cart</MenuItems>
          <MenuItems>Login</MenuItems>
        </MenuList>
      </UIWrapper>
    </Wrapper>
  )
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: lightblue;
  height: 40px;
  padding: 10px;
`;

const UIWrapper = styled.div`
  display: flex;
`;

const MenuList = styled.ul`
  
`;

const MenuItems = styled.li`

`;