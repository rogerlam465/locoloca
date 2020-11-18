import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ShopOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [dataState, setDataState] = useState("idle");
  const shopId = useSelector((state) => state.user.shop);

  useEffect(() => {

    const fetchData = async () => {
      setDataState("loading");
      try {
        await fetch('/api/order/shop/' + shopId)
          .then(res => res.json())
          .then(json => {
            setOrderData(json.data);
            console.log(orderData);
            setDataState("success");
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
      {dataState === "success" &&
        <h2>what</h2>
        
      }
    </Wrapper>
  )
}

export default ShopOrders;

const Wrapper = styled.div`
  margin: 20px;
`;