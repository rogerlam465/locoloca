import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const data = props.itemData;

  console.log(data);

  return (
    <Wrapper>
      <h2>{data.itemName}</h2>
      <p>{data.itemDesc}</p>
      <p>${data.price}</p>
      <p>In stock: {data.numInStock}</p>
    </Wrapper>
  );

};

export default Item;

const Wrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;