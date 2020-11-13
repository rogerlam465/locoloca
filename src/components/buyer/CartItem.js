import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const CartItem = (props) => {
  let itemData = props.itemData;

  const cartData = useSelector((state) => state.cart[itemData._id]);

  return (
    <Wrapper>
      <ImgWrapper>
        <ProductImg src={process.env.PUBLIC_URL + '/placeholder.jpeg'} />
      </ImgWrapper>
      <ItemDetails>
        <h2>{itemData.itemName}</h2>
        <p>total cost</p>
        <p>number to purchase</p>
      </ItemDetails>
    </Wrapper>
  )
};

export default CartItem;

const Wrapper = styled.div`
  display: flex;
  height: 200px;
  border-bottom: 1px grey solid;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 150px;
  border-radius: 10px;
`;

const ImgWrapper = styled.div`

`;

const ItemDetails = styled.div`

`;