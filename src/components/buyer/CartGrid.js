import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import CartItem from './CartItem';

const CartGrid = () => {
  const [itemLoadState, setItemLoadState] = useState("idle");
  const [itemData, setItemData] = useState([]);

  const userData = useSelector((state) => state.user.userData._id);

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
      setItemLoadState("success");
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
`;