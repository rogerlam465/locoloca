import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// this component should show a grid of things to buy. ideally, like. 50 of them.

const ItemGrid = (props) => {

  let itemData = props.itemData;

  console.log(itemData);

  return (
    <Wrapper>

      <h2>items go here.</h2>

    </Wrapper>
  )
};

export default ItemGrid;

const Wrapper = styled.div`
  margin: 0 30px;
`;