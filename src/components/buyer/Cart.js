import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Cart = () => {

  // this was all completely superfluous, wasn't it.
  // I can't simply pass an array through to the api.
  // I mean... I could, through concatenation, but that's dumb.

  const cartData = useSelector((state) => state.cart.cartData);

  let cartContents = [];

  let idCleaner = () => {

    let dataHolder = [];

    for (const property in cartData) {
      if (property.length === 24) {
        let objHolder = {};
        objHolder[property] = parseInt(cartData[property]);
        dataHolder.push(objHolder);
      }
    };

    return dataHolder;
  };

  useEffect(() => {
    let cleanedIds = idCleaner();

    // cleanedIds.map(async item => {

    // })

  }, []);

  return (
    <Wrapper>
      <p>pff</p>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  margin: 10px;
`;