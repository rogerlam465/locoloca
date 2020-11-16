import React, { useEffect } from 'react';
import styled from 'styled-components';

// show all pending deliveries nearby
// map and list view? - should remember preference
// search by destination

const CourierLanding = () => {

  let [deliveryDataStatus, setDeliveryDataStatus] = useState("idle");
  let [deliveryData, setDeliveryData] = useState([]);

  useEffect(() => {

    setDeliveryDataStatus("loading");

    try {
      fetch('/api/order')
        .then(res => res.json())
        .then(json => {
          setDeliveryData(json);
          setDeliveryDataStatus("complete");
        })
        .catch(err => console.log(err);

    } catch (err) {
      console.log(err);
    }

    console.log(deliveryData);

  }, []);

  return (
    <Wrapper>
      <h1>Available Deliveries</h1>

    </Wrapper>
  );
};

export default CourierLanding;

const Wrapper = styled.div`
  margin: 30px;
`;