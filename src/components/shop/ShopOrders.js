import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ShopOrderItem from './ShopOrderItem';

const ShopOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [dataState, setDataState] = useState("idle");
  const shopId = useSelector((state) => state.user.userData.shop);

  useEffect(() => {

    const fetchData = async () => {
      setDataState("loading");
      try {
        await fetch('/api/order/shop/' + shopId)
          .then(res => res.json())
          .then(json => {
            if (json.data) {
              fetch('/api/item/all/' + shopId)
                .then(itemRes => itemRes.json())
                .then(itemJson => {
                  setItemData(itemJson.data);
                })
              setOrderData(json.data);
              setDataState("success");
            } else {
              setDataState("empty");
            }
          })
          .catch(err => {
            console.log(err);
          })

      } catch (err) {
        console.log(err);
      }

    }

    fetchData();
  }, []);

  return (
    <Wrapper>
      <h1>these are your active orders.</h1>
      {dataState === "loading" &&
        <h2>Loading...</h2>
      }
      {dataState === "empty" &&
        <h2>No sales yet...</h2>
      }
      {dataState === "success" &&
        <>
          {orderData.map((item) => {
            return <ShopOrderItem data={item} />
          })}
        </>
      }
    </Wrapper>
  )
}

export default ShopOrders;

const Wrapper = styled.div`
  margin: 20px;
`;