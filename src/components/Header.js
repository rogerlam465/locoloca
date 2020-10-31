import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// icons, forcement

import { GrDeliver, GrLogin, GrCart, GrHome } from "react-icons/gr";
import { BiStore } from "react-icons/bi";

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
          <Link to="/">
            <MenuItems><GrHome /></MenuItems>
          </Link>
          <Link to="/shop">
            <MenuItems><BiStore /></MenuItems>
          </Link>
          <Link to="/courier">
            <MenuItems><GrDeliver /></MenuItems>
          </Link>
          <MenuItems><GrCart /></MenuItems>
          <Link to="/login">
            <MenuItems><GrLogin /></MenuItems>
          </Link>
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
  height: 60px;
  padding: 10px;
  font-size: 20px;
  box-sizing: border-box;
`;

const UIWrapper = styled.div`
  display: flex;
`;

const MenuList = styled.ul`
  list-style-type: none;
  display: flex;
`;

const MenuItems = styled.li`
  margin: 0 10px;
`;