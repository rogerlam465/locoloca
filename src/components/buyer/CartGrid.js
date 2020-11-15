import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

import CartItem from './CartItem';

const handleClick = () => {
  // this function is intended to send the data to BE.

  // data required:
  // seller id - don't have this yet
  // seller location - don't have this yet
  // buyer id - we have this
  // buyer location - we have this
  // courier id - TBD, we can leave it blank for now
  // status - set default to active
  // delivery deadline - two days from today

  // we're gonna use a state for this to make sure that the data
  // is correctly pushed to DB before we use history.push to
  // send the client to the checkout page.

  // if I declare the state inside the main component, it's
  // not visible in here. that's irksome.

};

const CartCheckoutFooter = (props) => {
  let total = props.price;
  return (
    <CheckoutWrapper>
      <h2>Your total is: ${total}!</h2>
      {/* <Link to="/checkout"> */}
      <CheckoutButton onClick={handleClick}>Checkout!</CheckoutButton>
      {/* </Link> */}
    </CheckoutWrapper>
  )
};

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

    await fetch('/api/item');
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

const CheckoutButton = styled.button`
  width: 200px;
  height: 170px;
  border-radius: 3px;
  font-size: 30px;
`;

const CheckoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;