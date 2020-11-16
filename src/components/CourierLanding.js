import React, { useEffect, useState } from 'react';
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
          setDeliveryData(json.data);
          setDeliveryDataStatus("complete");
        })
        .catch(err => console.log(err));

    } catch (err) {
      console.log(err);
    }



  }, []);

  return (
    <Wrapper>
      <h1>Available Deliveries</h1>

      {deliveryDataStatus === "idle" &&
        <h2>Loading...</h2>
      }
      {deliveryDataStatus === "complete" &&
        <table>
          <tr>
            <th>Departure Postcode</th>
            <th>Destination Postcode</th>
            <th>Delivery Date</th>
            <th>Bounty</th>
            <th>Availability</th>
          </tr>
        </table>
      }
    </Wrapper>
  );
};

export default CourierLanding;

const Wrapper = styled.div`
  margin: 30px;
`;