import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import CartItem from './CartItem';

const CartGrid = () => {
  const [itemLoadState, setItemLoadState] = useState("idle");
  const [itemData, setItemData] = useState([]);

  const userData = useSelector((state) => state.user.userData._id);
  const cartData = useSelector((state) => state.cart);

  let totalPrice;

  // we also need the total price. that shouldn't be too bad, because
  // we have all the item data already in itemData.
  // we just need the numbers from the cart.

  const fetchData = async (userId) => {
    fetch('/api/item/cart/' + userId)
      .then(res => res.json())
      .then(json => {
        setItemLoadState("complete");
        setItemData(json.data);
      })
      .catch(err => {
        console.log(err)
        setItemLoadState("error");
      });
  }

  useEffect(() => {
    setItemLoadState("loading");
    fetchData(userData);
  }, []);

  useEffect(() => {
    if (itemData.length > 0) {
      totalPrice = 0;
      setItemLoadState("success");
      itemData.map(item => {
        totalPrice += item.price * cartData[item._id];
      })
      console.log(totalPrice);
    }
  }, [itemData]);

  return (
    <Wrapper>
      {itemLoadState === "loading" &&
        <h2>Loading...</h2>
      }
      {itemLoadState === "success" &&
        <>
          {itemData.map(item => {
            return <CartItem itemData={item} />
          })
          }
        </>
      }
    </Wrapper>
  )
};

export default CartGrid;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;