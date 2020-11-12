import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../actions';

const Item = (props) => {
  const data = props.itemData;

  // we need userData so that we can attach the cart to the appropriate user _id

  // so the thing is that we have two choices to store cart data.
  // we can store it in state, but then it's not persistent between reloads
  // but if we store it in DB, that adds time per transaction, which adds lag to UI.
  // so. How about we store it in state, but track state with useEffect and upload to DB?

  const userData = useSelector((state) => state.user.userData);
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let heading;

  data.itemName.length >= 60 ?
    heading = data.itemName.slice(0, 59) + "..."
    : heading = data.itemName;

  let newPrice = parseFloat(data.price).toFixed(2);

  // todo - if the user is logged in, just add it to the cart
  // if they aren't logged in, force them to log in
  // and then add the item to their cart

  const handleClick = () => {

    // this doesn't quite work right
    // for some reason, it's always one item 'behind'
    // and that's weird. Why?

    dispatch(addItemToCart([data._id, 1]));

    console.log(cartData);

    fetch('/api/cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user": userData._id,
        "cart": cartData
      })
    });
  };

  const PurchaseButton = () => {
    if (cartData[data._id] > 0) {
      return <SoldOut disabled>Added to cart</SoldOut>
    } else if (data.numInStock === 0) {
      return <SoldOut disabled>Add to cart</SoldOut>
    } else if (data.numInStock > 0) {
      return <AddToCart onClick={handleClick}>Add to cart</AddToCart>
    }
  };

  return (
    <Wrapper>

      <ItemData>
        <ProductHeading>{heading}</ProductHeading>
        <CenterImg>
          <ProductImg src={process.env.PUBLIC_URL + '/placeholder.jpeg'} />
        </CenterImg>
        <p>{data.itemDesc}</p>
      </ItemData>
      <ItemPriceWrapper>
        <ItemPrice>
          <span>${newPrice}</span>
          <span>In stock: {data.numInStock}</span>
        </ItemPrice>
        <ButtonWrapper>
          <PurchaseButton />
        </ButtonWrapper>
      </ItemPriceWrapper>


    </Wrapper >
  );

};

export default Item;

const Wrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 20px 20px 0;
  justify-content: space-between;
  padding: 10px;
`;

const ProductHeading = styled.h2`
  height: 90px;
`;

const CenterImg = styled.div`
  display: flex;
  justify-content: center;
  align-items; center;
`;

const ProductImg = styled.img`
  width: 150px;
  border-radius: 10px;
`;

const ItemData = styled.div`

`;

const ItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddToCart = styled.button`
  background: #009914;
  color: white;
  width: 100px;
  border: 2px white solid;
  border-radius: 5px;
  height: 30px;
`;

const SoldOut = styled(AddToCart)`
  background: #a3b5a5;
`;