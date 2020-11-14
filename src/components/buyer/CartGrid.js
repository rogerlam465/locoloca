import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import CartItem from './CartItem';
import CartCheckoutFooter from './CartCheckoutFooter';

const CartGrid = () => {
  const [itemLoadState, setItemLoadState] = useState("idle");
  const [itemData, setItemData] = useState([]);
  const [price, setPrice] = useState(0);

  const userData = useSelector((state) => state.user.userData._id);
  const cartDataRaw = useSelector((state) => state.cart);

  let cartData = [];

  Object.keys(cartDataRaw).map(key => {
    let holder = {};
    if (key != "status") {
      holder[key] = cartDataRaw[key];
      cartData.push(holder);
    }
  });

  let totalPrice = 0;

  // we also need the total price. that shouldn't be too bad, because
  // we have all the item data already in itemData.
  // we just need the numbers from the cart.

  const fetchData = async (userId) => {
    await fetch('/api/item/cart/' + userId)
      .then(res => res.json())
      .then(json => {
        totalPrice = 0;
        setItemData(json.data);
        let itemDataHolder = json.data;
        itemDataHolder.map(item => {
          let targetId = item["_id"];
          totalPrice += item["price"] * cartDataRaw[targetId];
        })
      })
      .catch(err => {
        console.log(err)
        setItemLoadState("error");
      });
  }

  useEffect(() => {
    setItemLoadState("loading");
    fetchData(userData)
      .then(() => {
        setPrice(totalPrice);
        setItemLoadState("success");
      })
  }, []);

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
          <CartCheckoutFooter price={price} />
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