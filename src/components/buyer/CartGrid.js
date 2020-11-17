import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { clearCart } from '../../actions';
import CartItem from './CartItem';

const CartGrid = () => {
  const [itemLoadState, setItemLoadState] = useState("idle");
  const [itemData, setItemData] = useState([]);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const fullUserData = useSelector((state) => state.user.userData);
  const userData = fullUserData._id;
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

  const fetchData = async (userId) => {
    await fetch('/api/item/cart/' + userId)
      .then(res => res.json())
      .then(json => {
        totalPrice = 0;
        let itemDataHolder = json.data;
        setItemData(itemDataHolder);
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


  const handleClick = () => {

    let data = {
      "user": fullUserData,
      "cart": cartData
    };

    fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        dispatch(clearCart());
        fetch('/api/cart/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "user": userData
          })
        });
      })
      .catch(error => {
        console.log(error);
      })

    history.push("/checkout");

  };

  useEffect(() => {
    setItemLoadState("loading");
    if (cartData.length > 0) {
      fetchData(userData)
        .then(() => {
          setPrice(totalPrice);
          setItemLoadState("success");
        })
    } else {
      setItemLoadState("empty");
    }
  }, []);

  return (
    <Wrapper>
      {itemLoadState === "loading" &&
        <h2>Loading...</h2>
      }
      {itemLoadState === "empty" &&
        <h2>Your cart is empty!</h2>
      }
      {itemLoadState === "success" &&
        <>
          {itemData.map(item => {
            return <CartItem itemData={item} />
          })
          }
          {price &&
            <CheckoutWrapper>
              <h2>Your total is: ${price.toFixed(2)}!</h2>

              <CheckoutButton onClick={handleClick}>Checkout!</CheckoutButton>

            </CheckoutWrapper>
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