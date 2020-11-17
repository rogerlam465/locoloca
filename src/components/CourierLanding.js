import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import DeliveryItem from './courier/DeliveryItem';

// show all pending deliveries nearby
// map and list view? - should remember preference
// search by destination

const CourierLanding = () => {

  let [deliveryDataStatus, setDeliveryDataStatus] = useState("idle");
  let [deliveryData, setDeliveryData] = useState([]);

  const fullUserData = useSelector((state) => state.user.userData);

  let userId = fullUserData._id;

  console.log(userId);

  useEffect(() => {

    setDeliveryDataStatus("loading");

    try {
      fetch('/api/order')
        .then(res => res.json())
        .then(json => {
          let activeDeliveries = [];
          json.data.map(item => {
            if (item.status === "active") {
              activeDeliveries.push(item);
            }
          })
          setDeliveryData(activeDeliveries);
          setDeliveryDataStatus("complete");
        })
        .catch(err => console.log(err));

    } catch (err) {
      console.log(err);
    }



  }, []);

  // would be cool to put a My Deliveries at the top
  // ordered by due date

  return (
    <Wrapper>
      <h1>Available Deliveries</h1>

      {deliveryDataStatus === "idle" &&
        <h2>Loading...</h2>
      }
      {deliveryDataStatus === "complete" &&
        <table>
          <thead>
            <tr>
              <th>Departure Postcode</th>
              <th>Destination Postcode</th>
              <th># of items</th>
              <th>Delivery Date</th>
              <th>Bounty</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {deliveryData.map(item => {
              return <DeliveryItem data={item} />
            })}
          </tbody>
        </table>
      }
    </Wrapper>
  );
};

export default CourierLanding;

const Wrapper = styled.div`
  margin: 30px;
`;