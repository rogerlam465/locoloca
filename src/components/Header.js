import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// icons, forcement

import { GrDeliver, GrLogin, GrCart, GrHome, GrLogout } from "react-icons/gr";
import { BiStore } from "react-icons/bi";

// actions

import { userLogout } from '../actions';

// this should ideally pull from redux upon 'login'
// upon login:
// pull user deets
// pull store deets (if existent)
// pull courier deets (if existent)

const Header = () => {
  const userData = useSelector((state) => state.user.userData);

  // this will eventually be used to create a badge with the
  // number of items in the cart
  const cartData = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    dispatch(userLogout());
    history.push("/");
  };

  return (
    <Wrapper>
      {userData &&
        <span>Hi there, {userData.firstName}!</span>
      }
      {!userData &&
        <span>Hi there.</span>
      }
      <UIWrapper>
        <MenuList>
          <Link to="/">
            <MenuItems><GrHome /></MenuItems>
          </Link>
          {userData &&
            <>
              <Link to="/shop">
                <MenuItems><BiStore /></MenuItems>
              </Link>
              <Link to="/courier">
                <MenuItems><GrDeliver /></MenuItems>
              </Link>
            </>
          }
          <MenuItems><GrCart /></MenuItems>
          {userData &&
            <MenuItems onClick={handleSubmit}><GrLogout /></MenuItems>
          }
          {!userData &&
            <Link to="/login">
              <MenuItems><GrLogin /></MenuItems>
            </Link>
          }
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